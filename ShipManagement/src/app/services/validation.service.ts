import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ValidationMessages } from '../constants/validation-messages';

@Injectable({providedIn: 'root'})
export class ValidationService {


  validateForm(group: FormGroup) : Record< string,string> {
   let errorMessage:Record< string,string> ={} ;
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
          console.log('key is' + key);
          const messages = ValidationMessages[key];

          for (const errorKey in abstractControl.errors) {
            console.log('errorkeyis: '+errorKey);
            if (errorKey) {
                if(!errorMessage[key]){
                      errorMessage[key] = messages[errorKey];
                }
                else{
                  var existingMessage=errorMessage[key];
                  errorMessage[key]  = existingMessage +' -- '  +messages[errorKey] ;
                }
            }
          }
        }
      }
    });

    return errorMessage;
  }
}
