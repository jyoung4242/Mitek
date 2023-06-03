import { GameState, State } from "./gameState";
import help from "./assets/help.svg";
import logout from "./assets/logout.svg";
import settings from "./assets/gear.svg";
import aiWhite from "./assets/AI_logo_white.png";
import aiNormal from "./assets/AI_logo_normal.jpg";
import { gameStates } from "./main";

export class Startup extends State {
  model: any;
  static template = `
  <div class="content" \${===isStartup}>
    <div class="sidebar">
      <div class="sidebar_flex">
        <div class="upper_sidebar">
          <a href="#"><img class="icons" alt="logout" src=${logout} /></a>
        </div>
        <div class="lower_sidebar">
          <a href="#"><img class="icons" alt="logout" src=${help} /></a>
          <a href="#"><img class="icons" alt="logout" src=${settings} /></a>
        </div>
      </div>
      <div class="logo_sidebar_container">
        <img class="logo_sidebar" alt="logo" src=${aiWhite} />
      </div>
    </div>
  </div>
   `;
  constructor() {
    super("startup");
  }

  public async enter(_previous: State, ...params: any): Promise<void> {
    const [model] = params;
    let axios = model.backendInfo.axios;
    this.model = model;
    model.currentGameState = gameStates.Startup;
    let port = model.backendInfo.port;
    //    let url = "http://localhost:" + port + "/connect";
    let url = "/api/connect";
    const res = await axios.post(url, { connectionString: "IPXDEMO" });
    if (res.data == "IPXDEMO Express Server") {
      //switch state
      model.currentGameState = gameStates.Login;
      GameState.set("login", "default", model);
    }
  }

  public async exit(_next: State, ...params: any) {}
}
