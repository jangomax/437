export interface Job {
  name: string;
  salary: number;
  skills: Array<String> | undefined;
  benefits:  Array<String> | undefined;
  location: string;
}
