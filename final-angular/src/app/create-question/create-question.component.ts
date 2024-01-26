import { Component, OnInit } from '@angular/core';
import { languages } from '../util/constants';
import { Template } from '../model/template.model';
import { TestCase } from '../model/testcase.model';
import { Question } from '../model/question.model.';
import { QuestionService } from '../services/question.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

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

  ngOnInit(): void {}
  constructor(private service: QuestionService, private router: Router) {}
  languages = languages;
  testcaseCount: number = 0;
  disableButton = false;
  displayTextArea: { [key: string]: boolean } = {};
  onSelect(language: string) {
    this.template[language] = '';
    this.displayTextArea[language] = !this.displayTextArea[language];
  }
  onSubmit() {
    let selectedLanguages: string[] = Object.keys(this.template);
    for (let index = 0; index < selectedLanguages.length; index++) {
      if (this.template[selectedLanguages[index]] != '') {
        this.templates.push({
          code: this.template[selectedLanguages[index]],
          language: selectedLanguages[index],
        } as Template);
      }
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
        alert(data['result']);
        this.router.navigate(['/view-question']);
      },
      error: (error) => {
        if (error['status'] === 500) alert('Server not responding');
        else alert(error['error']);
      },
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
