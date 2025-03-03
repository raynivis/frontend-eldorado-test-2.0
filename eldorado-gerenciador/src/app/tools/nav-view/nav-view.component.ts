import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-view',
  imports: [],
  templateUrl: './nav-view.component.html',
  styleUrl: './nav-view.component.css'
})
export class NavViewComponent {

  //Esse é um dos componentes mais importante desse projeto, usei ele muito em outros componentes

  private readonly router = inject(Router);
  //Primeira e Segunda Secao da NavBar
  @Input() secao1 = ''; 
  @Input() secao2 = ''; 
  @Input() secaoAtiva = 'secao1'; //Secao Padrao
  //Caminho que o roteamento vai levar
  @Input() caminhoRouter = '';
  //exclusivamente pra nav do modal
  @Output() modalRouter = new EventEmitter<string>(); 

  selecionarSecao(secao: string) {
    this.secaoAtiva = secao;
    this.router.navigate([this.caminhoRouter, secao]); 
  }
}
