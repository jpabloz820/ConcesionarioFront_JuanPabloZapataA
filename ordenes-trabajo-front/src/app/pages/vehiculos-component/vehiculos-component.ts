import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vehiculo,VehiculeCreate } from '../../models/vehiculo.model';
import { VehiculoService } from '../../services/vehiculo';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vehiculos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vehiculos-component.html'
})
export class VehiculosComponent implements OnInit {
  vehiculos: Vehiculo[] = [];
  mostrarModal = false;
  editando = false;

  nuevoVehiculo: VehiculeCreate = {
    plate: '',
    brand: '',
    model: '',
    year: new Date().getFullYear()
  };

  vehiculoEditandoId?: number;

  constructor(private vehiculoService: VehiculoService) {}

  ngOnInit(): void {
    this.obtenerVehiculos();
  }

  obtenerVehiculos(): void {
    this.vehiculoService.getVehiculos().subscribe({
      next: (data) => this.vehiculos = data,
      error: (err) => console.error('Error al obtener vehículos', err)
    });
  }

  abrirModal(vehiculo?: Vehiculo): void {
    this.mostrarModal = true;
    if (vehiculo) {
      this.editando = true;
      this.vehiculoEditandoId = vehiculo.id;
      this.nuevoVehiculo = {
        plate: vehiculo.plate,
        brand: vehiculo.brand,
        model: vehiculo.model,
        year: vehiculo.year
      };
    } else {
      this.editando = false;
      this.vehiculoEditandoId = undefined;
      this.nuevoVehiculo = {
        plate: '',
        brand: '',
        model: '',
        year: new Date().getFullYear()
      };
    }
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  guardarVehiculo(): void {
    if (this.editando && this.vehiculoEditandoId != null) {
      this.vehiculoService.updateVehiculo(this.vehiculoEditandoId, this.nuevoVehiculo).subscribe({
        next: () => {
          this.obtenerVehiculos();
          this.cerrarModal();
        },
        error: (err) => console.error('Error al actualizar vehículo', err)
      });
    } else {
      this.vehiculoService.createVehiculo(this.nuevoVehiculo).subscribe({
        next: () => {
          this.obtenerVehiculos();
          this.cerrarModal();
        },
        error: (err) => console.error('Error al guardar vehículo', err)
      });
    }
  }

  eliminarVehiculo(id: number): void {
    if (confirm('¿Estás seguro que deseas eliminar este vehículo?')) {
      this.vehiculoService.deleteVehiculo(id).subscribe({
        next: () => this.obtenerVehiculos(),
        error: (err) => console.error('Error al eliminar vehículo', err)
      });
    }
  }
}

