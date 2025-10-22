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
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-table-tipo-contato',
  imports: [TooltipComponent, ModalConfirmComponent, TableStatusComponent],
  templateUrl: './table-tipo-contato.component.html',
  styleUrl: './table-tipo-contato.component.css',
})
export class TableTipoContatoComponent implements OnChanges {
  @Input() secao = ''; //secao atual
  textoConfirmar = ''; //texto para confirmar modal
  tituloConfirmar = ''; //titulo para confirmar modal
  statusTable = ''; //status da tabela

  idAlterar: undefined | number; //id para mudar o status

  private typeService = inject(TipoContatoService);
  private toastService = inject(ToastService);
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

  // Alterar o status do tipo
  alterarStatus() {
    this.typeService.updateStatusType(this.idAlterar!).subscribe({
      next: () => {
        this.toastService.success('Tipo de contato alterado com sucesso');
        this.carregarTipos(); // recarrega a lista de tipos apos a alteracao
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
    this.textoConfirmar = 'Você deseja mesmo desativar este tipo de contato?';
    this.tituloConfirmar = 'Confirmação de Desativação';
    this.openModalConfirmar();
  }

  //Ativar
  ConfAtivar(id: number) {
    this.idAlterar = id;
    this.textoConfirmar = 'Você deseja mesmo ativar este tipo de contato?';
    this.tituloConfirmar = 'Confirmação de Ativação';
    this.openModalConfirmar();
  }
}
