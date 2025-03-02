import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { TooltipComponent } from '../../../tools/tooltip/tooltip.component';
import { ModalConfirmComponent } from '../../modals/modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-table-todos-contatos',
  imports: [TooltipComponent, ModalConfirmComponent],
  templateUrl: './table-todos-contatos.component.html',
  styleUrl: './table-todos-contatos.component.css'
})
export class TableTodosContatosComponent {
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
    this.textoConfirmar = "Tem certeza de que deseja desativar este contato sem saber a qual usuário ele está relacionado?";
    this.openModalConfirmar();
  }

  //Ativar
  ConfAtivar() {
    this.textoConfirmar = "Tem certeza de que deseja ativar este contato sem saber a qual usuário ele está relacionado?";
    this.openModalConfirmar();
  }
  

}
