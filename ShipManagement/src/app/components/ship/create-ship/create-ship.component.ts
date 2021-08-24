import { AsyncShipNameValidator } from './../../../validators/validate-duplicate';
import { NGXLogger } from 'ngx-logger';
import { ShipService } from '../../../services/ship.service';
import { IShip } from '../../../models/IShip';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, IsActiveMatchOptions, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidationMessages } from 'src/app/constants/validation-messages';
import { ValidationService } from 'src/app/services/validation.service';
import { NotifyService } from 'src/app/services/notify.service';


@Component({
  selector: 'app-create-ship',
  templateUrl: './create-ship.component.html',
  styleUrls: ['./create-ship.component.css'],
})
export class CreateShipComponent implements OnInit {
  shipForm!: FormGroup;

  ship!: IShip;

  // form validation keys
  formErrors: any = { name: '', length: '', width: '', code: '', };

  constructor(
    private fb: FormBuilder,
    private shipService: ShipService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private validationService: ValidationService,
    private logger: NGXLogger,
    private notifyService: NotifyService,
    private asyncShipNameValidator:AsyncShipNameValidator
  ) { }



  ngOnInit() {
    // Initialise the create ship form with default empty values and validations.
    this.initialiseForm();

    // In case of edit ship
    // In this method, it will check if id is present in the url, then we fetch the record for editing.
    this.getShipToEdit();

  }

  private getShipToEdit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      // if the ship id is present in the url,  we considered it to be an edit request.
      const shipId = params.get('id');
      if (shipId) {
        this.getShip(Number(shipId));
      }
    });
  }

  private initialiseForm() {
    this.shipForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(250)], [this.asyncShipNameValidator.existingNameValidator()]],
      length: ['', [Validators.required, Validators.maxLength(8), Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')]],
      width: ['', [Validators.required, Validators.maxLength(8), Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')]],
      code: ['', [Validators.required, Validators.pattern('\\b[A-Z]{4}[-][0-9]{4}[-][A-Z]{1}[0-9]{1}\\b')], [this.asyncShipNameValidator.existingCodeValidator()]],
    });
  }

  // Gets the detail of a ship based on the id.
  getShip(id: number) {
    this.shipService.getShip(id).subscribe((ship: IShip) => {
      this.ship = ship;
      this.ediShip(this.ship);

    },
      (error) => {
        this.logger.error(`${error}`);

      });
  }

  // Populate the ship form with existing values
  // fetched fromt he web api.
  ediShip(ship: IShip) {
    this.shipForm.patchValue({
      code: ship.code,
      name: ship.name,
      length: ship.length,
      width: ship.width,
    });
    this.shipForm.get("name")!.clearAsyncValidators();
    this.shipForm.get("code")!.clearAsyncValidators();
    this.shipForm.get("name")!.setValidators([Validators.required, Validators.minLength(2), Validators.maxLength(250)]);
    this.shipForm.get("name")!.updateValueAndValidity();
    this.shipForm.get("code")!.setValidators([Validators.required, Validators.pattern('\\b[A-Z]{4}[-][0-9]{4}[-][A-Z0-9]{2}\\b')]);
    this.shipForm.get("code")!.updateValueAndValidity();
  }


  // This function gets called once the customer clicks on the save button on the UI.
  onShipAdded() {
    if (this.shipForm.valid) {
      // Populate the ship model with the entered values by customer.
      const shipToAdd: IShip = {
        id: this.ship?.id,
        name: this.shipForm.get('name')?.value,
        length: +this.shipForm.get('length')?.value,
        width: +this.shipForm.get('width')?.value,
        code: this.shipForm.get('code')?.value,
      };

      // Create new or update based on the ship id.
      if (shipToAdd && shipToAdd.id && shipToAdd.id > 0) {
        this.updateShip(shipToAdd);
      } else {
        this.addship(shipToAdd);
      }
    }
  }

  // Create a new ship
  private addship(shipToAdd: IShip) {
    this.shipService.addShip(shipToAdd).subscribe((data) => {

      this.notifyService.success(`Ship added successfully.`);

      this.router.navigate(['ship']);
    },
      (error) => {
        // send the error message to logger to log it.
        this.logger.error(`${error}`);

      });
  }


  // Update the ship
  private updateShip(shipToAdd: IShip) {
    this.shipService
      .updateShip(shipToAdd, shipToAdd.id)
      .subscribe((data) => {

        this.notifyService.success(`Ship updated successfully.`);

        this.router.navigate(['ship']);
      },
        (error) => {
          this.logger.error(`${error}`);

        });
  }

  // Form validation
  logValidationErrors(group: FormGroup = this.shipForm): void {
    this.formErrors = this.validationService.validateForm(this.shipForm);
    console.log(this.formErrors);
  }
}
