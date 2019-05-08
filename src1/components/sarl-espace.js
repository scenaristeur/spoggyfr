import './sarl-capacite.js';

import { LitElement, html, css } from 'lit-element';

class SarlEspace extends LitElement {
  static get properties() {
    return {
      name: String,
      agents: Array,
      rules: Array,
    }
  }

  render() {
    return html`
    <div>
    <h1>Espace</h1>
    <small>
    Un Espace est le support de l'interaction entre les agents, respectant les règles définies dans les spécification de cet espace.
    </small>
    <h3>
    Nom Espace : ${this.name}
    </h3>
    Agents :
    <ul>
    ${this.agents.map((agent) => html`<li>
      Nom Agent: ${agent.name}
      </li>`)
    }
    </ul>
    Règles :
    <ul>
    ${this.rules.map((rule) => html`<li>
      Nom Rule: ${rule.name}
      </li>`)
    }
    </ul>
    </div>
    `;
  }

  constructor() {
    super();
    this.name = "Nom de l'espace";
    this.agents = [
      {
        name: "agent 1"
      },
      {
        name: "agent 2"
      },
      {
        name: "agent 3"
      }],
      this.rules = [
        {
          name: "règle 1"
        },
        {
          name: "règle 2"
        },
        {
          name: "règle 3"
        }]
      }
    }

    window.customElements.define('sarl-espace', SarlEspace);
