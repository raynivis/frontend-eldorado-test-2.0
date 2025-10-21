import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavViewComponent } from '../../../tools/nav-view/nav-view.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TableUsuarioComponent } from '../../tables/table-usuario/table-usuario.component';

@Component({
  selector: 'app-usuarios',
  imports: [NavViewComponent, TableUsuarioComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})
export class UsuariosComponent implements OnInit {
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
        this.router.navigate(['/usuarios', 'ativos']);
      }
    });
  }
}
