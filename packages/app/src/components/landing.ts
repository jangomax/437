import { LitElement, css, html } from "lit";


export class Landing extends LitElement {
    render() {
        return html`
        <div class="landing">
            <div class="content">
                <h1>SalarySheet</h1>
                <p>Get a job.</p>
                <br>
                <a class="button" href="/app/login?next=/app/jobs/">Start searching</a>
            </div>
            <div class="img-container">
              <img src="/assets/nett.png" width="350px" />
            </div>
        </div>
        `
    }

  static styles = css`
    .landing {
      display: flex;
      justify-content: center;
      flex-wrap:wrap;
      gap: 30px;
      margin-top: 6em;
    }
      
    .content > * {
      font-family: var(--body-font-family);
      align-self: left;
    }

    .button {
      /* Make a green button with white text */
      background-color: var(--color-accent-2);
      color: var(--color-dark);
      padding: 10px 20px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
    }

    .img-container {
      padding-left: 10em;
    }

    img {
      border-radius: 30%;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    }

  `

}