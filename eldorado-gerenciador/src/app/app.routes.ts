import { Routes } from '@angular/router';
import { HomeComponent } from './layout/pages/home/home.component';
import { UsuariosComponent } from './layout/pages/usuarios/usuarios.component';
import { CadastroUsuarioComponent } from './layout/pages/cadastro-usuario/cadastro-usuario.component';
import { TiposContatoComponent } from './layout/pages/tipos-contato/tipos-contato.component';
import { CadastroTipoContatoComponent } from './layout/pages/cadastro-tipo-contato/cadastro-tipo-contato.component';
import { ContatosComponent } from './layout/pages/contatos/contatos.component';
import { LoginComponent } from './layout/pages/login/login.component';
import { ManagementComponent } from './layout/main-routes/management/management.component';
import { authGuard } from './guard/auth-guard.guard';

export const routes: Routes = [
    {
        path: '', component: ManagementComponent,
        children: [
            {path: '', component: HomeComponent},
            {path: 'usuarios/:secao', component: UsuariosComponent},
            {path: 'cadastro_usuario', component: CadastroUsuarioComponent},
            {path: 'tipos_contato/:secao', component: TiposContatoComponent},
            {path: 'cadastro_tipo_contato', component: CadastroTipoContatoComponent},
            {path: 'contatos/:secao', component: ContatosComponent}
        ],
        canActivate: [authGuard]
    },
    {
        path: '', component: LoginComponent,
        children: [
            {path: '', redirectTo: 'login', pathMatch: 'full'}, //evitar erro do user
            {path: 'login', component: LoginComponent}
        ]
    }
];

