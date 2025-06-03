export interface OrdenTrabajo {
  id: number;
  type: string;
  description: string;
  status: string;
  orderDate: string;
  vehicle: {
    id: number;
    plate: string;
    brand: string;
    model: string;
    year: number;
  };
}
