// import { html, css, } from 'lit';
// //@ts-ignore
// import { property, state } from 'lit/decorators.js';
// import { View } from "@calpoly/mustang";
// import { Msg } from "../messages";
// import { Model } from "../model";
// import { Company } from 'server/models';
// import resetCSS from "../css/reset";

// export class CompanyViewElement extends View<Model, Msg> {

//   @state()
//   get company(): Company | undefined {
//     console.log("comp", this.model.company);
//     return this.model.company;
//   }

//   constructor() {
//     super("blazing:model");
//     console.log("Jobview constr");
//   }

//   connectedCallback() {
//     super.connectedCallback();
//     this.dispatchMessage(["companies/fetch"]);
//   }

//   render() {
//     console.log("rendering companyview")
//     return html`
//     <h2>${this.company.name}</h2>
//     <img
//       class="featured"
//       src="../images/bishop.jpeg"
//     />
//     <article>
//       <section>
//         <h3>Information</h3>
//         <dl>
//           <dt>Num. Employees</dt>
//           <dd>132</dd>
//           <dt>Amenities</dt>
//           <dd>Cafe, Game Room</dd>
//         </dl>
//       </section>
//       <section>
//         <h3>Available Roles</h3>
//         <ul>
//           <li><a onclick="loadHTML('../role/backend-software-engineer.html', event.target.closest('a'))">Backend Engineer</a></li>
//         </ul>
//       </section>
//     </article>
      
//     `;
//   };


//   static styles = [
//     resetCSS,
//     css`
//       :host {
//         display: contents;
//       }
//       table {
//         width: 100%;
//         border-collapse: collapse;
//       }
//       tr {
//         font-size: var( --size-type-body);
//       }
//       th {
//         font-family: var(--body-font-family);
//         font-size: 13px;
//       }
//       h3 {
//         margin-top: var(--size-spacing-large);
//         font-size: var(--size-type-xlarge);
//       }

//       th, td {
//         padding: 12px 15px;
//         text-align: left;
//         border-bottom: 1px solid #dddddd;
//       }
//     `
//   ];
// }