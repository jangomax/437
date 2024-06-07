import express, { Request, Response } from "express";
import profiles from "../services/profile-svc";
import { Profile } from "../models/profile";

const router = express.Router();

router.get("/:username", (req: Request, res: Response) => {
  const { username } = req.params;
  console.log(`get ${username}`);

  profiles
    .get(username)
    .then((profile: Profile) => res.json(profile))
    .catch((err) => res.status(404).end());
});

router.post("/", (req: Request, res: Response) => {
  const newProfile = req.body;

  profiles
    .create(newProfile)
    .then((profile: Profile) => res.status(201).send(profile))
    .catch((err) => res.status(500).send(err));
});

//index
router.get("/", (req: Request, res: Response) => {
  profiles
    .index()
    .then((list: Profile[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

router.put("/:username", (req: Request, res: Response) => {
  const { username } = req.params;
  const newProfile = req.body;

  profiles
    .update(username, newProfile)
    .then((profile: Profile) => res.json(profile))
    .catch((err) => res.status(404).end())
})

export default router;

