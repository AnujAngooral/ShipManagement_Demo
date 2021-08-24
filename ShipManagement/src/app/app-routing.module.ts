
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ShipRoutingModule } from './components/ship/ship-routing.module';
import { ListShipsComponent } from './components/ship/list-ships/list-ships.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {path:'**', component:PageNotFoundComponent}
];

@NgModule({
  imports: [ShipRoutingModule,RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
