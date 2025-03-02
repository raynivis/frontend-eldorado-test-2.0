import { Component } from '@angular/core';
import { NavComponent } from "../../nav/nav.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-management',
  imports: [NavComponent, RouterOutlet],
  templateUrl: './management.component.html',
  styleUrl: './management.component.css'
})
export class ManagementComponent {

}
