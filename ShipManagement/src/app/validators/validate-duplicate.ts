import { ShipService } from 'src/app/services/ship.service';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AsyncShipNameValidator  {

  constructor(private shipService: ShipService) {}


  existingNameValidator(initialName: string = ""): AsyncValidatorFn {
    return (
      ctrl: AbstractControl
    ): | Promise<{ [key: string]: any } | null> | Observable<{ [key: string]: any } | null> => {

      if (ctrl.value) {

        return this.shipService
          .validateName(ctrl.value)
          .toPromise()
          .then((result) => {

            return result==true? null : {uniqueName: false} ;

          });
      } else {
        return Promise.resolve({invalid: true});
      }

      };
  }

  existingCodeValidator(initialCode: string = ""): AsyncValidatorFn {
    return (
      ctrl: AbstractControl
    ): | Promise<{ [key: string]: any } | null> | Observable<{ [key: string]: any } | null> => {

      if (ctrl.value) {

        return this.shipService
          .validateCode(ctrl.value)
          .toPromise()
          .then((result) => {

            return result==true? null : {uniqueCode: false} ;

          });
      } else {
        return Promise.resolve({invalid: true});
      }

      };
  }



}


// validate(
//   ctrl: AbstractControl
// ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
//   if (ctrl.value) {
//     return this.shipService
//       .validateName(ctrl.value)
//       .toPromise()
//       .then((result) => {
//         return { invalid: result };

//       });
//   } else {
//     return Promise.resolve({invalid: true});
//   }
// }
