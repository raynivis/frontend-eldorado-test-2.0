import { Component, inject } from '@angular/core';
import { TooltipComponent } from '../../../tools/tooltip/tooltip.component';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-form-login',
  imports: [TooltipComponent, ReactiveFormsModule],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.css',
})
export class FormLoginComponent {
  mostrarSenha = false;
  isLoading = false; //controlar o carregamento
  private readonly fB = inject(FormBuilder);
  private readonly loginService = inject(LoginService);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);

  form = this.fB.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  async fazerLogin() {
    this.isLoading = true;
    try {
      const resultado = await this.loginService.login(this.form.value);
      this.router.navigate(['']);
    } catch (err: any) {
      // Explicitamente definindo o tipo como "any"
      if (err?.status === 401) {
        this.toastService.error(
          'Usuário ou senha incorretos. Verifique seus dados e tente novamente.'
        );
      } else {
        const mensagemErro = err?.message || 'Erro desconhecido';
        this.toastService.error(`Ocorreu um erro: ${mensagemErro}`);
      }
    } finally {
      this.isLoading = false; //reativa o botão após a resposta
    }
  }

  toggleSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }
}
