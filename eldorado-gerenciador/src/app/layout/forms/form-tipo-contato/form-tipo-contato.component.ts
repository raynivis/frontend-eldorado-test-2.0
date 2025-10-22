import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TipoContatoService } from '../../../services/tipo-contato.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-form-tipo-contato',
  imports: [ReactiveFormsModule],
  templateUrl: './form-tipo-contato.component.html',
  styleUrl: './form-tipo-contato.component.css',
})
export class FormTipoContatoComponent {
  isLoading = false; //controlar o carregamento
  private readonly fB = inject(FormBuilder);
  private readonly typeService = inject(TipoContatoService);
  private readonly toastService = inject(ToastService);
  form = this.fB.group({
    descricao: ['', Validators.required],
  });

  cadastrar() {
    const type = {
      descricao: this.form.value.descricao!,
    }; //objt a ser enviado para API

    this.isLoading = true; // Desativa o botão para evitar spam

    this.typeService.createType(type).subscribe({
      next: () => {
        //apos a requisicao
        this.isLoading = false;
        this.form.reset();
        this.toastService.success('Tipo de Contato Cadastrado com Sucesso');
      },
      error: (err) => {
        //caso de erro
        this.isLoading = false;
        console.error('Erro ao cadastrar:', err);
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
}
