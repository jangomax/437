export interface Profile {
  username: string;
  name: string;
  bio: string;
  location: string;
  skills: Array<String>;
  avatar: string | undefined;
}
