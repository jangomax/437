import { Auth, Update } from "@calpoly/mustang";
import { Profile,  } from "server/models";
import { Msg } from "./messages";
import { Model } from "./model";
import { Company } from "server/models";

export default function update(
  message: Msg,
  apply: Update.ApplyMap<Model>,
  user: Auth.User
) {
  switch (message[0]) {
    case "profile/save":
      saveProfile(message[1], user).then((profile) =>
        apply((model) => ({ ...model, profile }))
      )
      .then(() => {
        const { onSuccess } = message[1];
        if (onSuccess) onSuccess();
      })
      .catch((error: Error) => {
        const { onFailure } = message[1];
        if (onFailure) onFailure(error);
      });
      break;
    case "profile/select":
      selectProfile(message[1], user).then((profile) =>
        apply((model) => ({ ...model, profile }))
      );
      break;
    case "companies/fetch":
      console.log("compfetchcas3e")
      fetchCompanies(user).then(companies => {
        console.log("companies/fetchcom", companies)
        apply(model => ({ ...model, companies }))
      });
      break;
    case "companies/select":
      selectCompany(message[1], user).then(company => {
        apply(model => ({ ...model, company }))
      })
      break;
    default:
      const unhandled: string = message[0];
      throw new Error(`Unhandled Auth message "${unhandled}"`);
  }
}

function saveProfile(
  msg: {
    username: string;
    profile: Profile;
  },
  user: Auth.User
) {
  return fetch(`/api/profiles/${msg.profile.username}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user)
    },
    body: JSON.stringify(msg.profile)
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      return undefined;
    })
    .then((json: unknown) => {
      if (json) return json as Profile;
      return undefined;
    });
}

function selectProfile(
  msg: { username: string },
  user: Auth.User
) {
  console.log(`select profile ${msg.username}`);
  return fetch(`/api/profiles/${msg.username}`, {
    method: "GET",
    headers: Auth.headers(user)
  })
    .then((response: Response) => {
      if (response.status === 200) {
        return response.json();
      }
      return undefined;
    })
    .then((json: unknown) => {
      if (json) {
        console.log("Profile:", json);
        return json as Profile;
      }
    });
}

function selectCompany(msg: { name: string }, user: Auth.User) {
  console.log("get company")
  return fetch(`/api/companies/${msg.name}`, {
    method: "GET",
    headers: Auth.headers(user)
  })
    .then((response: Response) => {
      if (response.status === 200) {
        return response.json();
      }
      return undefined;
    })
    .then((json: unknown) => {
      if (json) {
        console.log("company" + json);
        return json as Company;
      }
    });
}

function fetchCompanies(user: Auth.User) {
  console.log("Fetchcomp");
  return fetch(`/api/companies/`, {
    method: "GET",
    headers: Auth.headers(user)
  })
  .then((response: Response) => {
    if (response.status === 200) {
      console.log(response);
      return response.json();
    }
    return undefined;
  })
  .then((json: unknown) => {
    if (json) {
      console.log("company" + json);
      return json as Company[];
    }
  });
}