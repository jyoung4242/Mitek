import { GameState, State } from "./gameState";
import help from "./assets/help.svg";
import logout from "./assets/logout.svg";
import settings from "./assets/gear.svg";
import aiWhite from "./assets/AI_logo_white.png";
import aiNormal from "./assets/atlasied.png";
import user from "./assets/user.svg";
import username from "./assets/name.svg";
import password from "./assets/password.svg";
import { gameStates } from "./main";

export class MainApp extends State {
  model: any;
  static template = `
  <div class="content" \${===isMain}>
  <div class="branding">
    <img class="branding_logo" src="${aiNormal}" />
  </div>

  <div class="event_div">
    
    <div class="event_flex">
      <button \${event<=*events} \${click@=>event.callback} class="button" title="\${event.title}">\${event.title}</button>
    </div>
  </div>

  <div class="sidebar">
    <div class="sidebar_flex">
      <div class="upper_sidebar">
        <a \${click@=>logoutClick} ><img class="icons" alt="logout" src="${logout}" title="LOGOUT" /></a>
      </div>
      <div class="lower_sidebar">
        <a \${click@=>showHelpClick}><img class="icons" alt="logout" src="${help}" title="HELP" /></a>
        <a \${click@=>showSettingsClick}><img class="icons" alt="logout" src="${settings}" title="SETTINGS" /></a>
      </div>
    </div>
    <div class="logo_sidebar_container">
      <img class="logo_sidebar" alt="logo" src="${aiWhite}" />
    </div>
  </div>

  <div class="user_info">
    <span>Logged in as:  \${currentUser} on \${LoginTime}</span>
  </div>


</div>;`;
  constructor() {
    super("main");
  }

  public enter(_previous: State, ...params: any): void {
    const [model] = params;
    this.model = model;
    model.currentGameState = gameStates.Main;
  }

  public async exit(_next: State, ...params: any) {}
}
