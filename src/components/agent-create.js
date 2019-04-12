/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html, css } from 'lit-element';

// These are the elements needed by this element.
import { plusIcon, minusIcon } from './my-icons.js';

// These are the shared styles needed by this element.
import { ButtonSharedStyles } from './button-shared-styles.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';

// This is a reusable element. It is not connected to the store. You can
// imagine that it could just as well be a third-party element that you
// got from someone else.
class AgentCreate extends LitElement {
  static get properties() {
    return {
      /* The total number of clicks you've done. */
      clicks: { type: Number },
      /* The current value of the counter. */
      value: { type: Number },
      nom: { type: String}
    }
  }

  static get styles() {
    return [
      ButtonSharedStyles,
      css`
      span {
        width: 20px;
        display: inline-block;
        text-align: center;
        font-weight: bold;
      }
      `
    ];
  }

  render() {
    return html`
    <div>
    <p>
    Clicked: <span>${this.clicks}</span> times.
    Value is <span>${this.value}</span>.
    Nom is <span>${this.nom}</span>.
    <paper-input id="nomInput" label="Nom de l'agent"></paper-input>
    <paper-button raised @click="${this._onCreate}">Créer l'agent</paper-button>

    </p>
    </div>
    `;
  }

  constructor() {
    super();
    this.clicks = 0;
    this.value = 0;
  }

  _onIncrement() {
    this.value++;
    this.clicks++;
    this.dispatchEvent(new CustomEvent('counter-incremented'));
  }

  _onDecrement() {
    this.value--;
    this.clicks++;
    this.dispatchEvent(new CustomEvent('counter-decremented'));
  }

  _onCreate(){
    this.nom = this.shadowRoot.getElementById("nomInput").value;
    console.log("Create",this.nom);
  }
}

window.customElements.define('agent-create', AgentCreate);
