import { Profile } from "../models/profile";

let profiles: Array<Profile> = [
  {
    id: "blaze",
    name: "Blaze Pasquale",
    nickname: undefined,
    home: "Oakland, CA",
    jobs: [],
    avatar: "/data/avatars/Blaze Pasquale.png"
  },
  {
    id: "daver",
    name: "David Davey",
    nickname: undefined,
    home: "Vallejo, CA",
    jobs: [],
    avatar: "/data/avatars/Blaze Pasquale.png"
  },
  {
    id: "tim",
    name: "Timothy",
    nickname: "t1m",
    home: "Emeryville, CA",
    jobs: [],
    avatar: "/data/avatars/Blaze Pasquale.png"
  },
];

export function get(id: String): Profile | undefined {
  return profiles.find((t) => t.id === id);
}

export default { get };
