import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { TooltipComponent } from '../../../tools/tooltip/tooltip.component';
import { ModalContatoComponent } from '../../modals/modal-contato/modal-contato.component';
import { ModalConfirmComponent } from '../../modals/modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-table-usuario',
  imports: [TooltipComponent, ModalContatoComponent, ModalConfirmComponent],
  templateUrl: './table-usuario.component.html',
  styleUrl: './table-usuario.component.css'
})
export class TableUsuarioComponent {
  @Input() secao = ''; 
  textoConfirmar = '';

  @ViewChild('ModalContato') modalElementContato!: ElementRef;
  @ViewChild('ModalConf') modalElementConfirmar !: ElementRef;

  //Abrir o Modal de Contato
  openModalContato() {
    if (this.modalElementContato) {
      const modal = new (window as any).bootstrap.Modal(this.modalElementContato.nativeElement);
      modal.show();
    } else {
      console.error('Modal element não encontrado');
    }
  }

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
    this.textoConfirmar = "Você deseja mesmo desativar este usuário?";
    this.openModalConfirmar();
  }

  //Ativar
  ConfAtivar() {
    this.textoConfirmar = "Você deseja mesmo ativar este usuário?";
    this.openModalConfirmar();
  }
    

}
