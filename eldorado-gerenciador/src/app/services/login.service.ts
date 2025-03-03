import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from './APIenvironment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly http = inject(HttpClient);
  private readonly APIBase = environment.URL + '/token/';

  login(usuario: any) {
    //JWT do sistema
    return new Promise((resolve, reject) => {

      //configurando o corpo da requisição no formato (tava mandando o "usuario" mas retornava sempre 422)
      const body = new URLSearchParams();
      body.set('username', usuario.username);
      body.set('password', usuario.password);

      //configura os headers para x-www-form-urlencoded
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      });

      //faz a requisição POST
      this.http.post<any>(this.APIBase, body.toString(), { headers }).subscribe({
        next: (response) => {
          if(response && response.access_token) {

            //armazenando em json para usar o access_token no interceptor
            localStorage.setItem('token', JSON.stringify({
              token_type: response.token_type,
              access_token: response.access_token
            }));

            resolve(true);
          } else {
            reject('Token não encontrado');
          }
        },
        error: (err) => {
          console.error('Erro no login:', err);
          console.error('Detalhes do erro:', err.error);
          reject(err);
        }
      });
    });
  }

  logout() {
    window.localStorage.clear();
  }

  //tranformando o json em objeto
  getAuthToken() {
    return JSON.parse(localStorage.getItem('token') || '{}'); // retorna um objeto ou um objeto vazio
  }

  //verificar a auth
  isAuthenticated(): boolean {
    const token = this.getAuthToken();
    return !!(token && token.access_token && !this.isTokenExpired(token.access_token));
  }

  private isTokenExpired(token: string): boolean {
    try { //verificando se o token esta expirado
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch (e) {
      return true; // se falhar na codificacao vai considerar expirado
    }
  }

}
