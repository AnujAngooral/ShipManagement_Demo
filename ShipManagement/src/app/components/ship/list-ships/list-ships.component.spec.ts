import { SharedModule } from './../../../shared/shared.module';
import { ShipService } from './../../../services/ship.service';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListShipsComponent } from './list-ships.component';
import { of } from 'rxjs';
import { ShipFixture } from 'src/app/fixtures/ships';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NGXLogger } from 'ngx-logger';
import { NotifyService } from 'src/app/services/notify.service';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { MockLocationStrategy } from '@angular/common/testing';
import { LocationStrategy } from '@angular/common';
import { MainNavComponent } from '../../main-nav/main-nav.component';

class MockShipService {
  getShips = () => of(ShipFixture)
  deleteShip = () => of(ShipFixture)
}
class MatSnackBarStub{
  open(){
    return {
      onAction: () => of({})
    }
  }

}
let mockRouter = {
	navigate: jasmine.createSpy('navigate')
}

describe('ListShipsComponent', () => {
  let component: ListShipsComponent;
  let fixture: ComponentFixture<ListShipsComponent>;
  let router: Router;
  var $window;
  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListShipsComponent,MainNavComponent],
      imports: [SharedModule,
        RouterTestingModule.withRoutes([]),
        LoggerTestingModule
      ],
      providers: [
        { provide: ShipService, useClass: MockShipService },
        { provide: Router, useValue: mockRouter},
        NotifyService,
        { provide: LocationStrategy, useClass: MockLocationStrategy },
        { provide: MatSnackBar , useClass: MatSnackBarStub }
      ]
    })
      .compileComponents();
    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    $window = jasmine.createSpyObj('$window', ['confirm']);
    fixture = TestBed.createComponent(ListShipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the ships returned from the service', () => {
    component.ngOnInit();
    expect(component.ships.length).toEqual(ShipFixture.length);
  });


  it('should delete ship with specified id', () => {
    component.ngOnInit();
    spyOn(window, 'confirm').and.returnValue(true);
    component.onDeleteShip(1);
    var ship_data = component.ships.filter(x => x.id == 1);
    expect(ship_data.length).toEqual(0);
  });

  it('should navigate to edit',() =>{
      component.ngOnInit();
      component.onEditShip(1);
      expect (mockRouter.navigate).toHaveBeenCalledWith (['ship/edit', 1]);
  });

  it('should filter the data by value',()=>{
    component.ngOnInit();
    component.doFilter('ship3');


    expect(component.dataSource.filteredData.length).toEqual(
			ShipFixture.filter((u) => u.name.toLowerCase() === 'ship3').length
		);
  });

  afterEach(() => {
    if (fixture.nativeElement && 'remove' in fixture.nativeElement) {
      (fixture.nativeElement as HTMLElement).remove();
    }
  });
});
