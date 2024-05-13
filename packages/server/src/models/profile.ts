export interface Profile {
  id: string;
  name: string;
  nickname: string | undefined;
  home: string;
  jobs: Array<String>;
  avatar: string | undefined;
}
