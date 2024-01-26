import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../model/question.model.';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private apiQuestion = 'http://localhost:8080/question';
  constructor(private http: HttpClient) {}
  saveQuestion(question: Question): Observable<{ [key: string]: string }> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = { headers: headers };

    return this.http.post<{ [key: string]: string }>(
      `${this.apiQuestion}/save`,
      question,
      options
    );
  }
}
