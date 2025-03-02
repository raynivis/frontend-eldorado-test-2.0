import { Component, input, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dropdownmenu',
  imports: [RouterModule],
  templateUrl: './dropdownmenu.component.html',
  styleUrl: './dropdownmenu.component.css'
})
export class DropdownmenuComponent {
  @Input() titulo = '';  
  @Input() tituloLink = '';
  @Input() options: { label: string; link: string }[] = []; // Lista de opções

  showMenu = false;
}
