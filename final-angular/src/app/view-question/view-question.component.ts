import { Component } from '@angular/core';
import { Question } from '../model/question.model.';
import { QuestionService } from '../services/question.service';
import { Subscription } from 'rxjs';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrl: './view-question.component.scss',
})
export class ViewQuestionComponent {
  subscription!: Subscription;
  questions: Question[] = [];
  constructor(
    private service: QuestionService,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.subscription = this.service.getQuestion().subscribe({
      next: (data) => {
        if (data.length != 0) {
          this.questions = data;
          this.openSnackBar('Question Showed');
        } else this.openSnackBar('There is no question created');
      },
      error: (error) => {
        this.openSnackBar('Server not responding');
      },
    });
  }
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
    });
  }
}
