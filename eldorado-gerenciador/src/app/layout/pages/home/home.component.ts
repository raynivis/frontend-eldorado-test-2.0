import { Component } from '@angular/core';
import {RouterModule} from '@angular/router';
import { TooltipComponent } from '../../../tools/tooltip/tooltip.component';


@Component({
  selector: 'app-home',
  imports: [RouterModule, TooltipComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
