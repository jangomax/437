import { Schema, Model, Document, model } from "mongoose";
import { Profile } from "../models/profile";

const ProfileSchema = new Schema<Profile>(
  {
    id: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    nickname: { type: String },
    home: { type: String },
    jobs: [String],
    avatar: { type: String }
  },
  {
    collection: "user_profiles"
  }
);

const ProfileModel = model<Profile>("Profile", ProfileSchema);

function index(): Promise<Profile[]> {
  return ProfileModel.find();
}

function get(id: String): Promise<Profile> {
  return ProfileModel.find({ id })
    .then((list) => list[0])
    .catch((err) => {
      throw `${id} Not Found`;
    });
}

function create(profile: Profile): Promise<Profile> {
  const p = new ProfileModel(profile);
  return p.save();
}

function update(
  id: String,
  profile: Profile
): Promise<Profile> {
return ProfileModel.findOne({ id })
  .then((found) => {
    if (!found) throw `${id} Not Found`;
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
    if (!updated) throw `${id} not updated`;
    else return updated as Profile;
  });
}

export default { index, get, create, update };

