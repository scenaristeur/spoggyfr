import './sarl-capacite.js';

import { LitElement, html, css } from 'lit-element';

class SarlCompetence extends LitElement {
  static get properties() {
    return {
      name: String,
      capacites: Array,
    }
  }

  render() {
    return html`
    <div>
    <h1>Competence</h1>
    <small>
    Une compétence est une implémentation possible de capacités remplissant toutes les contraintes de ces capacités.<br>
    Un agent peut dynamiquement evoluer en apprenant ou en acquérant de nouvelles capacités.
    Il peut également changer la compétence associée à une capacité donnée.
    En acquérant de nouvelles capacités, un agent peut avoir accès à de nouvelles tâches nécessitant ces capacités.
    Ceci fournit aux agent un mechanisme d'auto-adaptation qui leur permet de changer dynamiquement leur architecture
    en accord avec leurs besoins et leurs buts courants.
    </small>
    <h3>
    Nom Compétence : ${this.name}
    </h3>
    <ul>
    ${this.capacites.map((cap) => html`<li>
      <h4>
      Nom Capacité: ${cap.name}
      </h4>
      <sarl-capacite
      name="${cap.name}">
      </sarl-capacite>
      </li>`)}
      </ul>

      </div>
      `;
    }

    constructor() {
      super();
      this.name = "Nom de la compétence";
      this.capacites = [
        {
          name: "capacite 1"
        },
        {
          name: "capacite 2"
        },
        {
          name: "capacite 3"
        }]
      }
    }

    window.customElements.define('sarl-competence', SarlCompetence);
