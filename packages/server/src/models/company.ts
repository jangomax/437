import { Job } from "./job"

export interface Company {
  name: string;
  industry: string;
  jobs: Array<Job>;
  logo: string | undefined;
}
