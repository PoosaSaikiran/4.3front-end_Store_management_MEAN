import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from './book';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  REST_API: string = "http://localhost:8000/api";
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  AddBook(data: Book): Observable<any> {
    return this.httpClient.post(`${this.REST_API}/add-book`, data, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    );
  }

  getBooks(): Observable<any> {
    return this.httpClient.get(`${this.REST_API}`, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    );
  }

  getBook(id: any): Observable<any> {
    return this.httpClient.get(`${this.REST_API}/read-book/${id}`, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
    );
  }

  updateBook(id: any, data: any): Observable<any> {
    return this.httpClient.put(`${this.REST_API}/update-book/${id}`, data, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    );
  }

  deleteBook(id: any): Observable<any> {
    return this.httpClient.delete(`${this.REST_API}/delete-book/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
