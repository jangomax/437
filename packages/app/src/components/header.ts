import { css, html } from "lit";
import { Auth, Dropdown, Observer, View, define } from "@calpoly/mustang";
import { property } from "lit/decorators.js";
import { Model } from "../model";
import { Msg } from "../messages";
import resetCSS from "../css/reset";

export class HeaderElement extends View<Model, Msg> {
  static uses = define({
    "drop-down": Dropdown.Element
  });

  @property()
  username = "anonymous";

  @property()
  authenticated = false

  _authObserver = new Observer<Auth.Model>(
    this,
    "blazing:auth"
  );

  connectedCallback() {
    super.connectedCallback();

    console.log("Connected")

    this._authObserver.observe(({ user }) => {
      console.log("User", user)
      if (user && user.authenticated) {
        this.username = user.username;
        this.authenticated = true;
        return
      }
      this.authenticated = false;
      this.username = "anonymous";
    });
  }

  render() {
    return html`
      <header>
        <a id="title" href="/app">SalarySheet</a>
        ${this.authenticated ? html`
          <a href="/app/jobs/">Jobs</a>
          <a href=${"/app/profile/" + this.username}>Profile</a>
        ` : html`
          <p></p>
        `}
        

       <drop-down>
        <table>
          <tr>
            <light-mode></light-mode>
          </tr>
          <tr>
          ${this.authenticated ? html`
            <a href="/app/login" onclick="relayEvent(event, 'auth:message', ['auth/signout'])">
              Sign out
            </a>
          ` : html`
            <a href="/app/login?next=/app/tracker">Log In</a>
          `}

  </tr>
  </table>
       </drop-down>
      </header>
    `;
  }

  static styles = [
    resetCSS,
    css`
    header {
      display: flex;
      justify-content: space-between;
      align-items: center; /* Center items vertically */
      background-color: var(--color-accent-2);
      color: var(--color-dark);
      font-family: var(--display-font-family);

      gap: 10px;
      align-items: center;
      padding: 1em;
      background-color: var(--color-accent-2);
    }

    #title {
        color: var(--color-dark);
        font-size: 1.2em;
        font-weight: bold;
        font-family: var(--display-font-family);
    }

    a {
        color: var(--text-color);
        /* remove underline */
        text-decoration: none;
    }

    drop-down > * {
      background-color: var(--color-accent-2);
    }

    a:hover {
      text-decoration: underline;
    }
  `
  ];
}