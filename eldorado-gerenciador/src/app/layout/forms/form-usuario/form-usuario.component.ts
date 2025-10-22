import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-form-usuario',
  imports: [ReactiveFormsModule],
  templateUrl: './form-usuario.component.html',
  styleUrl: './form-usuario.component.css',
})
export class FormUsuarioComponent {
  mostrarSenha = false;
  isLoading = false; //controlar o carregamento
  private readonly fB = inject(FormBuilder);
  private readonly userService = inject(UsuarioService);
  private readonly toastService = inject(ToastService);
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
        this.toastService.success('Usuário Cadastrado com Sucesso');
      },
      error: (err) => {
        //caso de erro
        this.isLoading = false;
        //erro comum do usuario
        if (err.status === 401) {
          this.toastService.error('Não autorizado! Faça novamente seu login.');
        } else {
          this.toastService.error(
            `Ocorreu um erro: ${err.message || 'Erro desconhecido'}`
          );
        }
      },
    });
  }

  toggleSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }
}
