import { IProblemTestCase } from './problem-test-case.interface';

export interface IProblem {
  title: string;
  id: number;
  description_text: string;
  input_text: string;
  output_text: string;
  time_limit: number;
  author_name: string;
  solved: boolean;
  attempted: boolean;
  example_test_cases: IProblemTestCase[];
  category: {
    name: string;
    id: number;
  };
}
