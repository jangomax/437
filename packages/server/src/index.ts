import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
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

const nodeModules = path.resolve(
  __dirname,
  "../../../node_modules"
);

console.log("Serving NPM packages from", nodeModules);
console.log(`Node Modules: ${nodeModules}`);
app.use("/node_modules", express.static(nodeModules));


app.use("/api/profiles", authenticateUser, profiles);
app.use("/auth", auth)

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World2");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
