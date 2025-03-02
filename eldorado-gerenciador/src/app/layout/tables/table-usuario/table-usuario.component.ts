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
  textoConfirmar = '';
  idAlterar: undefined | number;
  private userService = inject(UsuarioService);
  @Input() usuarios: Usuario[] = [];
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
      next: () => {
        console.log('Status do usuário alterado com sucesso.');
        this.carregarUsuarios(); // Recarrega a lista de usuários após a alteração
      },
      error: (err) => {
        console.error('Erro ao alterar o status do usuário:', err);
      }
    });
  }

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
