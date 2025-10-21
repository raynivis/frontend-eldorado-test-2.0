import { Component, inject } from '@angular/core';
import { NavViewComponent } from '../../../tools/nav-view/nav-view.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TableTodosContatosComponent } from '../../tables/table-todos-contatos/table-todos-contatos.component';

@Component({
  selector: 'app-contatos',
  imports: [NavViewComponent, TableTodosContatosComponent],
  templateUrl: './contatos.component.html',
  styleUrl: './contatos.component.css',
})
export class ContatosComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  secao!: string;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const secaoParam = params['secao'];
      const valido = secaoParam === 'ativos' || secaoParam === 'inativos';

      if (valido) {
        this.secao = secaoParam;
      } else {
        this.secao = 'ativos';
        this.router.navigate(['/contatos', 'ativos']);
      }
    });
  }
}
