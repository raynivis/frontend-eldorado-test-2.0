import {
  Component,
  inject,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { authGuard } from './guard/auth-guard.guard';
import { filter } from 'rxjs';
import { ToastService } from './services/toast.service';
import { ToastComponent } from './tools/toast/toast.component';
import { Toast } from 'bootstrap';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, RouterOutlet, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  @ViewChild('Toast', { static: true }) toastEl!: ElementRef;

  title = 'eldorado-gerenciador';
  isAuthenticated = false;
  feedbackToast = '';
  tipoFeedback = '';

  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);
  private toastInstance: Toast | null = null;

  onLoginSuccess() {
    this.isAuthenticated = true;
  }

  logout() {
    this.isAuthenticated = false;
  }

  ngOnInit() {
    // Inicializar o toast do Bootstrap
    this.toastInstance = new Toast(this.toastEl.nativeElement, {
      autohide: true,
      delay: 3000,
    });

    // Inscrever-se nas mensagens de toast
    this.toastService.toast$.subscribe((toast) => {
      this.feedbackToast = toast.mensagem;
      this.tipoFeedback = toast.toastClass;
      this.toastInstance?.show();
    });

    // ir para o topo da pagina quando trocar a rota
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        // rola a pagina para o topo
        window.scrollTo({ top: 0, behavior: 'smooth' }); // scroll suave
      });
  }
}
