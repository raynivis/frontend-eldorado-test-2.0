import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContatoService } from '../../../services/contato.service';
import { ToastService } from '../../../services/toast.service';
import { TipoContatoService } from '../../../services/tipo-contato.service';
import { TipoContato } from '../../../models/tipo-usuario-model';

@Component({
  selector: 'app-form-contato',
  imports: [ReactiveFormsModule],
  templateUrl: './form-contato.component.html',
  styleUrl: './form-contato.component.css',
})
export class FormContatoComponent implements OnInit {
  //usar o usuario da lista de usuarios
  @Input() idUsuario: undefined | number;
  isLoading = false; //controlar o carregamento
  private readonly fB = inject(FormBuilder);
  private readonly contactService = inject(ContatoService);
  private readonly toastService = inject(ToastService);
  //para listar o tipo de contato
  private typeService = inject(TipoContatoService);
  tipos: TipoContato[] = [];

  form = this.fB.group({
    idtipo: ['selecione'],
    nome: ['', Validators.required],
    valor: ['', Validators.required],
  });

  ngOnInit(): void {
    this.typeService.listAtivos().subscribe((data) => {
      //faz sentindo ser so os ativos
      this.tipos = data;
    });
  }

  cadastrar() {
    if (this.form.value.idtipo == 'selecione') {
      this.toastService.error('Selecione um tipo de contato!');
      return;
    }

    const contact = {
      idtipo: Number(this.form.value.idtipo),
      idusuario: this.idUsuario,
      nome: this.form.value.nome,
      valor: this.form.value.valor,
    }; //objt a ser enviado para API

    this.isLoading = true; // Desativa o botão para evitar spam

    this.contactService.createContact(contact).subscribe({
      next: () => {
        //apos a requisicao
        this.isLoading = false;
        this.form.reset();
        this.form.patchValue({ idtipo: 'selecione' });
        this.toastService.success('Contato Cadastrado com Sucesso');
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
