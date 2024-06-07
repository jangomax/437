import express, { Request, Response } from "express";
import companies from "../services/company-svc";
import { Company } from "../models/company";

const router = express.Router();

router.get("/:name", (req: Request, res: Response) => {
  const { name } = req.params;
  console.log(`getcompany ${name}`);

  companies 
    .get(name)
    .then((company: Company) => res.json(company))
    .catch((err) => res.status(404).end());
});

router.post("/", (req: Request, res: Response) => {
  const newCompany = req.body;

  companies 
    .create(newCompany)
    .then((company: Company) => res.status(201).send(company))
    .catch((err) => res.status(500).send(err));
});

//index
router.get("/", (req: Request, res: Response) => {
  companies
    .index()
    .then((list: Company[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

router.put("/:name", (req: Request, res: Response) => {
  const { name } = req.params;
  const newCompany = req.body;

  companies
    .update(name, newCompany)
    .then((company: Company) => res.json(company))
    .catch((err) => res.status(404).end())
})

export default router;

