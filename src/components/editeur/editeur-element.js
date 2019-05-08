import { LitElement, html, css } from 'lit-element';
import  '/node_modules/evejs/dist/eve.custom.js';
import { EditeurAgent } from './agents/EditeurAgent.js'
// These are the elements needed by this element.
import { plusIcon, minusIcon } from '../my-icons.js';

// These are the shared styles needed by this element.
import { ButtonSharedStyles } from '../button-shared-styles.js';
import '@granite-elements/ace-widget/ace-widget.js';


class EditeurElement extends LitElement {
  static get properties() {
    return {
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
    <div style="width:90vw">
    <ace-widget
    id="acetwo"
    theme="ace/theme/monokai"
    mode="ace/mode/turtle"
    softtabs="true"
    wrap="true">
    </ace-widget>
    </div>
    `;
  }

  constructor() {
    super();

  }

  firstUpdated(){
    this.agentEditeur = new EditeurAgent("agentEditeur", this);
    console.log(this.agentEditeur);
  this.shadowRoot.getElementById('acetwo').editorValue = "BLOP a text";

  }
  exportJson(data){
    console.log(data)
    this.shadowRoot.getElementById('acetwo').editorValue = data;
  }
  exportTtl(data){
    console.log(data)
    this.shadowRoot.getElementById('acetwo').editorValue = data;
  }
}

window.customElements.define('editeur-element', EditeurElement);
