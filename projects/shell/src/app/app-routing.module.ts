import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationComponent } from './authentication/authentication.component';

const routes: Routes = [
  {
    path: 'orders',
    loadChildren: () => import('order/Module').then(m => {
      return m.OrderModule
    })
  },
  {
    path: '',
    component: AuthenticationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
