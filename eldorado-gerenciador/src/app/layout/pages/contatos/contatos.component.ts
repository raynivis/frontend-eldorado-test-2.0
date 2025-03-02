import { Component, inject } from '@angular/core';
import { NavViewComponent } from '../../../tools/nav-view/nav-view.component';
import { ActivatedRoute } from '@angular/router';
import { TableTodosContatosComponent } from '../../tables/table-todos-contatos/table-todos-contatos.component';

@Component({
  selector: 'app-contatos',
  imports: [NavViewComponent, TableTodosContatosComponent],
  templateUrl: './contatos.component.html',
  styleUrl: './contatos.component.css'
})
export class ContatosComponent {
   private readonly route = inject(ActivatedRoute);
    secao!: string;
  
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.secao = params['secao'];
      });
  }
}
