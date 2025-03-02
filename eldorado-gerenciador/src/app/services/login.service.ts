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

      // Configurando o corpo da requisição no formato (tava mandando por "usuario" mas retornava sempre 422)
      const body = new URLSearchParams();
      body.set('username', usuario.username);
      body.set('password', usuario.password);

      // Configura os headers para x-www-form-urlencoded
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      });

      // Faz a requisição POST
      this.http.post<any>(this.APIBase, body.toString(), { headers }).subscribe({
        next: (response) => {
          console.log('Resposta da API:', response);
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
    return JSON.parse(localStorage.getItem('token') || '{}'); // Retorna um objeto ou um objeto vazio
  }

}
