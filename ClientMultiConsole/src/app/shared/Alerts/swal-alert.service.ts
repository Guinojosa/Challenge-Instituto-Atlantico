import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalAlertService {

  constructor() { }

  toastAlert(textAlert: string, typeAlert: any) {
    const Toast = Swal.mixin({
      confirmButtonColor: '#0d6efd',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });
    Toast.fire({
      icon: typeAlert,
      title: textAlert
    });
  }

  swalAlert(title: string, textAlert: string, typeAlert: any) {
    Swal.fire({
      confirmButtonColor: '#0d6efd',
      title,
      text: textAlert,
      icon: typeAlert,
    });
  }

}
