import express, { Request, Response } from "express";
import cors from "cors";
import { connect } from "./services/mongo";
import profiles from "./routes/profiles";
import auth, { authenticateUser } from "./routes/auth";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

connect("salarysheet");

app.use(express.static(staticDir));
app.use(express.json());
app.use(cors());

app.use("/api/profiles", authenticateUser, profiles);
app.use("/auth", auth)

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
