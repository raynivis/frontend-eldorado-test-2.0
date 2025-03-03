import { Component, input, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dropdownmenu',
  imports: [RouterModule],
  templateUrl: './dropdownmenu.component.html',
  styleUrl: './dropdownmenu.component.css'
})
export class DropdownmenuComponent {
  //componentizar o dropdownmenu
  @Input() titulo = '';  
  @Input() tituloLink = ''; //router da navegacao principal
  @Input() options: { label: string; link: string }[] = []; // Lista da navegacao

  showMenu = false;
}
