import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {
  private apiUrl = 'https://localhost:44379/api/Candidatos/';

  constructor(private http: HttpClient) {}
  

  listarCandidatos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}ListarCandidatos`).pipe(
      catchError((error: any) => {
        console.error('Erro ao listar candidatos:', error);
        return throwError(error);
      })
    );
  }

  obterCandidatoPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}ObterCandidatoPorId/${id}`).pipe(
      catchError((error: any) => {
        console.error('Erro ao obter candidato por ID:', error);
        return throwError(error);
      })
    );
  }

  criarCandidato(candidato: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}CriarCandidato`, candidato).pipe(
      catchError((error: any) => {
        console.error('Erro ao criar candidato:', error);
        return throwError(error);
      })
    );
  }

  atualizarCandidato(candidato: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}AtualizarCandidato`, candidato).pipe(
      catchError((error: any) => {
        console.error('Erro ao atualizar candidato:', error);
        return throwError(error);
      })
    );
  }

  buscarCandidatosPorNome(nome: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}BuscarCandidatosPorNome?nome=${nome}`).pipe(
      catchError((error: any) => {
        console.error('Erro ao buscar candidatos por nome:', error);
        return throwError(error);
      })
    );
  }

  deletarCandidato(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}DeletarCandidato/${id}`).pipe(
      catchError((error: any) => {
        console.error('Erro ao deletar candidato:', error);
        return throwError(error);
      })
    );
  }
}
