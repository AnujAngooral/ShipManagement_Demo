import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ValidationMessages } from '../constants/validation-messages';

@Injectable({providedIn: 'root'})
export class ValidationService {

  errorMessage:Record< string,string> ={} ;
  validateForm(group: FormGroup) : Record< string,string> {

    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.validateForm(abstractControl);
      } else {

        if (
          abstractControl &&
          !abstractControl.valid &&
          (abstractControl.touched ||
            abstractControl.dirty ||
            abstractControl.value !== '')
        ) {
          const messages = ValidationMessages[key];

          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
                if(!this.errorMessage[errorKey]){
                      this.errorMessage[errorKey] = messages[errorKey];
                }
                else{
                  var existingMessage=this.errorMessage[errorKey];
                  this.errorMessage[errorKey]  = existingMessage +' '  +messages[errorKey] ;
                }
            }
          }
        }
      }
    });

    return this.errorMessage;
  }
}
