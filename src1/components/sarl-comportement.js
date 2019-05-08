import { LitElement, html, css } from 'lit-element';

class SarlComportement extends LitElement {
  static get properties() {
    return {
      name: String,

    }
  }

  render() {
    return html`
    <div>
    <h1>Comportement</h1>
    <small>

    </small>
    <h3>
    Nom Comportement : ${this.name}
    </h3>
    </div>
    `;
  }

  constructor() {
    super();
    this.name = "Nom du comportement";

  }
}

window.customElements.define('sarl-comportement', SarlComportement);
