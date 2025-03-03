import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from './APIenvironment';
import { TipoContato } from '../models/tipo-usuario-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoContatoService {
  private readonly http = inject(HttpClient);
  private readonly APIBaseTypes = environment.URL + '/tipos';
  private readonly APIBaseType = environment.URL + '/tipo';

  listAtivos(): Observable<TipoContato[]> {
    return this.http.get<TipoContato[]>(`${this.APIBaseTypes}/ativos`);
  }

  listInativos(): Observable<TipoContato[]> {
    return this.http.get<TipoContato[]>(`${this.APIBaseTypes}/inativos`);
  }

  createType(type: any){
    return this.http.post<any>(this.APIBaseType, type);
  }

  updateStatusType(typeId: number){
    return this.http.put<number>(`${this.APIBaseType}/${typeId}/status`, typeId);
  }


}
