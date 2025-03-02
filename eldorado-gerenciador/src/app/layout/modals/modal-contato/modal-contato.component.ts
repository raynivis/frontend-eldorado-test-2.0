import { Component, Input } from '@angular/core';
import { NavViewComponent } from '../../../tools/nav-view/nav-view.component';
import { TableContatoComponent } from '../../tables/table-contato/table-contato.component';
import { FormContatoComponent } from '../../forms/form-contato/form-contato.component';

@Component({
  selector: 'app-modal-contato',
  imports: [NavViewComponent, TableContatoComponent, FormContatoComponent],
  templateUrl: './modal-contato.component.html',
  styleUrl: './modal-contato.component.css'
})
export class ModalContatoComponent {
  secaoAtual = 'secao1'; 
}
