import { Component, ElementRef, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { DropdownmenuComponent } from '../../tools/dropdownmenu/dropdownmenu.component';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ModalConfirmComponent } from "../modals/modal-confirm/modal-confirm.component";

@Component({
  selector: 'app-nav',
  imports: [DropdownmenuComponent, RouterModule, ModalConfirmComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  private readonly loginService = inject(LoginService);
  private readonly router = inject(Router);
  @ViewChild('ModalConf') modalElementConfirmar !: ElementRef;

  sair() {  
    this.loginService.logout();
    this.router.navigate(['login']);
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

}
