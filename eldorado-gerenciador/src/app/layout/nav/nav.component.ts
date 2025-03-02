import { Component, EventEmitter, Output } from '@angular/core';
import { DropdownmenuComponent } from '../../tools/dropdownmenu/dropdownmenu.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [DropdownmenuComponent, RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
    @Output() logoutE = new EventEmitter<void>();
  
    sair(){
      this.logoutE.emit(); 
    }

}
