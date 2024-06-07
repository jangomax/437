import { Profile, Company } from "server/models";

export interface Model {
    profile?: Profile;
    companies?: Company[];
    company?: Company;
}

export const init: Model = {};
