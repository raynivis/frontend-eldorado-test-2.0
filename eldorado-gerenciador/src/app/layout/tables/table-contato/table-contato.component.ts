import { Component, Input } from '@angular/core';
import { TooltipComponent } from '../../../tools/tooltip/tooltip.component';

@Component({
  selector: 'app-table-contato',
  imports: [TooltipComponent],
  templateUrl: './table-contato.component.html',
  styleUrl: './table-contato.component.css'
})
export class TableContatoComponent {
  @Input() tipo = ''; 
  
  

}
