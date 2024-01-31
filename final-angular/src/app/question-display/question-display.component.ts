import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Question } from '../model/question.model.';

@Component({
  selector: 'app-question-display',
  templateUrl: './question-display.component.html',
  styleUrl: './question-display.component.scss',
})
export class QuestionDisplayComponent {
  question!: Question;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Question,
    private matDialogRef: MatDialogRef<QuestionDisplayComponent>
  ) {}
  onClose(): void {
    this.matDialogRef.close();
  }
  ngOnInit(): void {
    this.question = this.data;
  }
}
