import { html, css, } from 'lit';
//@ts-ignore
import { property, state } from 'lit/decorators.js';
import { View,  } from "@calpoly/mustang";
import { Msg } from "../messages";
import { Model } from "../model";
import { Company } from 'server/models';
import resetCSS from "../css/reset";

export class JobViewElement extends View<Model, Msg> {

  @state()
  get companies(): Company[] {
    console.log("comp", this.model.companies);
    return this.model.companies || [];
  }

  constructor() {
    super("blazing:model");
    console.log("Jobview constr");
  }

  connectedCallback() {
    super.connectedCallback();
    this.dispatchMessage(["companies/fetch"]);
  }

  render() {
    console.log("rendering jobview")
    return html`
      ${this.companies.map((comp: Company) => html`
      <table>
        <tr>
          <h3>${comp.name}</h3>
        </tr>
        <tr>
          <th>Position</th>
          <th>Salary</th>
          <th>Location</th>
          <th>Skills</th>
          <th>Benefits</th>
        </tr>
          ${comp.jobs.map((job) => html`
        
          <tr>
            <th>${job.name}</th>
            <th>${job.salary}</th>
            <th>${job.location}</th>
            <th>${job.skills?.join(', ')}</th>
            <th>${job.benefits?.join(', ')}</th>
          </tr>

          `
          )}

        </tr>
      </table>
        `)}
    `;
  };


  static styles = [
    resetCSS,
    css`
      :host {
        display: contents;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      tr {
        font-size: var( --size-type-body);
      }
      th {
        font-family: var(--body-font-family);
        font-size: 13px;
      }
      h3 {
        margin-top: var(--size-spacing-large);
        font-size: var(--size-type-xlarge);
      }

      th, td {
        padding: 12px 15px;
        text-align: left;
        border-bottom: 1px solid var(--color-text);
      }
    `
  ];
}