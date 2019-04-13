import './sarl-espace.js';

import { LitElement, html, css } from 'lit-element';

class SarlContexte extends LitElement {
  static get properties() {
    return {
      name: String,
      spaces: Array,
    }
  }

  render() {
    return html`
    <div>
    <h1>Contexte</h1>
    <small>
    Un contexte définit the périmètre/limites d'un sous-système, et regroupe une collection d'espaces.
    Lors de leur création, les agents sont incorporés dans un contexte appelé le "le contexte par défaut".
    La notion de contexte prend tout son sens lorsque les agents sont composés ou holoniques. Dans chaque contexte
    il existe au moins un espace particulier appelé "l'espace par défaut"
    auquel appartiennet tous les agents du contexte afin d'assurer un espace commun pour tous les agents du contexte.
    Chaque agent peut créer des espace privés ou public pour accomplir ses buts propres.
    </small>
    <h3>
    Nom Contexte : ${this.name}
    </h3>
    <ul>
    ${this.spaces.map((space) => html`<li>
      <h4>
      Nom Espace: ${space.name}
      </h4>
      <sarl-espace
      name="${space.name}">
      </sarl-espace>
      </li>`)}
      </ul>

      </div>
      `;
    }

    constructor() {
      super();
      this.name = "Nom du contexte";
      this.spaces = [
        {
          name: "espace 1"
        },
        {
          name: "espace 2"
        },
        {
          name: "espace 3"
        }]
      }
    }

    window.customElements.define('sarl-contexte', SarlContexte);
