import express, { response } from "express";
import * as dotenv from "dotenv";
import users from "./useraccounts.json";
import axios from "axios";

const cors = require("cors");
const version = "1.0.14";
let sessionID = "";
let micMute = false;

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.post("/api/connect", (req: any, res) => {
  console.log(req.body);
  if (req.body.connectionString == "IPXDEMO") {
    res.send("IPXDEMO Express Server");
  }
});

app.post("/api/cameraConnect", async (req, res) => {
  console.log("send Camera connection");

  const username = "admin";
  const password = "AtlasIED-123";
  console.log("setting up Camera request data");
  const url = "https://172.26.58.5/rest/session";

  let cameraRes;

  console.log("setting axios post");
  cameraRes = await axios.post(url, { user: username, password: password });

  if (cameraRes?.status == 200) {
    console.log(cameraRes.data);
    sessionID = cameraRes.data.session.sessionID;
  }
  res.send("SENDING CAMERA CONNECTION");
});

app.post("/api/muteRemoteMic", async (req, res) => {
  console.log("muting remote mic");

  const url = "https://172.26.58.5/rest/audio/muted";
  let muteRes;

  muteRes = await axios.post(url, true);

  if (muteRes?.status == 200) {
    console.log(muteRes.data);
    res.send("REMOTE MIC MUTED");
    micMute = true;
  } else {
    res.send("NOT OKAY");
    micMute = false;
  }
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  let userEntry: { username: string; password: string; name: string } | undefined = users.users.find(
    (user: any, index: number) => user.username === username
  );

  console.log("entry found", userEntry);

  if (userEntry) {
    //found user
    if (userEntry.password == password) {
      console.log("password match");
      res.send({ username: username, name: userEntry.name, status: true });
    } else {
      //invalid password
      console.log("password not matched");
      res.status(401).send(`username: ${username} - invalid password`);
    }
  } else {
    //invalid user
    res.status(400).send(`username: ${username} - not found`);
  }
});

app.listen(port, () => {
  console.log(`[server]: version ${version} Server is running at port:${port}`);
});
