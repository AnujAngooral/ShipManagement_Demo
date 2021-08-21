import { environment } from './../../environments/environment';

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IShip } from "../models/IShip";
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class ShipService {

  private ships: IShip[] = [];

  private ship!:IShip;

  baseURL= environment.baseUrl;
  constructor(
    private httpClient: HttpClient

    ) { }


    getShips() : Observable<IShip[]>  {
      console.log('baseurl: '+this.baseURL);
     return this.httpClient.get<IShip[]>(`${this.baseURL}ship`);
    }

    addShip(ship: IShip) : Observable<IShip> {

        return this.httpClient.post<IShip>(`${this.baseURL}ship`,ship);
    }

    updateShip(ship: IShip,id:number) : Observable<IShip> {

      return this.httpClient.put<IShip>(`${this.baseURL}ship/${id}`,ship);
  }

    getShip(id:number) : Observable<IShip>  {

      return this.httpClient.get<IShip>(`${this.baseURL}ship/${id}`);
     }

     deleteShip(id:number): Observable<void>{

      return this.httpClient.delete<void>(`${this.baseURL}ship/${id}`);
     }




}
