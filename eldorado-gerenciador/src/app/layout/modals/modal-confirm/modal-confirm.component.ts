import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-modal-confirm',
  imports: [],
  templateUrl: './modal-confirm.component.html',
  styleUrl: './modal-confirm.component.css'
})
export class ModalConfirmComponent {
  //Modal para confirmacoes (UX)
  @Input() texto = '';
}
