import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { ToastComponent } from '../../../tools/toast/toast.component';

@Component({
  selector: 'app-form-usuario',
  imports: [ReactiveFormsModule, ToastComponent],
  templateUrl: './form-usuario.component.html',
  styleUrl: './form-usuario.component.css',
})
export class FormUsuarioComponent {
  @ViewChild('Toast') toastElement!: ElementRef;
  mostrarSenha = false;
  isLoading = false; //controlar o carregamento
  feedbackToast = '';
  tipoFeedback = '';
  private readonly fB = inject(FormBuilder);
  private readonly userService = inject(UsuarioService);
  form = this.fB.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', Validators.required],
  });

  cadastrar() {
    const user = {
      nome: this.form.value.nome!,
      email: this.form.value.email!,
      senha: this.form.value.senha!,
    }; //objt a ser enviado para API

    this.isLoading = true; // Desativa o botão para evitar spam

    this.userService.createUser(user).subscribe({
      next: () => {
        //apos a requisicao
        this.isLoading = false;
        this.form.reset();
        this.feedbackToast = 'Usuário Cadastrado com Sucesso';
        this.tipoFeedback = 'bg-success';
        this.openModalToastS();
      },
      error: (err) => {
        //caso de erro
        this.isLoading = false;
        //erro comum do usuario
        if (err.status === 401) {
          this.feedbackToast = 'Não autorizado! Faça novamente seu login.';
        } else {
          this.feedbackToast = `Ocorreu um erro: ${
            err.message || 'Erro desconhecido'
          }`;
        }
        this.tipoFeedback = 'bg-danger';
        this.openModalToastS();
      },
    });
  }

  openModalToastS() {
    if (this.toastElement) {
      const modal = new (window as any).bootstrap.Toast(
        this.toastElement.nativeElement
      );
      modal.show();
    } else {
      console.error('Modal element não encontrado');
    }
  }

  toggleSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }
}
