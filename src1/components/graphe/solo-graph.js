import { LitElement, html } from 'lit-element';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import  '/node_modules/evejs/dist/eve.custom.js';
import { GraphAgent } from './agents/GraphAgent.js'

import './spoggy-vis.js'
//import './my-graph.js'

// This is a reusable element. It is not connected to the store. You can
// imagine that it could just as well be a third-party element that you
// got from someone else.
class SoloGraph extends LitElement {
  render() {
    return html`
    <!--PB si on supprime la ligne suivante mais pourquoi ? SUR LIGNE SUIVANTE  : attributeValue is null -->
    <paper-input hidden id="currentInput" label="Current Folder / Dossier Courant" value="${this.current.url}"></paper-input>
    <spoggy-vis id="spoggy-vis" current=${this.current} data=${this.data}></spoggy-vis>
    <!--  <my-graph></my-graph> -->
    `;
  }

  static get properties() {
    return {
      data: {type: Object}
    }
  }

  constructor() {
    super();

    this.current = {value: {url: ""}};
  }

  connectedCallback(){
    super.connectedCallback();
    var app = this;
    this.current = {value:{url:"",content:""}}
    //console.log( 'id : ', this.id);
    this.agentGraph = new GraphAgent("agentGraph", this);
    console.log(this.agentGraph);
    //this.agentVis.send('agentApp', {type: 'dispo', name: this.id });
  }

  currentChanged(current){
    console.log(current)
    this.current = current;
    this.agentGraph.send('agentVis', {type: 'clear' });

  }

}

window.customElements.define('solo-graph', SoloGraph);
