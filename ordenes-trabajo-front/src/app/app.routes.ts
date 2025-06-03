import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { TabsComponent } from './pages/tabs.component/tabs.component';
import { VehiculosComponent } from './pages/vehiculos-component/vehiculos-component';
import { OrdenesTrabajoComponent } from './pages/ordenes-trabajo-component/ordenes-trabajo-component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'tabs',
    component: TabsComponent,
    children: [
      { path: 'vehiculos', component: VehiculosComponent },
      { path: 'ordenes', component: OrdenesTrabajoComponent },
      { path: '', redirectTo: 'vehiculos', pathMatch: 'full' }, // Redirigir a 'vehiculos' por defecto
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
];
