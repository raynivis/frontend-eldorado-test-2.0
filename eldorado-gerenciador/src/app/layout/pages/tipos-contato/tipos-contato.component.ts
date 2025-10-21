import { Component, inject, OnInit } from '@angular/core';
import { NavViewComponent } from '../../../tools/nav-view/nav-view.component';
import { TooltipComponent } from '../../../tools/tooltip/tooltip.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TableTipoContatoComponent } from '../../tables/table-tipo-contato/table-tipo-contato.component';

@Component({
  selector: 'app-tipos-contato',
  imports: [NavViewComponent, TableTipoContatoComponent],
  templateUrl: './tipos-contato.component.html',
  styleUrl: './tipos-contato.component.css',
})
export class TiposContatoComponent implements OnInit {
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
        this.router.navigate(['/tipos', 'ativos']);
      }
    });
  }
}
