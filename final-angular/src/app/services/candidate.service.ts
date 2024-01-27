import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../model/question.model.';
import { Candidate } from '../model/candidate.model';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  private apiCandidate = 'http://localhost:8080/candidate';
  constructor(private http: HttpClient) {}
  uploadData(file: File): Observable<Candidate[]> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<Candidate[]>(`${this.apiCandidate}/upload`, formData);
  }
  assignCandidates(
    candidates: Candidate[]
  ): Observable<{ [key: string]: string }> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = { headers: headers };

    return this.http.post<{ [key: string]: string }>(
      `${this.apiCandidate}/assign`,
      candidates,
      options
    );
  }
}
