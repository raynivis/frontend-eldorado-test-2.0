import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ToastMessage {
  mensagem: string;
  toastClass: string;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject = new Subject<ToastMessage>();
  public toast$ = this.toastSubject.asObservable();

  show(mensagem: string, toastClass: string) {
    this.toastSubject.next({ mensagem, toastClass });
  }

  success(mensagem: string) {
    this.show(mensagem, 'bg-success');
  }

  error(mensagem: string) {
    this.show(mensagem, 'bg-danger');
  }

  warning(mensagem: string) {
    this.show(mensagem, 'bg-warning');
  }

  info(mensagem: string) {
    this.show(mensagem, 'bg-info');
  }
}
