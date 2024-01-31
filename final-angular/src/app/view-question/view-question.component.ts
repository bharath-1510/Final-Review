import { Component, OnDestroy } from '@angular/core';
import { Question } from '../model/question.model.';
import { QuestionService } from '../services/question.service';
import { Subscription } from 'rxjs';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { languages } from '../util/constants';
import { MatDialog } from '@angular/material/dialog';
import { QuestionDisplayComponent } from '../question-display/question-display.component';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrl: './view-question.component.scss',
})
export class ViewQuestionComponent implements OnDestroy {
  subscription!: Subscription;
  questions: Question[] = [];
  types: string[] = Object.keys(languages);
  temp: Question[] = [];
  constructor(
    private service: QuestionService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.types.push('All');
    this.types = this.types.sort();
    this.subscription = this.service.getQuestion().subscribe({
      next: (data) => {
        if (data.length != 0) {
          this.questions = data;
          this.temp = data;
          this.openSnackBar('Question Shown ✅');
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
      duration: 5000,
    });
  }
  type: string = 'All';
  onChange() {
    if (this.type != 'All') {
      this.questions = [];
      for (let index = 0; index < this.temp.length; index++) {
        let question = this.temp[index];
        if (this.type == question.type) this.questions.push(question);
      }
      console.log(this.questions);
    } else this.questions = this.temp;
  }
  openDialog(question: Question) {
    this.dialog.open(QuestionDisplayComponent, {
      data: question,
      width: '600px',
      height: '400px',
    });
  }
}
