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

import  '/node_modules/evejs/dist/eve.custom.js';
import { ListeAgent } from '../agents/ListeAgent.js'

// This is a reusable element. It is not connected to the store. You can
// imagine that it could just as well be a third-party element that you
// got from someone else.
class AgentsList extends LitElement {
  static get properties() {
    return {
      /* The total number of clicks you've done. */
      clicks: { type: Number },
      /* The current value of the counter. */
      value: { type: Number },
      agents: {type: Array}
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
    Agents: <span>${this.agents.length}</span> agents.

    <ul>
    ${this.agents.map((agent) => html`<li>${agent}</li>`)}
    </ul>
    <button @click="${this._onDecrement}" title="Minus 1">${minusIcon}</button>
    </p>
    </div>
    `;
  }

  constructor() {
    super();
    this.clicks = 0;
    this.value = 0;
    this.agents = ["Spoggy", "David"]
  }

  firstUpdated() {
    //this.name = this.destinataire+"_Input"
    this.agentListe = new ListeAgent("agentListe", this);
    console.log(this.agentListe);
    //  this.agentLogin.send('agentApp', {type: 'dispo', name: 'agentLogin' });
    //  console.log("DESTINATAIRE2:",this.destinataire);
  }


  add(nom){
    console.log(nom);
    var agents = this.agents;
    this.agents = [];
    agents.push(nom)
    this.agents = agents;
    console.log(this.agents)
  /*  this.agents.push(nom)
    this.render(this.agents);*/
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
}

window.customElements.define('agents-list', AgentsList);
