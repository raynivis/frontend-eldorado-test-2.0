import { Component, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css']
})
export class TooltipComponent {

  //Implementei um ToolTip pelo Angular mesmo
  //O motivo é a liberdade de personalizacao
  
  @Input() texto = ''; 
  @Input() position: 'top' | 'bottom' = 'top'; //posição padrao para o tooltip: cima
  isVisible = false;

  @HostListener('mouseenter') onMouseEnter() {
    this.isVisible = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.isVisible = false;
  }
}
