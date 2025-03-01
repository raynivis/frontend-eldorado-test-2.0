import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { LoginComponent } from './layout/pages/login/login.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavComponent } from './layout/nav/nav.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, LoginComponent, FooterComponent, NavComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'eldorado-gerenciador';
  isAuthenticated = false; 

  onLoginSuccess() {
    this.isAuthenticated = true; 
  }
}
