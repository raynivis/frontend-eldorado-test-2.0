import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { TooltipComponent } from '../../../tools/tooltip/tooltip.component';
import { ModalConfirmComponent } from '../../modals/modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-table-tipo-contato',
  imports: [TooltipComponent, ModalConfirmComponent],
  templateUrl: './table-tipo-contato.component.html',
  styleUrl: './table-tipo-contato.component.css'
})
export class TableTipoContatoComponent {
  @Input() secao = ''; 
  textoConfirmar = '';
  @ViewChild('ModalConf') modalElementConfirmar !: ElementRef;

  //Abrir o Modal de Confirmar Acao
  openModalConfirmar(){
    if (this.modalElementConfirmar) {
      const modal = new (window as any).bootstrap.Modal(this.modalElementConfirmar.nativeElement);
      modal.show();
    } else {
      console.error('Modal element não encontrado');
    }
  }

  //Desativar
  ConfDesativar() {
    this.textoConfirmar = "Você deseja mesmo desativar este tipo de contato?";
    this.openModalConfirmar();
  }

  //Ativar
  ConfAtivar() {
    this.textoConfirmar = "Você deseja mesmo ativar este tipo de contato?";
    this.openModalConfirmar();
  }


}
