import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { TooltipComponent } from "../../../tools/tooltip/tooltip.component";
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastComponent } from "../../../tools/toast/toast.component";

@Component({
  selector: 'app-form-login',
  imports: [TooltipComponent, ReactiveFormsModule, ToastComponent],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.css'
})
export class FormLoginComponent{
  @ViewChild('Toast') toastElement!: ElementRef;
  feedbackToast = '';
  mostrarSenha = false;
  isLoading = false; //controlar o carregamento
  private readonly fB = inject(FormBuilder)
  private readonly loginService = inject(LoginService);
  private readonly router = inject(Router);

  form = this.fB.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  
  async fazerLogin() {
    this.isLoading = true;  
    try {
      const resultado = await this.loginService.login(this.form.value);
      this.router.navigate(['']);
    } catch (err: any) { // Explicitamente definindo o tipo como "any"  
      if (err?.status === 401) {
        this.feedbackToast = 'Usuário ou senha incorretos. Verifique seus dados e tente novamente.';
      } else {
        const mensagemErro = err?.message || 'Erro desconhecido';
        this.feedbackToast = `Ocorreu um erro: ${mensagemErro}`;
      }
      this.openModalToastS();
    } finally {
      this.isLoading = false;  //reativa o botão após a resposta
    }
  }
  

  toggleSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }

  openModalToastS() {
    if (this.toastElement) {
      const modal = new (window as any).bootstrap.Toast(this.toastElement.nativeElement);
      modal.show();
    } else {
      console.error('Modal element não encontrado');
    }
  }

}
