import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private toaster: ToastrService) { }

  showError(messages: any) {
    if (Array.isArray(messages)) {
      messages.forEach((value) => {
        this.toaster.error(value, '');
      });
    } else {
      this.toaster.error(messages, '');
    }
  }

  showSuccess(message: any = 'Success') {
    this.toaster.success(message, '');
  }

}
