import { Template } from './template.model';
import { TestCase } from './testcase.model';

export interface Question {
  id?: number;
  title?: string;
  description?: string;
  weightage?: number;
  type?: string;
  query?: string;
  commands?: string;
  templates?: Template[];
  testcases?: TestCase[];
  compilationTimeout?: number;
}
