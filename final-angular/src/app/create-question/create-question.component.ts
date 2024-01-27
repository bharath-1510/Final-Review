import { Component, OnInit } from '@angular/core';
import { languages } from '../util/constants';
import { Template } from '../model/template.model';
import { TestCase } from '../model/testcase.model';
import { Question } from '../model/question.model.';
import { QuestionService } from '../services/question.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrl: './create-question.component.scss',
})
export class CreateQuestionComponent implements OnInit {
  description: string = '';
  weightage: number = 0;
  compilationTimeout: number = 0;
  templates: Template[] = [];
  template: { [key: string]: string } = {};
  testCaseCount: number = 0;
  hideField: boolean = false;
  testCases: TestCase[] = [];
  subscription!: Subscription;
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {}
  constructor(
    private service: QuestionService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}
  languages = languages;
  testcaseCount: number = 0;
  disableButton = false;
  displayTextArea: { [key: string]: boolean } = {};
  onSelect(language: string) {
    this.template[language] = language + ' Code';
    this.displayTextArea[language] = !this.displayTextArea[language];
  }
  onSubmit() {
    let selectedLanguages: string[] = Object.keys(this.template);
    for (let index = 0; index < selectedLanguages.length; index++) {
      if (
        this.template[selectedLanguages[index]] !=
        selectedLanguages[index] + ' Code'
      ) {
        this.templates.push({
          code: this.template[selectedLanguages[index]],
          language: selectedLanguages[index],
        } as Template);
      }
    }
    if (
      this.description.trim() == '' &&
      this.weightage == 0 &&
      this.compilationTimeout == 0
    ) {
      this.openSnackBar('Enter The Valid Data');
      return;
    }
    if (this.testCases.length == 0) {
      this.openSnackBar('Atleast One TestCase Needed');
      return;
    }
    if (this.templates.length == 0) {
      this.openSnackBar('Atleast One Template Needed');
      return;
    }
    let question: Question = {
      description: this.description,
      weightage: this.weightage,
      compilationTimeout: this.compilationTimeout,
      templates: this.templates,
      testcases: this.testCases,
    };
    this.subscription = this.service.saveQuestion(question).subscribe({
      next: (data) => {
        this.openSnackBar(data['result']);
        this.router.navigate(['/view-question']);
      },
      error: (error) => {
        if (error['status'] === 400) this.openSnackBar(error['error']);
        else this.openSnackBar('Server not responding');
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
  generateTestCases() {
    this.testCases = [];
    for (let i = 0; i < this.testCaseCount; i++) {
      this.testCases.push({ input: '', output: '' });
    }
    this.hideField = true;
  }
}
