import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TipoContatoService } from '../../../services/tipo-contato.service';
import { ToastComponent } from '../../../tools/toast/toast.component';

@Component({
  selector: 'app-form-tipo-contato',
  imports: [ReactiveFormsModule, ToastComponent],
  templateUrl: './form-tipo-contato.component.html',
  styleUrl: './form-tipo-contato.component.css'
})
export class FormTipoContatoComponent{
  @ViewChild('Toast') toastElement!: ElementRef;
  isLoading = false; //controlar o carregamento
  feedbackToast = ''; //texto para o toast
  tipoFeedback = ''; //tipo positivo/negativo
  private readonly fB = inject(FormBuilder);
  private readonly typeService = inject(TipoContatoService);
  form = this.fB.group({
      descricao: ['', Validators.required]
  });

  cadastrar() {
    const type = {
      descricao: this.form.value.descricao!
    }; //objt a ser enviado para API
  
    this.isLoading = true; // Desativa o botão para evitar spam
  
    this.typeService.createType(type).subscribe({
      next: () => { //apos a requisicao
        this.isLoading = false;
        this.form.reset();
        this.feedbackToast = 'Tipo de Contato Cadastrado com Sucesso';
        this.tipoFeedback = 'bg-success';
        this.openModalToastS();
      },
      error: (err) => { //caso de erro
        this.isLoading = false;
        console.error("Erro ao cadastrar:", err);
        //erro comum do usuario
        if (err.status === 401) {
          this.feedbackToast = 'Não autorizado! Faça novamente seu login.';
        } else {
          this.feedbackToast = `Ocorreu um erro: ${err.message || 'Erro desconhecido'}`;
        }
        this.tipoFeedback = 'bg-danger';
        this.openModalToastS();
      }
    });
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
