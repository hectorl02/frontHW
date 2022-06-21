import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertServiceInterface } from '../../Interfaces/alert';

@Injectable()
export class AlertService implements AlertServiceInterface {

  constructor() { }
  show(message: string, title: string): void {
    alert(`title: ${title} - message: ${message}`);
  }

  showError(error: HttpErrorResponse) {
    if( error.status >= 400 && error.status < 500) {
      alert(`title: Bad request ---- message: ${error.message}`);
    } else if(error.status === 0){
        alert(`Title: Internal error -- message: try more later`);
    }
  }
}
