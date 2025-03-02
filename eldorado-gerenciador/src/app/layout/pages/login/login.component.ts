import { Component, EventEmitter, Output } from '@angular/core';
import { TooltipComponent } from '../../../tools/tooltip/tooltip.component';

@Component({
  selector: 'app-login',
  imports: [TooltipComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output() loginSuccess = new EventEmitter<void>();

  fazerLogin() {
    this.loginSuccess.emit(); 
  }
}
