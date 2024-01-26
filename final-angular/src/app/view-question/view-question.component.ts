import { Component } from '@angular/core';
import { Question } from '../model/question.model.';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrl: './view-question.component.scss',
})
export class ViewQuestionComponent {
  displayedColumns: string[] = ['index', 'title'];
  dataSource: Question[] = [];
}
