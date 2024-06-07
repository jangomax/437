import { Events } from "@calpoly/mustang";
import { LitElement, html } from "lit";

function toggleLightMode(ev: InputEvent) {
    const target = ev.target as HTMLInputElement;
    const checked = target.checked;

    Events.relay(ev, "light-mode:toggle", { checked });
}

export class LightModeToggle extends LitElement {
    render() {
        return html`
        <label @change=${toggleLightMode}>
            <input type="checkbox" autocomplete="off" />
            Light mode
        </label>`
    }
}