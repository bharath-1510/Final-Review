import { Component } from '@angular/core';
import { Candidate } from '../model/candidate.model';
import { CandidateService } from '../services/candidate.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-candidate',
  templateUrl: './view-candidate.component.html',
  styleUrl: './view-candidate.component.scss',
})
export class ViewCandidateComponent {
  subscription!: Subscription;
  candidates: Candidate[] = [];
  questionTitles: string[] = [];
  constructor(
    private service: CandidateService,
    private _snackBar: MatSnackBar
  ) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.subscription = this.service.getCandidates().subscribe({
      next: (data) => {
        if (data.length != 0) {
          this.candidates = data;
          for (let index = 0; index < this.candidates.length; index++) {
            let title: string = '';
            const question = this.candidates[index].questions;
            if (question)
              for (let i = 0; i < question.length; i++) {
                const element = question[i];
                title += element.title + ',';
              }
            title = title.slice(0, -1);
            this.questionTitles.push(title);
          }
          this.openSnackBar('Candidates Shown ✅');
        }
      },
      error: (error) => {
        this.openSnackBar('Server not responding 😵');
      },
    });
  }
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }
}
