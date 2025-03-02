import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast-success',
  imports: [],
  templateUrl: './toast-success.component.html',
  styleUrl: './toast-success.component.css'
})
export class ToastSuccessComponent {
  //Toast para feedback positivo ao usuário ao uma acao bem-sucedida
  @Input() mensagem ='';
}
