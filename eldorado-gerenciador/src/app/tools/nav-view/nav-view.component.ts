import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-view',
  imports: [],
  templateUrl: './nav-view.component.html',
  styleUrl: './nav-view.component.css'
})
export class NavViewComponent {
  private readonly router = inject(Router);
  @Input() secao1 = ''; 
  @Input() secao2 = ''; 
  @Input() secaoAtiva = 'secao1'; //Secao Padrao
  @Input() caminhoRouter = '';
  @Output() modalRouter = new EventEmitter<string>(); 

  selecionarSecao(secao: string) {
    this.secaoAtiva = secao;
    if(this.caminhoRouter === 'modal'){
        this.modalRouter.emit(secao);
        return;
    }
    this.router.navigate([this.caminhoRouter, secao]); 
  }
}
