import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { authGuard } from './guard/auth-guard.guard';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent , RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'eldorado-gerenciador';
  isAuthenticated = false; 
  private readonly router = inject(Router);

  onLoginSuccess() {
    this.isAuthenticated = true; 
  }

  logout() {
    this.isAuthenticated = false; 
  }

  ngOnInit() {
    // ir para o topo da pagina quando trocar a rota
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        // rola a pagina para o topo
        window.scrollTo({ top: 0, behavior: 'smooth' }); // scroll suave
      });
  }
}

