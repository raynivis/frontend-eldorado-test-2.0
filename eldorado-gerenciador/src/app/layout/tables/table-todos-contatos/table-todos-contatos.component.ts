import { Component, ElementRef, inject, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { TooltipComponent } from '../../../tools/tooltip/tooltip.component';
import { ModalConfirmComponent } from '../../modals/modal-confirm/modal-confirm.component';
import { Contato } from '../../../models/contato-model';
import { ContatoService } from '../../../services/contato.service';

@Component({
  selector: 'app-table-todos-contatos',
  imports: [TooltipComponent, ModalConfirmComponent],
  templateUrl: './table-todos-contatos.component.html',
  styleUrl: './table-todos-contatos.component.css'
})
export class TableTodosContatosComponent implements OnChanges{
  @Input() secao = ''; 
  textoConfirmar = '';
  idAlterar: undefined | number;
  private contactService = inject(ContatoService);
  contatos: Contato[] = [];
  @ViewChild('ModalConf') modalElementConfirmar !: ElementRef;

  //ao mudar secao do componente
  ngOnChanges(changes: SimpleChanges): void {
      this.contatos = [];
      if (changes['secao']) {
        this.carregarContatos();
      }
  }

  //carregar os contatos inativos ou ativos
  carregarContatos(): void {
    if (this.secao === 'secao1') {
      this.contactService.listAtivos().subscribe((data) => {
        this.contatos = data;
      });
    } else if (this.secao === 'secao2') {
      this.contactService.listInativos().subscribe((data) => {
        this.contatos = data;
      });
    }
  }

  // Alterar o status do contato
  alterarStatus() {
    this.contactService.updateStatusContact(this.idAlterar!).subscribe({
      next: () => {
        this.carregarContatos(); // recarrega a lista de contatos apos a alteracao
      },
      error: (err) => {
        console.error('Erro ao alterar o status do tipo:', err);
      }
    });
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
  ConfDesativar(id: number) {
    this.idAlterar = id;
    this.textoConfirmar = "Tem certeza de que deseja desativar este contato sem saber a qual usuário ele está relacionado?";
    this.openModalConfirmar();
  }

  //Ativar
  ConfAtivar(id: number) {
    this.idAlterar = id;
    this.textoConfirmar = "Tem certeza de que deseja ativar este contato sem saber a qual usuário ele está relacionado?";
    this.openModalConfirmar();
  }
  

}
