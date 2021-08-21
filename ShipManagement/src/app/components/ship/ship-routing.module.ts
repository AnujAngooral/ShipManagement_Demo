import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateShipComponent } from './create-ship/create-ship.component'
import { ListShipsComponent } from './list-ships/list-ships.component';

const routes: Routes = [
  {path:'ship', children:[
    { path: '', component: ListShipsComponent },
    { path: 'add', component: CreateShipComponent },
    { path: 'edit/:id', component: CreateShipComponent }
  ]},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule],
})

export class ShipRoutingModule {}
