import { Component, inject, OnInit } from '@angular/core';
import { TooltipComponent } from "../../../tools/tooltip/tooltip.component";
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-login',
  imports: [TooltipComponent, ReactiveFormsModule],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.css'
})
export class FormLoginComponent{
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
    } catch (err) {
      console.error(err);
    } finally {
      this.isLoading = false;  // reativa o botao apos a resposta
    }
  }

  toggleSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }

}
