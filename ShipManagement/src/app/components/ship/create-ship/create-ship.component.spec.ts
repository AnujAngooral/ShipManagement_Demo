import { Ship } from './../../../models/IShip';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CreateShipComponent } from './create-ship.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ShipFixture } from 'src/app/fixtures/ships';
import { of } from 'rxjs';
import { ShipService } from 'src/app/services/ship.service';
import { Router } from '@angular/router';
import { NotifyService } from 'src/app/services/notify.service';
import { LocationStrategy } from '@angular/common';
import { MockLocationStrategy } from '@angular/common/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MainNavComponent } from '../../main-nav/main-nav.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';
// const fillForm = () => {
//   setFieldValue(fixture, 'username', username);
//   setFieldValue(fixture, 'email', email);
//   setFieldValue(fixture, 'password', password);
//   setFieldValue(fixture, 'name', name);
//   setFieldValue(fixture, 'addressLine1', addressLine1);
//   setFieldValue(fixture, 'addressLine2', addressLine2);
//   setFieldValue(fixture, 'city', city);
//   setFieldValue(fixture, 'postcode', postcode);
//   setFieldValue(fixture, 'region', region);
//   setFieldValue(fixture, 'country', country);
//   checkField(fixture, 'tos', true);
// };
class MockShipService {
  getShips = () => of(ShipFixture)
  deleteShip = () => of(ShipFixture)
  getShip = (id:number) => of(ShipFixture.find(x=>x.id==id) as Ship)
}

class MatSnackBarStub {
  open() {
    return {
      onAction: () => of({})
    }
  }

}
let mockRouter = {
  navigate: jasmine.createSpy('navigate')
}

describe('CreateShipComponent', () => {
  let component: CreateShipComponent;
  let fixture: ComponentFixture<CreateShipComponent>;
  let router: Router;
  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateShipComponent, MainNavComponent],
      imports: [SharedModule,
        RouterTestingModule.withRoutes([]),
        LoggerTestingModule],
      providers: [
        { provide: ShipService, useClass: MockShipService },
        // { provide: Router, useValue: mockRouter},
        NotifyService,
        { provide: LocationStrategy, useClass: MockLocationStrategy },
        { provide: MatSnackBar , useClass: MatSnackBarStub }

      ]
    })
      .compileComponents();
    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should get ship by id',()=>{
    component.ngOnInit();
    component.getShip(2);
    let expected_ship = ShipFixture.find(x=>x.id==2) as Ship;
    expect(component.ship.id).toEqual(expected_ship.id);
    expect(component.ship.code).toEqual(expected_ship.code);
    expect(component.ship.length).toEqual(expected_ship.length);
    expect(component.ship.width).toEqual(expected_ship.width);

  });




  afterEach(() => {
    if (fixture.nativeElement && 'remove' in fixture.nativeElement) {
      (fixture.nativeElement as HTMLElement).remove();
    }
  });

});
