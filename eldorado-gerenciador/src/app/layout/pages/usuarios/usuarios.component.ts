import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { NavViewComponent } from '../../../tools/nav-view/nav-view.component';
import { ActivatedRoute } from '@angular/router';
import { TableUsuarioComponent } from '../../tables/table-usuario/table-usuario.component';


@Component({
  selector: 'app-usuarios',
  imports: [NavViewComponent, TableUsuarioComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  secao!: string;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.secao = params['secao'];
    });
  }
}
