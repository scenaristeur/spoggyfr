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
import  '/node_modules/evejs/dist/eve.custom.js';
import { CreateAgent } from '../agents/CreateAgent.js'

// This is a reusable element. It is not connected to the store. You can
// imagine that it could just as well be a third-party element that you
// got from someone else.
class AgentCreate extends LitElement {
  static get properties() {
    return {
      agent: { type: Object}
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
    <small>Pour ajouter une information dans Spoggy, créez un agent. Pour explorer Spoggy, recherchez un agent
    <paper-input id="nomInput" label="Nom de l'agent"></paper-input>
    <small>A quel niveau d'abstraction placez-vous cet agent ? Est-ce une Personne, une organisation, un pays, une molécule...?</small>
    <paper-input id="levelInput" label="Niveau d'abstraction"></paper-input><br>
    <paper-button raised @click="${this._onCreate}">Créer l'agent</paper-button>
    <paper-button raised @click="${this._onRecherche}">Rechercher un agent</paper-button>

    </p>
    </div>
    `;
  }

  constructor() {
    super();
    this.agent = {};
  }

  firstUpdated() {
    //this.name = this.destinataire+"_Input"
    this.agentCreate = new CreateAgent("agentCreate", this);
    console.log(this.agentCreate);
    //  this.agentLogin.send('agentApp', {type: 'dispo', name: 'agentLogin' });
    //  console.log("DESTINATAIRE2:",this.destinataire);
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
    var agent = {}
    agent.nom = this.shadowRoot.getElementById("nomInput").value;
    agent.level = this.shadowRoot.getElementById("levelInput").value;
    console.log("Create",agent);
    this.agentCreate.send('agentListe', {type: 'add', agent: agent });
  //  this.agentCreate.send('agentListe', {type: 'message', message: agent });
  }

  _onRecherche(){
    this.agent.nom = this.shadowRoot.getElementById("nomInput").value;
    this.agent.level = this.shadowRoot.getElementById("levelInput").value;
    console.log("Recherche",this.agent);
    this.agentCreate.send('agentListe', {type: 'recherche', agent: this.agent });
  }
}

window.customElements.define('agent-create', AgentCreate);
