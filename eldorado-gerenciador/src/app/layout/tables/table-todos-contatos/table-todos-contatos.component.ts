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
import { ToastComponent } from '../../../tools/toast/toast.component';

@Component({
  selector: 'app-table-todos-contatos',
  imports: [
    TooltipComponent,
    ModalConfirmComponent,
    TableStatusComponent,
    ToastComponent,
  ],
  templateUrl: './table-todos-contatos.component.html',
  styleUrl: './table-todos-contatos.component.css',
})
export class TableTodosContatosComponent implements OnChanges {
  @Input() secao = ''; //secao atual
  textoConfirmar = ''; //texto para confirmar o modal
  statusTable = ''; //status da tabela

  idAlterar: undefined | number; //id para mudar o status
  feedbackToast = ''; //texto para o toast
  tipoFeedback = ''; //tipo positivo/negativo
  @ViewChild('Toast') toastElement!: ElementRef;

  private contactService = inject(ContatoService);
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
            this.feedbackToast =
              'Sua sessão expirou! Faça novamente seu login.';
          } else {
            this.feedbackToast = `Ocorreu um erro: ${
              err.message || 'Erro desconhecido'
            }`;
          }
          this.tipoFeedback = 'bg-danger';
          this.openModalToastS();
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
            this.feedbackToast =
              'Sua sessão expirou! Faça novamente seu login.';
          } else {
            this.feedbackToast = `Ocorreu um erro: ${
              err.message || 'Erro desconhecido'
            }`;
          }
          this.tipoFeedback = 'bg-danger';
          this.openModalToastS();
        },
      });
    }
  }

  // Alterar o status do contato
  alterarStatus() {
    this.contactService.updateStatusContact(this.idAlterar!).subscribe({
      next: () => {
        this.feedbackToast = 'Contato alterado com sucesso';
        this.tipoFeedback = 'bg-success';
        this.openModalToastS();
        this.carregarContatos(); // recarrega a lista de contatos apos a alteracao
      },
      error: (err) => {
        //erro comum do usuario
        if (err.status === 401) {
          this.feedbackToast = 'Não autorizado! Faça novamente seu login.';
        } else {
          this.feedbackToast = `Ocorreu um erro: ${
            err.message || 'Erro desconhecido'
          }`;
        }
        this.tipoFeedback = 'bg-danger';
        this.openModalToastS();
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

  openModalToastS() {
    if (this.toastElement) {
      const modal = new (window as any).bootstrap.Toast(
        this.toastElement.nativeElement
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
    this.openModalConfirmar();
  }

  //Ativar
  ConfAtivar(id: number) {
    this.idAlterar = id;
    this.textoConfirmar =
      'Tem certeza de que deseja ativar este contato sem saber a qual usuário ele está relacionado?';
    this.openModalConfirmar();
  }
}
