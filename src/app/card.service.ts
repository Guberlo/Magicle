import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Card } from './card';
import { cardsDTO } from './cardsDTO';
import { CARDS } from './mock-cards';

import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private url = 'https://api.magicthegathering.io/v1/cards';

  constructor(
    private messageService: MessageService,
    private http: HttpClient) { }

  private log(message: string) {
    this.messageService.add(message);
  }
  
  getCards(): Observable<cardsDTO> {
    return this.http.get<cardsDTO>(this.url, {observe: 'body', responseType: 'json'})
      .pipe(
        tap(_ => this.log('Cards fetched')),
        catchError(this.handleError<cardsDTO>('getCards'))
        );
  }

  getCard(name: string): Observable<cardsDTO> {
    return this.http.get<cardsDTO>(`${this.url}?name="${name}"`)
      .pipe(
        tap(_ => this.log(`Fetched ${name}`)),
        catchError(this.handleError<cardsDTO>('getCard'))
      );
  }

  searchCard(term: string): Observable<cardsDTO> {
    if (!term.trim())
      return of();
    
    return this.http.get<cardsDTO>(`${this.url}?name=${term}`).pipe(
      tap(x => x.cards.length ?
        this.log(`Found cards matching ${term}`) :
        this.log(`No cards matching ${term}`)),
      catchError(this.handleError<cardsDTO>('searchCards'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
