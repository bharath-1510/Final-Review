import { Template } from './template.model';
import { TestCase } from './testcase.model';

export interface Question {
  id?: number;
  title?: string;
  description?: string;
  weightage?: number;
  templates?: Template[];
  testcases?: TestCase[];
  compilationTimeout?: number;
}
