import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-modal-confirm',
  imports: [],
  templateUrl: './modal-confirm.component.html',
  styleUrl: './modal-confirm.component.css',
})
export class ModalConfirmComponent {
  //Modal para confirmacoes (UX)
  @Input() texto = '';
  @Input() titulo = '';
  @Input() acaoContinuar: (() => void) | undefined; //função recebida

  continuar() {
    if (this.acaoContinuar) {
      this.acaoContinuar(); //função recebida
    }
  }
}
