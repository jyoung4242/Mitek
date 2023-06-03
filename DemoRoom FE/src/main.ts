import "./style.css";
import { UI } from "@peasy-lib/peasy-ui";
import { GameState } from "./gameState";
import jsonEvents from "../events.json";
import axios, { AxiosError } from "axios";

import { Login } from "./login";
import { Startup } from "./startup";
import { MainApp } from "./mainApp";

type Callbacks = typeof callbacks;
type CallbackName = keyof Callbacks;

export enum gameStates {
  Login = "Login",
  Startup = "Startup",
  Main = "Main",
}

const model = {
  backendInfo: {
    port: 5500,
    axios: axios,
  },
  currentGameState: gameStates.Startup,
  get isLogin() {
    return this.currentGameState === "Login";
  },
  get isStartup() {
    return this.currentGameState === "Startup";
  },
  get isMain() {
    return this.currentGameState === "Main";
  },
  events: <any>[],
  currentUser: "Mookie Longbottom",
  LoginTime: "3:09PM on 4/13/23",
  username: <HTMLElement | undefined>undefined,
  password: <HTMLElement | undefined>undefined,
  showUserError: false,
  showPasswordError: false,
  ErrorMessage: "This is an error message",
  loginClick: async (_e: any, model: any) => {
    const username = model.username.value;
    const password = model.password.value;

    if (username == "" || password == "") return;

    //const url = "http://localhost:" + model.backendInfo.port + "/login";
    const url = "/api/login";
    let res;
    try {
      res = await axios.post(url, { username: username, password: password });
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status == 400) {
          model.username.style.border = "thick solid #FF0000";
          model.ErrorMessage = "USER NOT FOUND";
          model.showUserError = true;
          model.showPasswordError = false;
          model.username.focus();
          model.username.select();
        } else if (err.response?.status == 401) {
          model.password.style.border = "thick solid #FF0000";
          model.ErrorMessage = "INVALID PASSWORD";
          model.showUserError = false;
          model.showPasswordError = true;
          model.password.focus();
          model.password.select();
        } else {
        }
      }
    }

    if (res?.status == 200) {
      GameState.set("main", "default", model);
      model.currentUser = res.data.name;
      model.LoginTime = new Date().toLocaleDateString() + " at " + new Date().toLocaleTimeString();
    }
  },
  checkForEnter: (e: KeyboardEvent, model: any) => {
    if (e.key == "Enter") {
      model.loginClick();
    }
  },
  resetLoginInput: (_e: any, model: any) => {
    if (model.showUserError == true || model.showPasswordError == true) {
      model.username.style.border = "1px solid #004d82";
      model.password.style.border = "1px solid #004d82";
      model.showPasswordError = false;
      model.showUserError = false;
    }
  },
  logoutClick: (_e: any, model: any) => {
    if (model.currentGameState == "Main") {
      model.currentGameState = "Login";
      GameState.set("login", "default", model);
    } else if (model.currentGameState == "Login") {
      model.username.value = "";
      model.username.focus();
    }
  },
  showHelpClick: (_e: any, model: any) => {
    model.showHelp = !model.showHelp;
  },
  showSettingsClick: (_e: any, model: any) => {},
  runEvent: () => {},
  showHelp: false,
  showSettings: false,
};
const template = `
<div class="app"> 
    ${Login.template}
    ${Startup.template}
    ${MainApp.template}
</div>`;

UI.create(document.body, template, model);
let myEvents = jsonEvents;
Object.entries(myEvents).forEach((e: any) => {
  model.events.push({
    title: e[1].title,
    callback: () => {
      runCallback(e[1].callback);
    },
  });
});

function runCallback(callback: string) {
  console.log("in runCallback");

  callbacks[callback as CallbackName]();
}

GameState.create(Login, Startup, MainApp);
GameState.set("startup", "default", model);

const callbacks = {
  connectToCamera,
  muteMic,
};

async function muteMic() {
  const url = "/api/muteRemoteMic";
  let res;
  try {
    res = await axios.post(url, {});
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status == 400) {
      } else if (err.response?.status == 401) {
      } else {
      }
    }
  }

  if (res?.status == 200) {
    GameState.set("main", "default", model);
    model.currentUser = res.data.name;
    model.LoginTime = new Date().toLocaleDateString() + " at " + new Date().toLocaleTimeString();
  }
}

async function connectToCamera() {
  console.log("in connectToCamers");

  //const url = "http://localhost:" + model.backendInfo.port + "/cameraConnect";
  const url = "/api/cameraConnect";
  let res;
  try {
    res = await axios.post(url, {});
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status == 400) {
      } else if (err.response?.status == 401) {
      } else {
      }
    }
  }

  if (res?.status == 200) {
    GameState.set("main", "default", model);
    model.currentUser = res.data.name;
    model.LoginTime = new Date().toLocaleDateString() + " at " + new Date().toLocaleTimeString();
  }
}
