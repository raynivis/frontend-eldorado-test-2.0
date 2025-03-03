import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-status',
  imports: [],
  templateUrl: './table-status.component.html',
  styleUrl: './table-status.component.css'
})
export class TableStatusComponent {
  //auxiliar o usuario a localizar o estado da tabela
  @Input() status = '';
}
