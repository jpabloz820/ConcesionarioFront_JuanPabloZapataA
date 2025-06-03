import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrdenTrabajo } from '../models/ordenTrabajo.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class WorkOrderService {
  private apiUrl = `${environment.apiUrl}/api/orders`; 

  constructor(private http: HttpClient) {}

  // PUT /api/orders/{orderId}/finalize
  finalizarOrden(orderId: number): Observable<OrdenTrabajo> {
    return this.http.put<OrdenTrabajo>(`${this.apiUrl}/${orderId}/finalize`, {});
  }

  // GET /api/orders/vehicle/{vehicleId}
  obtenerOrdenesPorVehiculo(vehicleId: number): Observable<OrdenTrabajo[]> {
    return this.http.get<OrdenTrabajo[]>(`${this.apiUrl}/vehicle/${vehicleId}`);
  }

  // POST /api/orders/vehicle/{vehicleId}
  crearOrden(vehicleId: number, orden: Partial<OrdenTrabajo>): Observable<OrdenTrabajo> {
    return this.http.post<OrdenTrabajo>(`${this.apiUrl}/vehicle/${vehicleId}`, orden);
  }
}
