import { Question } from './question.model.';

export interface Candidate {
  email?: string;
  questions?: Question[];
}
