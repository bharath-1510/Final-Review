import { Component } from '@angular/core';
import { Question } from '../model/question.model.';
import { Subscription } from 'rxjs';
import { QuestionService } from '../services/question.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Candidate } from '../model/candidate.model';
import { CandidateService } from '../services/candidate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assign-question',
  templateUrl: './assign-question.component.html',
  styleUrl: './assign-question.component.scss',
})
export class AssignQuestionComponent {
  candidates: Candidate[] = [];
  questions: Question[] = [];
  displayQuestions: Question[] = [];
  selectedQuestions: Question[] = [];
  subscriptions: Subscription[] = [];
  constructor(
    private service: QuestionService,
    private _snackBar: MatSnackBar,
    private candidateService: CandidateService,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
  ngOnInit(): void {
    this.subscriptions.push(
      this.service.getQuestion().subscribe({
        next: (data) => {
          if (data.length != 0) {
            this.questions = data;
            this.displayQuestions = this.questions.map(
              ({ id, weightage, description, title, type }) => ({
                id,
                weightage,
                description,
                title,
                type,
              })
            );
            this.openSnackBar('Question Shown ✅');
          } else this.openSnackBar('No Questions Yet ❌');
        },
        error: (error) => {
          this.openSnackBar('Server not responding 😵');
        },
      })
    );
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
  onTableRowSelect(event: any) {
    const clickedRow = event.target.closest('tr');
    if (clickedRow) {
      let questionId = clickedRow.cells[0].textContent;
      let question = this.displayQuestions.find((x) => x.id == questionId);
      if (question) {
        this.selectedQuestions.push(question);
        this.displayQuestions = this.displayQuestions.filter(
          (x) => x != question
        );
        this.displayQuestions = this.displayQuestions.sort((a, b) => {
          if (a.id !== undefined && b.id !== undefined) {
            return a.id - b.id;
          } else if (a.id !== undefined) {
            return -1;
          } else if (b.id !== undefined) {
            return 1;
          } else {
            return 0;
          }
        });
        this.selectedQuestions = this.selectedQuestions.sort((a, b) => {
          if (a.id !== undefined && b.id !== undefined) {
            return a.id - b.id;
          } else if (a.id !== undefined) {
            return -1;
          } else if (b.id !== undefined) {
            return 1;
          } else {
            return 0;
          }
        });
      }
    }
  }
  onTableRowRemove(event: any) {
    const clickedRow = event.target.closest('tr');

    if (clickedRow) {
      let questionId = clickedRow.cells[0].textContent;
      let question = this.selectedQuestions.find((x) => x.id == questionId);
      if (question) {
        this.displayQuestions.push(question);
        this.selectedQuestions = this.selectedQuestions.filter(
          (x) => x != question
        );
        this.displayQuestions = this.displayQuestions.sort((a, b) => {
          if (a.id !== undefined && b.id !== undefined) {
            return a.id - b.id;
          } else if (a.id !== undefined) {
            return -1;
          } else if (b.id !== undefined) {
            return 1;
          } else {
            return 0;
          }
        });
        this.selectedQuestions = this.selectedQuestions.sort((a, b) => {
          if (a.id !== undefined && b.id !== undefined) {
            return a.id - b.id;
          } else if (a.id !== undefined) {
            return -1;
          } else if (b.id !== undefined) {
            return 1;
          } else {
            return 0;
          }
        });
      }
    }
  }
  onFileChange(event: any): void {
    const file = event.target.files[0];

    if (file) {
      this.subscriptions.push(
        this.candidateService.uploadData(file).subscribe({
          next: (response) => {
            if (response) {
              if (response.length == 0)
                this.openSnackBar('There is no candidate details ❌');
              else {
                this.openSnackBar('Data Uploaded ✅');
                this.candidates = response;
              }
            } else this.openSnackBar('Server not responding 😵');
          },

          error: (error) => {
            if (error['status'] == 400)
              this.openSnackBar(error['error'] + ' ❌');
            else this.openSnackBar('Server not responding 😵');
          },
        })
      );
    }
  }
  onSubmit() {
    if (this.selectedQuestions.length == 0) {
      this.openSnackBar('One Question to be Selected ❌');
      return;
    }
    if (this.candidates.length == 0) {
      this.openSnackBar('Candidate Data is Empty ❌');
      return;
    }
    for (let index = 0; index < this.candidates.length; index++) {
      this.candidates[index].questions = this.selectedQuestions;
    }
    this.subscriptions.push(
      this.candidateService.assignCandidates(this.candidates).subscribe({
        next: (data) => {
          this.openSnackBar(data['result'] + ' ✅');
          this.router.navigate(['/view-candidate']);
        },
        error: (error) => {
          if (error['status'] === 400)
            this.openSnackBar(error['error'] + ' ❌');
          else this.openSnackBar('Server not responding 😵');
        },
      })
    );
  }
}
