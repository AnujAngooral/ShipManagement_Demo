import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { IShip } from '../../../models/IShip';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ShipService } from '../../../services/ship.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NGXLogger } from 'ngx-logger';
import { NotifyService } from 'src/app/services/notify.service';


@Component({
  selector: 'app-list-ships',
  templateUrl: './list-ships.component.html',
  styleUrls: ['./list-ships.component.css'],
})
export class ListShipsComponent implements OnInit {

  displayedColumns: string[] = [ 'id', 'name', 'code', 'length', 'width', 'Action' ];
  dataSource = new MatTableDataSource<IShip>();
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ships: IShip[] = [];
  sortedData!: IShip[];


  constructor(
    private shipService: ShipService,
    private router: Router,
    private snackBar: MatSnackBar,
    private logger: NGXLogger,
    private notifyService:NotifyService
  ) { }

  ngOnInit() {
    this.logger.info("About to get all the ships");

    this.shipService.getShips().subscribe((shipsData) => {

      this.ships = shipsData;
      this.dataSource.data = shipsData;

      this.logger.debug(`Total ships returned: ${this.ships.length}`);

    },
    (error) => {
      this.logger.error(`${error}`);

    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
   doFilter = (val: string) => {
      this.dataSource.filter = val.trim().toLocaleLowerCase();
    
  }

  onEditShip(id: number) {
    this.router.navigate(['ship/edit', id]);
  }

  onDeleteShip(id: number) {

    if (confirm('Are you sure, you want to delete this item?')) {

      this.logger.info(`About to delete a ship with id ${id}.`);

      this.shipService.deleteShip(id).subscribe(
        () => {
          this.removeShipFromMemory(id);

          this.logger.debug(`Ship with id ${id} has been deleted successfully.`);
          this.notifyService.success(`Ship with id {${id}} has been deleted successfully.`)

        },
        (error) => {
          this.logger.error(`${error}`);
        }
      );
    }
  }


  private removeShipFromMemory(id: number) {
    this.dataSource.data.splice(
      this.dataSource.data.findIndex((x) => x.id == id), 1);
    this.dataSource.paginator = this.paginator;
  }
}
