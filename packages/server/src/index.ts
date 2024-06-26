import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import profiles from "./routes/profiles";
import companies from "./routes/companies";
import auth, {authenticateUser} from "./routes/auth";
import path from "path";
import fs from "node:fs/promises";

connect("salarysheet")

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";
console.log("Serving static files from ", staticDir);
app.use(express.static(staticDir));

app.use(express.json());



app.use("/auth", auth);
const nodeModules = path.resolve(
  __dirname,
  "../../../packages/proto/node_modules"
);
console.log("Serving NPM packages from", nodeModules);
app.use("/node_modules", express.static(nodeModules));

app.use("/api/profiles", authenticateUser, profiles);
app.use("/api/companies", authenticateUser, companies);


app.get("/hello", (_: Request, res: Response) => {
  res.send(
    `<h1>Hello!</h1>
     <p>Server is up and running.</p>
     <p>Serving static files from <code>${staticDir}</code>.</p>
    `
  );
});

// SPA Routes: /app/...
app.use("/app", (req: Request, res: Response) => {
  const indexHtml = path.resolve(staticDir, "index.html");
  fs.readFile(indexHtml, { encoding: "utf8" }).then((html) =>
    res.send(html)
  );
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});