import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
    //Toast para feedback positivo ao usuário ao uma acao bem-sucedida
    @Input() mensagem ='';
    @Input() toastClass: string = 'text-bg-success'; // padrao para success

}
