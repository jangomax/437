import {
  define,
  Form,
  History,
  InputArray,
  View
} from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Profile } from "server/models";
import { ProfileAvatarElement } from "../components/profile-avatar";
import { Msg } from "../messages";
import { Model } from "../model";

const profileStyle = css`
  * {
      margin: 0;
      box-sizing: border-box;
  }
  section {
      display: grid;
      grid-template-columns: [key] 2fr [value] 2fr [controls] 2fr [end];
      gap: var(--size-spacing-medium);
      align-items: end;
      margin: var(--size-spacing-medium) auto;
  }
  h1 {
      grid-row: 4;
      grid-column: value;
  }
  slot[name="avatar"] {
      display: grid;
      grid-row: 1/ span 4;
  }
  mu-form {
      grid-column: key / end;
      margin: 0;
  }
  dl {
      display: grid;
      grid-column: key / end;
      grid-template-columns: subgrid;
      gap: 0 var(--size-spacing-medium);
      align-items: baseline;
  }
  dt {
      grid-column: key;
      justify-self: end;
      color: var(--color-accent);
      font-family: var(--font-family-display);
  }
  dd {
      padding-left: var(--size-spacing-large);
      grid-column: value;
  }

  nav {
    grid-column: 3;
    grid-row: 4;
    display: grid;
    text-align: right;
    margin-top: var(--margin-size-med);
    justify-content: left;
  }
  nav > a {
    margin-top: var(--size-spacing-small);
    font-size: var(--font-size-body);
    color: var(--color-text);
    text-align: center;
  }

  nav > * {
    grid-column: controls;
  }

  ::slotted(ul) {
      list-style: none;
      display: flex;
      gap: var(--size-spacing-small);
  }
  `;

class ProfileViewer extends LitElement {
  @property()
  username?: string;

  render() {
      console.log(this.username);
    return html`
      <section>
        <slot name="avatar"></slot>
        <h1><slot name="name"></slot></h1>
        <dl>
          <dt>Username</dt>
          <dd><slot name="username"></slot></dd>
          <dt>Bio</dt>
          <dd><slot name="bio"></slot></dd>
          <dt>Location</dt>
          <dd><slot name="location"></slot></dd>
        </dl>
        <nav>
          <a href="${this.username}/edit" class="edit">Edit</a>
      </nav>
      </section>
    `;
  }

  static styles = [
      profileStyle,
  ];
}

class ProfileEditor extends LitElement {
  static uses = define({
    "mu-form": Form.Element,
    "input-array": InputArray.Element
  });
  @property()
  username?: string;

  @property({ attribute: false })
  init?: Profile;

  render() {
    return html`
      <section>
        <slot name="avatar"></slot>
        <h1><slot name="name"></slot></h1>
        <mu-form .init=${this.init}>
          <label>
            <span>Username</span>
            <input disabled name="username" />
          </label>
          <label>
            <span>Name</span>
            <input name="name" />
          </label>
          <label>
            <span>Bio</span>
            <input name="bio" />
          </label>
          <label>
            <span>Location</span>
            <input name="location" />
          </label>
          <label>
            <span>Avatar</span>
            <input name="avatar" />
          </label>
        </mu-form>
        <nav>
          <a class="close" href="../${this.username}">Close</a>
        </nav>
      </section>
    `;
  }

  static styles = [
    profileStyle
  ];
}

export class ProfileViewElement extends View<Model, Msg> {
  static uses = define({
    "profile-viewer": ProfileViewer,
    "profile-editor": ProfileEditor,
    "profile-avatar": ProfileAvatarElement
  });

  @property({ type: Boolean, reflect: true })
  edit = false;

  @property({ attribute: "user-id", reflect: true })
  userid = "";

  @state()
  get profile(): Profile | undefined {
    return this.model.profile;
  }

  constructor() {
    super("blazing:model");
    this.addEventListener("mu-form:submit", (event) =>
      this._handleSubmit(event as Form.SubmitEvent<Profile>)
    );
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (
      name === "user-id" &&
      oldValue !== newValue &&
      newValue
    ) {
      console.log("Profiler Page:", newValue);
      this.dispatchMessage([
        "profile/select",
        { username: newValue }
      ]);
    }
  }

  render() {
    const {
      avatar,
      name,
      username,
      bio,
      location,
    } = this.profile || {};
    const initial = (name || username || "?").slice(
      0,
      1
    );

    const fields = html`
      <profile-avatar
        slot="avatar"
        src=${avatar}
        initial=${initial}></profile-avatar>
    `;

    console.log(username)
    return this.edit
      ? html`
          <profile-editor
            username=${username}
            .init=${this.profile}
            @mu-form:submit=${(
        event: Form.SubmitEvent<Profile>
      ) => this._handleSubmit(event)}>
            ${fields}
          </profile-editor>
        `
      : html`
          <profile-viewer username=${username}>
            ${fields}
            <span slot="name">${name}</span>
            <span slot="username">${username}</span>
            <span slot="bio">${bio}</span>
            <span slot="location">${location}</span>
          </profile-viewer>
        `;
  }

  _handleSubmit(event: Form.SubmitEvent<Profile>) {
    console.log("Handling submit of mu-form");
    this.dispatchMessage([
      "profile/save",
      {
        username: this.userid,
        profile: event.detail,
        onSuccess: () =>
          History.dispatch(this, "history/navigate", {
            href: `/app/profile/${event.detail.username}`
          }),
        onFailure: (error: Error) =>
          console.log("ERROR:", error)
      }
    ]);
  }
}