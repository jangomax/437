import bcrypt from "bcryptjs";
import { Schema, model } from "mongoose";
import { Credential } from "../models/credential";

const credentialSchema = new Schema<Credential>(
  {
    id: {
      type: String,
      required: true,
      trim: true
    },
    hashedPassword: {
      type: String,
      required: true
    }
  },
  { collection: "user_credentials" }
);

const credentialModel = model<Credential>(
  "Credential",
  credentialSchema
);

function verify(
  id: string,
  password: string
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    credentialModel
      .find({ id })
      .then((found) => {
        if (found && found.length === 1) return found[0];
        else reject("Invalid username or password");
      })
      .then((credsOnFile) => {
        if (credsOnFile)
          bcrypt.compare(
            password,
            credsOnFile.hashedPassword,
            (_, result) => {
              console.log(
                "Verified",
                result,
                credsOnFile.id
              );
              if (result) resolve(credsOnFile.id);
              else reject("Invalid username or password");
            }
          );
        else reject("Invalid username or password");
      });
  });
}

function checkExists(id: string) {
  return new Promise<boolean>((resolve, reject) => {
    credentialModel
      .find({ id })
      .then((found) => resolve(found && found.length > 0));
  });
}

function create(id: string, password: string) {
  return new Promise<Credential>((resolve, reject) => {
    if (!id || !password) {
      reject("must provide id and password");
    }
    credentialModel
      .find({ id })
      .then((found: Credential[]) => {
        if (found.length) reject("id exists");
      })
      .then(() =>
        bcrypt
          .genSalt(10)
          .then((salt: string) => bcrypt.hash(password, salt))
          .then((hashedPassword: string) => {
            const creds = new credentialModel({
              id,
              hashedPassword
            });
            creds.save().then((created: Credential) => {
              if (created) resolve(created);
            });
          })
      );
  });
}

export default { create, verify };
