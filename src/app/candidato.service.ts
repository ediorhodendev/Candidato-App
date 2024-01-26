import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {
  private apiUrl = 'https://localhost:44363/api/Candidatos/';

  constructor(private http: HttpClient) {}
  

  listarCandidatos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}ListarCandidatos`).pipe(
      catchError((error: any) => {
        console.error('Erro ao listar candidatos:', error);
        return throwError(error);
      })
    );
  }

  obterCandidatoPorId(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}ObterCandidatoPorId/${id}`).pipe(
      catchError((error: any) => {
        console.error('Erro ao obter candidato por ID:', error);
        return throwError(error);
      })
    );
  }

  criarCandidato(candidato: any): Observable<any> {
    candidato.id='';
    return this.http.post<any>(`${this.apiUrl}CriarCandidato`, candidato).pipe(
      catchError((error: any) => {
        console.error('Erro ao criar candidato:', error);
        return throwError(error);
      })
    );
  }

  atualizarCandidato(candidato: any): Observable<any> {
    if (!candidato || !candidato.id) {
      
      const errorMessage = 'Candidato ou ID não estão definidos.';
      console.error(errorMessage);
      return throwError(new Error(errorMessage));
    }
  
    const url = `${this.apiUrl}AtualizarCandidato/${candidato.id}`;
  
    return this.http.put<any>(url, candidato).pipe(
      catchError((error: any) => {
        console.error('Erro na requisição de atualização:', error);
        alert("teste");
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
  verificarCpfExistente(cpf: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}verificacpfexiste?cpf=${cpf}`).pipe(
      catchError((error: any) => {
        console.error('Erro ao verificar CPF existente:', error);
        return throwError(error);
      })
    );
  }
  deletarCandidato(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}DeletarCandidato/${id}`).pipe(
      catchError((error: any) => {
        console.error('Erro ao deletar candidato:', error);
        return throwError(error);
      })
    );
  }
}
