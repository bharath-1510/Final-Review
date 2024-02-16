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
  testCaseCount: number = 0;
  hideField: boolean = false;
  template: { [key: string]: string } = {};
  displayTextArea: { [key: string]: boolean } = {};
  testCases: TestCase[] = [];
  title: string = '';
  types: string[] = Object.keys(languages);
  type: string = '';
  subscription!: Subscription;
  languages: string[] = [];
  testcaseCount: number = 0;
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
  ngOnInit(): void {}
  constructor(
    private service: QuestionService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}
  onSelect(language: string) {
    if (this.type == 'Coding') {
      this.template[language] = language + ' Code';
      this.displayTextArea[language] = !this.displayTextArea[language];
    } else {
      this.template[language + ' DDL'] = language + ' DDL Query';
      this.displayTextArea[language + ' DDL'] =
        !this.displayTextArea[language + ' DDL'];
      this.template[language + ' Output'] = language + ' Output Query';
      this.displayTextArea[language + ' Output'] =
        !this.displayTextArea[language + ' Output'];
    }
  }
  onSubmit() {
    if (this.type == 'Coding') {
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
        this.title.trim() == '' ||
        this.description.trim() == '' ||
        this.weightage == 0
      ) {
        this.openSnackBar('Enter The Valid Data ❌');
        return;
      }
      if (this.testCases.length == 0) {
        this.openSnackBar('Atleast One TestCase Needed ❌');
        return;
      }
      if (this.templates.length == 0) {
        this.openSnackBar('Atleast One Template Needed ❌');
        return;
      }
      let question: Question = {
        title: this.title,
        description: this.description,
        weightage: this.weightage,
        type: this.type,
        compilationTimeout: this.compilationTimeout,
        templates: this.templates,
        testcases: this.testCases,
      };
      this.subscription = this.service.saveQuestion(question).subscribe({
        next: (data) => {
          this.openSnackBar(data['result'] + ' ✅');
          this.router.navigate(['/view-question']);
        },
        error: (error) => {
          if (error['status'] === 400)
            this.openSnackBar(error['error'] + ' ❌');
          else this.openSnackBar('Server not responding 😵');
        },
      });
    } else {
      let query: string = '';
      let commands: string = '';
      let mySql = Object.keys(this.template);

      query = this.template[mySql[1]];
      commands = this.template[mySql[0]];
      if (
        this.title.trim() == '' ||
        this.description.trim() == '' ||
        this.weightage == 0
      ) {
        this.openSnackBar('Enter The Valid Data ❌');
        return;
      }

      let question: Question = {
        title: this.title,
        description: this.description,
        weightage: this.weightage,
        type: this.type,
        compilationTimeout: 0,
        query: query,
        commands: commands,
      };

      this.subscription = this.service.saveQuestion(question).subscribe({
        next: (data) => {
          this.openSnackBar(data['result'] + ' ✅');
          this.router.navigate(['/view-question']);
        },
        error: (error) => {
          if (error['status'] === 400)
            this.openSnackBar(error['error'] + ' ❌');
          else this.openSnackBar('Server not responding 😵');
        },
      });
    }
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
  generateTestCases() {
    this.testCases = [];
    for (let i = 0; i < this.testCaseCount; i++) {
      this.testCases.push({ input: '', output: '' });
    }
    this.hideField = true;
  }
  onChange() {
    this.template = {};
    // this.compilationTimeout = 0;

    this.displayTextArea = {};
    this.languages = languages[this.type];
  }
}
