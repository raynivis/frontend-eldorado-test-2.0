import { Component, ElementRef, inject, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { TooltipComponent } from '../../../tools/tooltip/tooltip.component';
import { ModalConfirmComponent } from '../../modals/modal-confirm/modal-confirm.component';
import { TipoContatoService } from '../../../services/tipo-contato.service';
import { TipoContato } from '../../../models/tipo-usuario-model';

@Component({
  selector: 'app-table-tipo-contato',
  imports: [TooltipComponent, ModalConfirmComponent],
  templateUrl: './table-tipo-contato.component.html',
  styleUrl: './table-tipo-contato.component.css'
})
export class TableTipoContatoComponent implements OnChanges {
  @Input() secao = '';
  textoConfirmar = '';
  idAlterar: undefined | number;
  private typeService = inject(TipoContatoService);
  tipos: TipoContato[] = [];
  @ViewChild('ModalConf') modalElementConfirmar !: ElementRef;

  //ao mudar secao do componente
  ngOnChanges(changes: SimpleChanges): void {
    this.tipos = [];
    if (changes['secao']) {
      this.carregarTipos();
    }
  }

  //carregar os tipos inativos ou ativos
  carregarTipos(): void {
    if (this.secao === 'secao1') {
      this.typeService.listAtivos().subscribe((data) => {
        this.tipos = data;
      });
    } else if (this.secao === 'secao2') {
      this.typeService.listInativos().subscribe((data) => {
        this.tipos = data;
      });
    }
  }

  // Alterar o status do tipo
  alterarStatus() {
    this.typeService.updateStatusType(this.idAlterar!).subscribe({
      next: () => {
        this.carregarTipos(); // recarrega a lista de tipos apos a alteracao
      },
      error: (err) => {
        console.error('Erro ao alterar o status do tipo:', err);
      }
    });
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
  ConfDesativar(id: number) {
    this.idAlterar = id;
    this.textoConfirmar = "Você deseja mesmo desativar este tipo de contato?";
    this.openModalConfirmar();
  }

  //Ativar
  ConfAtivar(id: number) {
    this.idAlterar = id;
    this.textoConfirmar = "Você deseja mesmo ativar este tipo de contato?";
    this.openModalConfirmar();
  }

}
