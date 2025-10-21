import { Component, input, Input } from '@angular/core';
import { NavViewComponent } from '../../../tools/nav-view/nav-view.component';
import { FormContatoComponent } from '../../forms/form-contato/form-contato.component';

@Component({
  selector: 'app-modal-contato',
  imports: [FormContatoComponent],
  templateUrl: './modal-contato.component.html',
  styleUrl: './modal-contato.component.css',
})
export class ModalContatoComponent {
  //Modal para Contatos do Usuario
  @Input() idUsuario: number | undefined;

  secaoAtual = 'ativos';
}
