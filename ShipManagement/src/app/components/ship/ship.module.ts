
import { NgModule } from '@angular/core';


import { CreateShipComponent } from './create-ship/create-ship.component'
import { ListShipsComponent } from './list-ships/list-ships.component';


import { ShipRoutingModule } from './ship-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    ShipRoutingModule,
    SharedModule
  ],
  declarations: [
  CreateShipComponent,
  ListShipsComponent]
  // exports:[
  //   CreateShipComponent
  // ]
})
export class ShipModule { }
