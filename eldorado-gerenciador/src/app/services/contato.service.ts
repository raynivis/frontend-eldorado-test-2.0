import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from './APIenvironment';
import { Contato } from '../models/contato-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private readonly http = inject(HttpClient);
  private readonly APIBaseContacts = environment.URL + '/contatos';
  private readonly APIBaseContact = environment.URL + '/contato';

  listAtivos(): Observable<Contato[]> {
      return this.http.get<Contato[]>(`${this.APIBaseContacts}/ativos`);
    }
  
    listInativos(): Observable<Contato[]> {
      return this.http.get<Contato[]>(`${this.APIBaseContacts}/inaltivos`); //fiquei procurando e era o inaltivos
    }
  
    createContact(contact: any){
      return this.http.post<any>(this.APIBaseContact, contact);
    }
  
    updateStatusContact(contactId: number){
      return this.http.put<number>(`${this.APIBaseContact}/${contactId}/status`, contactId);
    }
  
}
