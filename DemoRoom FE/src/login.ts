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

export class Login extends State {
  model: any;
  static template = `
  <div class="content" \${===isLogin}>
  <div class="branding">
    <img class="branding_logo" src="${aiNormal}" />
  </div>

  <div class="login_form">
    <div class="login_flex">
      <div class="login_logo">
        <img class="logo_login" alt="logo" src="${user}" />
      </div>
      <div class="login_input_flex">
        <div class="login_input_container">
          <div class="error user" \${===showUserError}>\${ErrorMessage}</div>
          <img class="logo_input_login" alt="username" src="${username}" />
          <input \${==>username} \${input@=>resetLoginInput} class="input_login" maxlength="18" title="USERNAME" />
        </div>
        
        <div class="login_input_container">
          <div class="error password" \${===showPasswordError}>\${ErrorMessage}</div>  
          <img class="logo_input_login" alt="password" src="${password}" />
          <input \${==>password} \${input@=>resetLoginInput} \${keypress@=>checkForEnter} type="password" class="input_login" maxlength="20" title="PASSWORD" />
        </div>
        
        <button class="button" title="LOGIN" \${click@=>loginClick}>LOGIN</button>
      </div>
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

  <div class="helpscreen" \${===showHelp}>
    <h1>Login Help</h1>
    <p>You must be a registered user to access this app</p>
    <p>Enter Valid Username in the top field, and your assigned password in the bottom field.  Click submit or hit enter to request access</p>
  </div>

</div>
   `;
  constructor() {
    super("login");
  }

  public async enter(_previous: State, ...params: any): Promise<void> {
    const [model] = params;
    this.model = model;
    await this.wait(25);

    model.currentGameState = gameStates.Login;
    await this.wait(50);
    model.username.value = "";
    model.username.focus();
  }

  public async exit(_next: State, ...params: any) {}

  async wait(ms: number): Promise<void> {
    return new Promise((resolve: any) =>
      setTimeout(() => {
        resolve();
      }, ms)
    );
  }
}
