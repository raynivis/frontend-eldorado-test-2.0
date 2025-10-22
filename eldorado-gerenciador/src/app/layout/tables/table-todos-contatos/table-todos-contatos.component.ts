import {
  Component,
  ElementRef,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { TooltipComponent } from '../../../tools/tooltip/tooltip.component';
import { ModalConfirmComponent } from '../../modals/modal-confirm/modal-confirm.component';
import { Contato } from '../../../models/contato-model';
import { ContatoService } from '../../../services/contato.service';
import { TableStatusComponent } from '../../../tools/table-status/table-status.component';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-table-todos-contatos',
  imports: [TooltipComponent, ModalConfirmComponent, TableStatusComponent],
  templateUrl: './table-todos-contatos.component.html',
  styleUrl: './table-todos-contatos.component.css',
})
export class TableTodosContatosComponent implements OnChanges {
  @Input() secao = ''; //secao atual
  textoConfirmar = ''; //texto para confirmar o modal
  tituloConfirmar = ''; //titulo para confirmar modal
  statusTable = ''; //status da tabela

  idAlterar: undefined | number; //id para mudar o status

  private contactService = inject(ContatoService);
  private toastService = inject(ToastService);
  contatos: Contato[] = [];
  @ViewChild('ModalConf') modalElementConfirmar!: ElementRef;

  //ao mudar secao do componente
  ngOnChanges(changes: SimpleChanges): void {
    this.contatos = [];
    if (changes['secao']) {
      this.carregarContatos();
    }
  }

  //carregar os contatos inativos ou ativos
  carregarContatos(): void {
    this.statusTable = 'Carregando Contatos...';
    if (this.secao === 'ativos') {
      this.contactService.listAtivos().subscribe({
        next: (data) => {
          this.contatos = data;
          this.statusTable = this.contatos.length
            ? ''
            : 'Não há contatos ativos cadastrados :('; //ternario para status
        },
        error: (err) => {
          //erro comum do usuario
          if (err.status === 401) {
            this.toastService.error(
              'Sua sessão expirou! Faça novamente seu login.'
            );
          } else {
            this.toastService.error(
              `Ocorreu um erro: ${err.message || 'Erro desconhecido'}`
            );
          }
        },
      });
    }
    if (this.secao === 'inativos') {
      this.contactService.listInativos().subscribe({
        next: (data) => {
          this.contatos = data;
          this.statusTable = this.contatos.length
            ? ''
            : 'Não há contatos inativos cadastrados :('; //ternario para status
        },
        error: (err) => {
          //erro comum do usuario
          if (err.status === 401) {
            this.toastService.error(
              'Sua sessão expirou! Faça novamente seu login.'
            );
          } else {
            this.toastService.error(
              `Ocorreu um erro: ${err.message || 'Erro desconhecido'}`
            );
          }
        },
      });
    }
  }

  // Alterar o status do contato
  alterarStatus() {
    this.contactService.updateStatusContact(this.idAlterar!).subscribe({
      next: () => {
        this.toastService.success('Contato alterado com sucesso');
        this.carregarContatos(); // recarrega a lista de contatos apos a alteracao
      },
      error: (err) => {
        //erro comum do usuario
        if (err.status === 401) {
          this.toastService.error('Não autorizado! Faça novamente seu login.');
        } else {
          this.toastService.error(
            `Ocorreu um erro: ${err.message || 'Erro desconhecido'}`
          );
        }
      },
    });
  }

  //Abrir o Modal de Confirmar Acao
  openModalConfirmar() {
    if (this.modalElementConfirmar) {
      const modal = new (window as any).bootstrap.Modal(
        this.modalElementConfirmar.nativeElement
      );
      modal.show();
    } else {
      console.error('Modal element não encontrado');
    }
  }

  //Desativar
  ConfDesativar(id: number) {
    this.idAlterar = id;
    this.textoConfirmar =
      'Tem certeza de que deseja desativar este contato sem saber a qual usuário ele está relacionado?';
    this.tituloConfirmar = 'Confirmação de Desativação';
    this.openModalConfirmar();
  }

  //Ativar
  ConfAtivar(id: number) {
    this.idAlterar = id;
    this.textoConfirmar =
      'Tem certeza de que deseja ativar este contato sem saber a qual usuário ele está relacionado?';
    this.tituloConfirmar = 'Confirmação de Ativação';
    this.openModalConfirmar();
  }
}
