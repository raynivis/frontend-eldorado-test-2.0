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
import { TipoContatoService } from '../../../services/tipo-contato.service';
import { TipoContato } from '../../../models/tipo-usuario-model';
import { TableStatusComponent } from '../../../tools/table-status/table-status.component';
import { ToastComponent } from '../../../tools/toast/toast.component';

@Component({
  selector: 'app-table-tipo-contato',
  imports: [
    TooltipComponent,
    ModalConfirmComponent,
    TableStatusComponent,
    ToastComponent,
  ],
  templateUrl: './table-tipo-contato.component.html',
  styleUrl: './table-tipo-contato.component.css',
})
export class TableTipoContatoComponent implements OnChanges {
  @Input() secao = ''; //secao atual
  textoConfirmar = ''; //texto para confirmar modal
  statusTable = ''; //status da tabela

  idAlterar: undefined | number; //id para mudar o status
  feedbackToast = ''; //texto para o toast
  tipoFeedback = ''; //tipo positivo/negativo
  @ViewChild('Toast') toastElement!: ElementRef;

  private typeService = inject(TipoContatoService);
  tipos: TipoContato[] = [];
  @ViewChild('ModalConf') modalElementConfirmar!: ElementRef;

  //ao mudar secao do componente
  ngOnChanges(changes: SimpleChanges): void {
    this.tipos = [];
    if (changes['secao']) {
      this.carregarTipos();
    }
  }

  //carregar os tipos inativos ou ativos
  carregarTipos(): void {
    this.statusTable = 'Carregando Tipos de Contato...';
    if (this.secao === 'ativos') {
      this.typeService.listAtivos().subscribe({
        next: (data) => {
          this.tipos = data;
          this.statusTable = this.tipos.length
            ? ''
            : 'Não há tipos de contatos ativos cadastrados :('; //ternario para status
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
      this.typeService.listInativos().subscribe({
        next: (data) => {
          this.tipos = data;
          this.statusTable = this.tipos.length
            ? ''
            : 'Não há tipos de contatos inativos cadastrados :('; //ternario para status
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

  // Alterar o status do tipo
  alterarStatus() {
    this.typeService.updateStatusType(this.idAlterar!).subscribe({
      next: () => {
        this.feedbackToast = 'Tipo de contato alterado com sucesso';
        this.tipoFeedback = 'bg-success';
        this.openModalToastS();
        this.carregarTipos(); // recarrega a lista de tipos apos a alteracao
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
    this.textoConfirmar = 'Você deseja mesmo desativar este tipo de contato?';
    this.openModalConfirmar();
  }

  //Ativar
  ConfAtivar(id: number) {
    this.idAlterar = id;
    this.textoConfirmar = 'Você deseja mesmo ativar este tipo de contato?';
    this.openModalConfirmar();
  }
}
