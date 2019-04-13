import './sarl-action-prototype.js';

import { LitElement, html, css } from 'lit-element';

class SarlCapacite extends LitElement {
  static get properties() {
    return {
      name: String,
      action_prototypes: Array,
    }
  }

  render() {
    return html`
    <div>
    <h1>Capacité</h1>
    <small>
    Une capacité est une collection de prototypes d'action. Une capacité peut être utilisée
    pour spécifier ce qu'un agent peut faire ou ce qu'une tâche requière pour son execution
    </small>
    <h3>
    Nom Capacité : ${this.name}
    </h3>
    <ul>
    ${this.action_prototypes.map((proto) => html`<li>
      <h4>
      Nom Prototype Action: ${proto.name}
      </h4>
      <sarl-action-prototype
      name="${proto.name}"
      .parameters="${proto.parameters}"
      returnedtype="${proto.returnedtype}">
      </sarl-action-prototype>
      </li>`)}
      </ul>

      </div>
      `;
    }

    constructor() {
      super();
      this.name = "Nom de la capacité";
      this.action_prototypes = [
        {
          name: "action capacite1",
          parameters: ["param capacite 1", "param capacite 2"],
          returnedtype: "Boolean"
        },
        {
          name: "action capa2",
          parameters: ["param capacite 3", "param capacite 2"],
          returnedtype: "String"
        },
        {
          name: "action capacite 3",
          parameters: ["param capacite 1", "param capacite 2"],
          returnedtype: "Array"
        }]
      }
    }

    window.customElements.define('sarl-capacite', SarlCapacite);
