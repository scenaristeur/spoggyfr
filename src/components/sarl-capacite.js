import './sarl-action-prototype.js';

import { LitElement, html, css } from 'lit-element';

class SarlCapacite extends LitElement {
  static get properties() {
    return {
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


    <ul>
    ${this.action_prototypes.map((proto) => html`<li>
      <h3>Nom: ${proto.name}
      </h3>
      <sarl-action-prototype
      name="${proto.name}"
      .parametres="${proto.parametres}"
      returnedtype="${proto.returnedtype}">
      </sarl-action-prototype>
      </li>`)}
      </ul>

      </div>
      `;
    }

    constructor() {
      super();
      this.action_prototypes = [
        {
          name: "action capacite1",
          parametres: ["param capacite 1", "param capacite 2"],
          returnedtype: "Boolean"
        },
        {
          name: "action capa2",
          parametres: ["param capacite 3", "param capacite 2"],
          returnedtype: "String"
        },
        {
          name: "action capacite 3",
          parametres: ["param capacite 1", "param capacite 2"],
          returnedtype: "Array"
        }]
      }
    }

    window.customElements.define('sarl-capacite', SarlCapacite);
