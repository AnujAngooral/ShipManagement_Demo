import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class NotifyService{


  constructor(private snackBar: MatSnackBar ) {  }

    error(message:string) {

      this.snackBar.open(message,'close', {
          duration: environment.snackBarDurationInSeconds * 1000,
          verticalPosition: 'top',
          panelClass: ["red-snackbar"]
        }
      );
    }

    success(message:string) {

      this.snackBar.open(message,'close', {
          duration: environment.snackBarDurationInSeconds * 1000,
          verticalPosition: 'top',
          panelClass: ["blue-snackbar"]
        }
      );
    }
}
