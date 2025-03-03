import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from './APIenvironment';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario-model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly http = inject(HttpClient);
  private readonly APIBaseUsers = environment.URL + '/usuarios';
  private readonly APIBaseUser = environment.URL + '/usuario';


  listAtivos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.APIBaseUsers}/ativos`);
  }

  listInativos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.APIBaseUsers}/inativos`);
  }

  createUser(user: any){
    return this.http.post<any>(this.APIBaseUser, user);
  }

  updateStatusUser(userId: number){
    return this.http.put<number>(`${this.APIBaseUser}/${userId}/status`, userId);
  }
  
}
