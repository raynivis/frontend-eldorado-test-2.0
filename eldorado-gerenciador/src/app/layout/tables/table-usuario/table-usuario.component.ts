import { Component, ElementRef, inject, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { TooltipComponent } from '../../../tools/tooltip/tooltip.component';
import { ModalContatoComponent } from '../../modals/modal-contato/modal-contato.component';
import { ModalConfirmComponent } from '../../modals/modal-confirm/modal-confirm.component';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario-model';
import { TableStatusComponent } from "../../../tools/table-status/table-status.component";
import { ToastComponent } from "../../../tools/toast/toast.component";

@Component({
  selector: 'app-table-usuario',
  imports: [TooltipComponent, ModalContatoComponent, ModalConfirmComponent, TableStatusComponent, ToastComponent],
  templateUrl: './table-usuario.component.html',
  styleUrl: './table-usuario.component.css'
})
export class TableUsuarioComponent implements OnChanges {
  @Input() secao = ''; //secao atual
  @Input() atualizar!: () => void; // Função recebida do pai
  textoConfirmar = ''; // texto de confirmacao modal
  statusTable = ''; //status da tabela

  idAlterar: undefined | number; //id para mudar o status
  feedbackToast = ''; //texto para o toast
  tipoFeedback = ''; //tipo positivo/negativo
  @ViewChild('Toast') toastElement!: ElementRef;

  private userService = inject(UsuarioService);
  usuarios: Usuario[] = [];
  @ViewChild('ModalConf') modalElementConfirmar !: ElementRef;

  //ao mudar secao do componente
  ngOnChanges(changes: SimpleChanges): void {
    this.usuarios = [];
    if (changes['secao']) {
      this.carregarUsuarios();
    }
  }

  //carregar os usuarios inativos ou ativos
  carregarUsuarios(): void {
    this.statusTable = 'Carregando Usuários...';
    if (this.secao === 'secao1') {
      this.userService.listAtivos().subscribe({
        next: (data) => {
          this.usuarios = data;
          this.statusTable = this.usuarios.length ? '' : 'Não há usuários ativos cadastrados :('; //ternario para status
        },
        error: (err) => {
          //erro comum do usuario
          if (err.status === 401) {
            this.feedbackToast = 'Sua sessão expirou! Faça novamente seu login.';
          } else {
            this.feedbackToast = `Ocorreu um erro: ${err.message || 'Erro desconhecido'}`;
          }
          this.tipoFeedback = 'bg-danger';
          this.openModalToastS();
        }
      }
      );
    } else if (this.secao === 'secao2') {
      this.userService.listInativos().subscribe(
        {
          next: (data) => {
            this.usuarios = data;
            this.statusTable = this.usuarios.length ? '' : 'Não há usuários inativos cadastrados :('; //ternario para status
          },
          error: (err) => {
            //erro comum do usuario
            if (err.status === 401) {
              this.feedbackToast = 'Sua sessão expirou! Faça novamente seu login.';
            } else {
              this.feedbackToast = `Ocorreu um erro: ${err.message || 'Erro desconhecido'}`;
            }
            this.tipoFeedback = 'bg-danger';
            this.openModalToastS();
          }
        });
    }
  }

  // Alterar o status do usuário
  alterarStatus() {
    this.userService.updateStatusUser(this.idAlterar!).subscribe({
      next: (dado) => {
        this.feedbackToast = 'Usuário alterado com sucesso';
        this.tipoFeedback = 'bg-success';
        this.openModalToastS();
        this.carregarUsuarios();
      },
      error: (err) => {
        //erro comum do usuario
        if (err.status === 401) {
          this.feedbackToast = 'Não autorizado! Faça novamente seu login.';
        } else {
          this.feedbackToast = `Ocorreu um erro: ${err.message || 'Erro desconhecido'}`;
        }
        this.tipoFeedback = 'bg-danger';
        this.openModalToastS();
      }
    });
  }

  //Abrir o Modal de Contato
  openModalContato(id: number) {
    this.idAlterar = id; // Atualiza o ID do usuário
    //tive que usar um timer para dar tempo do angular atualizar o id
    setTimeout(() => {
      const modalElement = document.getElementById('modalContato');
      if (modalElement) {
        const modal = new (window as any).bootstrap.Modal(modalElement);
        // fecha e reabre o modal para garantir que o ID é atualizado
        modal.hide();
        setTimeout(() => modal.show(), 200);
      } else {
        console.error('Elemento do modal não encontrado.');
      }
    }, 50);
  }

  //Abrir o Modal de Confirmar Acao
  openModalConfirmar() {
    if (this.modalElementConfirmar) {
      const modal = new (window as any).bootstrap.Modal(this.modalElementConfirmar.nativeElement);
      modal.show();
    } else {
      console.error('Modal element não encontrado');
    }
  }

  openModalToastS() {
    if (this.toastElement) {
      const modal = new (window as any).bootstrap.Toast(this.toastElement.nativeElement);
      modal.show();
    } else {
      console.error('Modal element não encontrado');
    }
  }

  //Desativar
  confDesativar(id: number) {
    this.idAlterar = id;
    this.textoConfirmar = "Você deseja mesmo desativar este usuário?";
    this.openModalConfirmar();
  }

  //Ativar
  confAtivar(id: number) {
    this.idAlterar = id;
    this.textoConfirmar = "Você deseja mesmo ativar este usuário?";
    this.openModalConfirmar();
  }


}
