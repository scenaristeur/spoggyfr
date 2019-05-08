import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
import  './graphe/solo-graph.js';


class MySolo extends PageViewElement {
  static get styles() {
    return [
      SharedStyles
    ];
  }

  render() {
    return html`
    <section>
    Solo
    <solo-graph></solo-graph>
    </section>
    `;
  }


  constructor() {
    super();

  }


}

window.customElements.define('my-solo', MySolo);
