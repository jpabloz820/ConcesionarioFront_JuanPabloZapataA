import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdenTrabajo } from '../../models/ordenTrabajo.model';
import { WorkOrderService } from '../../services/workOrder';

@Component({
  selector: 'app-ordenes-trabajo-component',
  standalone: true, // muy importante si estás usando imports en vez de declarations
  imports: [CommonModule, FormsModule],
  templateUrl: './ordenes-trabajo-component.html',
  styleUrls: ['./ordenes-trabajo-component.css']
})
export class OrdenesTrabajoComponent {
  vehicleIdNuevaOrden: number = 0; 
  vehicleId: number = 0;
  orderId: number = 0;
  estadoFiltro: string = '';
  nuevaOrden: Partial<OrdenTrabajo> = {
    type: '',
    description: ''
  };

  ordenes: OrdenTrabajo[] = [];
  ordenFinalizada?: OrdenTrabajo;
  mensaje?: string;

  constructor(private workOrderService: WorkOrderService) {}

  buscarOrdenes() {
  this.mensaje = undefined;
  this.workOrderService.obtenerOrdenesPorVehiculo(this.vehicleId).subscribe({
    next: ordenes => this.ordenes = ordenes,
    error: err => this.mensaje = 'Error al obtener órdenes.'
  });
}

  obtenerOrdenesFiltradas(): OrdenTrabajo[] {
  if (!this.estadoFiltro) return this.ordenes;
  return this.ordenes.filter(o => o.status === this.estadoFiltro);
}



crearOrden() {
  this.mensaje = undefined;
  this.workOrderService.crearOrden(this.vehicleIdNuevaOrden, this.nuevaOrden).subscribe({
    next: orden => {
      this.ordenes.push(orden);
      this.nuevaOrden = { type: '', description: '' };
      this.mensaje = 'Orden creada exitosamente.';
    },
    error: err => this.mensaje = 'Error al crear orden, el vehiculo tiene una orden activa.'
  });
}

  finalizarOrden() {
    this.mensaje = undefined;
    this.workOrderService.finalizarOrden(this.orderId).subscribe({
      next: orden => {
        this.ordenFinalizada = orden;
        this.mensaje = `Orden ${orden.id} finalizada.`;
        this.buscarOrdenes(); 
      },
      error: err => this.mensaje = 'Error al finalizar la orden.'
    });
  }
}
