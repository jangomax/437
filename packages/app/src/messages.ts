import { Profile } from "server/models";

export type Msg =
    | [
      "profile/save",
      {
        username: string;
        profile: Profile;
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
      }
    ]
    | ["profile/select", { username: string }]
    | ["companies/fetch"]
    | ["companies/select", { name: string }]
