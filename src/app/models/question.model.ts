import { Answer } from './answer.model';

export class Question {
  key?: string;
  question: string;
  answerRight: string;
  answered: string;
  insertDate: string;
  status: boolean;
  answers: Answer[];
}
