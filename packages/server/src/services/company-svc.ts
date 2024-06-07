import { Schema, Model, Document, model } from "mongoose";
import { Company } from "../models/company";
import { Job } from "../models/job";

const JobSchema = new Schema({
  name: { type: String, required: true, trim: true },
  salary: { type: Number, required: true },
  skills: { type: [String], default: [] },
  benefits: { type: [String], default: [] },
  location: { type: String, required: true }
})

const CompanySchema = new Schema<Company>(
  {
    name: { type: String, required: true, trim: true },
    jobs: [JobSchema],
    logo: { type: String }
  },
  {
    collection: "companies"
  }
);

const CompanyModel = model<Company>("Company", CompanySchema);

function index(): Promise<Company[]> {
  return CompanyModel.find();
}

function get(name: String): Promise<Company> {
  return CompanyModel.find({ name })
    .then((list) => list[0])
    .catch((err) => {
      throw `${name} Not Found`;
    });
}

function create(Company: Company): Promise<Company> {
  const p = new CompanyModel(Company);
  return p.save();
}

function update(
  name: String,
  Company: Company
): Promise<Company> {
return CompanyModel.findOne({ name })
  .then((found) => {
    if (!found) throw `${name} Not Found`;
    else
      return CompanyModel.findByIdAndUpdate(
        found._id,
        Company,
        {
          new: true
        }
      );
  })
  .then((updated) => {
    if (!updated) throw `${name} not updated`;
    else return updated as Company;
  });
}

export default { index, get, create, update };

