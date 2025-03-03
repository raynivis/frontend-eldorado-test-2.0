import { Component, ElementRef, inject, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { TooltipComponent } from '../../../tools/tooltip/tooltip.component';
import { ModalContatoComponent } from '../../modals/modal-contato/modal-contato.component';
import { ModalConfirmComponent } from '../../modals/modal-confirm/modal-confirm.component';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario-model';

@Component({
  selector: 'app-table-usuario',
  imports: [TooltipComponent, ModalContatoComponent, ModalConfirmComponent],
  templateUrl: './table-usuario.component.html',
  styleUrl: './table-usuario.component.css'
})
export class TableUsuarioComponent implements OnChanges {
  @Input() secao = '';
  @Input() atualizar!: () => void; // Função recebida do pai
  textoConfirmar = '';
  idAlterar: undefined | number;
  
  private userService = inject(UsuarioService);
  usuarios: Usuario[] = [];
  @ViewChild('ModalContato') modalElementContato!: ElementRef;
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
    if (this.secao === 'secao1') {
      this.userService.listAtivos().subscribe((data) => {
        this.usuarios = data;
      });
    } else if (this.secao === 'secao2') {
      this.userService.listInativos().subscribe((data) => {
        this.usuarios = data;
      });
    }
  }

  // Alterar o status do usuário
  alterarStatus() {
    this.userService.updateStatusUser(this.idAlterar!).subscribe({
      next: (dado) => {
        this.carregarUsuarios();
      },
      error: (err) => {
        console.error('Erro ao alterar o status do usuário:', err);
      }
    });
  }

  //Abrir o Modal de Contato
  openModalContato(id: number) {
    this.idAlterar = id; // Atualiza o ID do usuário
  
    setTimeout(() => {
      const modalElement = document.getElementById('modalContato');
      if (modalElement) {
        const modal = new (window as any).bootstrap.Modal(modalElement);
        // Fecha e reabre o modal para garantir que o ID é atualizado
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
