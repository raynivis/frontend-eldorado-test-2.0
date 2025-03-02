import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { TooltipComponent } from '../../../tools/tooltip/tooltip.component';
import { ModalContatoComponent } from '../../modals/modal-contato/modal-contato.component';

@Component({
  selector: 'app-table-usuario',
  imports: [TooltipComponent, ModalContatoComponent],
  templateUrl: './table-usuario.component.html',
  styleUrl: './table-usuario.component.css'
})
export class TableUsuarioComponent {
  @Input() secao = ''; 

  @ViewChild('ModalContato') modalElement!: ElementRef;

  openModal() {
    if (this.modalElement) {
      const modal = new (window as any).bootstrap.Modal(this.modalElement.nativeElement);
      modal.show();
    } else {
      console.error('Modal element não encontrado');
    }
  }
    
  

}
