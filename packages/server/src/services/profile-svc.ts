import { Schema, Model, Document, model } from "mongoose";
import { Profile } from "../models/profile";

const ProfileSchema = new Schema<Profile>(
  {
    username: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    location: { type: String },
    bio: { type: String },
    skills: [String]
  },
  {
    collection: "user_profiles"
  }
);

const ProfileModel = model<Profile>("Profile", ProfileSchema);

function index(): Promise<Profile[]> {
  return ProfileModel.find();
}

function get(username: String): Promise<Profile> {
  console.log(`Get user <${username}>`);
  return ProfileModel.find({ username })
    .then((list) => list[0])
    .catch((err) => {
      throw `${username} Not Found`;
    });
}

function create(profile: Profile): Promise<Profile> {
  const p = new ProfileModel(profile);
  return p.save();
}

function update(
  username: String,
  profile: Profile
): Promise<Profile> {
return ProfileModel.findOne({ username })
  .then((found) => {
    if (!found) throw `${username} Not Found`;
    else
      return ProfileModel.findByIdAndUpdate(
        found._id,
        profile,
        {
          new: true
        }
      );
  })
  .then((updated) => {
    if (!updated) throw `${username} not updated`;
    else return updated as Profile;
  });
}

export default { index, get, create, update };

