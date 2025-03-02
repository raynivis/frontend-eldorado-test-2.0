import { Component, Input } from '@angular/core';
import { TooltipComponent } from '../../../tools/tooltip/tooltip.component';

@Component({
  selector: 'app-table-tipo-contato',
  imports: [TooltipComponent],
  templateUrl: './table-tipo-contato.component.html',
  styleUrl: './table-tipo-contato.component.css'
})
export class TableTipoContatoComponent {
  @Input() secao = ''; 

}
