import { Component, EventEmitter, Output } from '@angular/core';
import { TooltipComponent } from '../../../tools/tooltip/tooltip.component';
import { FormLoginComponent } from "../../forms/form-login/form-login.component";

@Component({
  selector: 'app-login',
  imports: [FormLoginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 

}
