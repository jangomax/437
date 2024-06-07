import { define, Auth, Events, Store, Switch, History } from "@calpoly/mustang";
import { HeaderElement } from "./components/header"
import { LightModeToggle } from "./components/light-mode"
import { Model, init } from "./model";
import { Msg } from "./messages";
import update from "./update";
import { Landing } from "./components/landing";
import { html } from "lit";
import { LoginFormElement } from "./components/login-form";
import { ProfileViewElement } from "./views/profile-view";
import { JobViewElement } from "./views/jobs-view";

const routes: Switch.Route[] = [
    {
        path: "/app",
        view: () => html`
            <landing-element></landing-element>
        `
    },
    {
        path: "/",
        redirect: "/app"
    },

    {
        path: "/app/login",
        view: () => html`
            <main-login></main-login>
        `
    },
    {
      path: "/app/profile",
      view: () => html`
        <profile-view></profile-view>
      `
    },
    {
      path: "/app/profile/:username",
      view: (params: Switch.Params) => html`
        <profile-view user-id=${params.username}></profile-view>
      `
    },
    {
      path: "/app/profile/:username/edit",
      view: (params: Switch.Params) => html`
      <profile-view edit user-id=${params.id}></profile-view>
    `
    },
    {
      path: "/app/jobs/",
      view: () => html`
        <jobs-view></jobs-view>
      `
    }
]

class AppStore extends Store.Provider<
    Model,
    Msg
> {
    constructor() {
        super(update, init, "blazing:auth");
    }
}



define({
    "mu-auth": Auth.Provider,
    "blazing-header": HeaderElement,
    "light-mode": LightModeToggle,
    "landing-element": Landing,
    "mu-store": AppStore,
    "mu-history": History.Provider,
    "mu-switch": class AppSwitch extends Switch.Element {
        constructor() {
            super(routes, "blazing:history", "blazing:auth");
        }
    },
    "main-login": LoginFormElement,
    "profile-view": ProfileViewElement,
    "jobs-view": JobViewElement
});

// @ts-ignore
window.relayEvent = Events.relay;

const page = document.body;

page.addEventListener('light-mode:toggle', (event) => {
    console.log(event)
    // @ts-ignore
    const { checked } = event.detail;

    document.body.classList.toggle('light-mode', checked);
});