export interface ISubmission {
  id: number;
  source_code: string;
  status: number;
  language: string;
  observation: string;
  problem: {
    id: number;
    title: string;
  };
  compilation: {
    memory: number;
    time: number;
    size: number;
  };
}
