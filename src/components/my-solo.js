import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
import  './graphe/vis-network.js';
import  './graphe/vis-input.js';
import  './graphe/vis-popup.js';


class MySolo extends PageViewElement {
  static get styles() {
    return [
      SharedStyles
    ];
  }

  render() {
    return html`
    <vis-input></vis-input>
    <vis-network></vis-network>
    <vis-popup></vis-popup>
    `;
  }


  constructor() {
    super();

  }


}

window.customElements.define('my-solo', MySolo);
