import { Component, ElementRef, ViewChild } from '@angular/core';
import { ToastSuccessComponent } from '../../toasts/toast-success/toast-success.component';

@Component({
  selector: 'app-form-usuario',
  imports: [ToastSuccessComponent],
  templateUrl: './form-usuario.component.html',
  styleUrl: './form-usuario.component.css'
})
export class FormUsuarioComponent {

  @ViewChild('ToastSuccess') modalElementSucesso!: ElementRef;
  mostrarSenha = false;

  openModalToastS(){
    if (this.modalElementSucesso) {
      const modal = new (window as any).bootstrap.Toast(this.modalElementSucesso.nativeElement);
      modal.show();
    } else {
      console.error('Modal element não encontrado');
    }
  }

  toggleSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }


}
