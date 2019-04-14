import { LitElement, html, css } from 'lit-element';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-item/paper-item.js';
import './solid-utils';
import  '/node_modules/evejs/dist/eve.custom.js';
import { GridAgent } from '../agents/GridAgent.js'
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/social-icons.js';
import '@polymer/iron-collapse/iron-collapse.js';


class SpoggyGrid extends LitElement {
  static get properties() {
    return {
      url: String,
      data: Array,
      folder: Object,
      file: Object
    }
  }

  render() {
    return html`



    <div>
    <p>
    <paper-input id="url_input"></paper-input>
    <paper-button raised @click="${this._onUrlChange}">Explore</paper-button>
    <paper-button raised @click="${this._onNouveau}">Nouveau</paper-button>
    <paper-button raised @click="${this._onRecherche}">Recherche</paper-button>







    ${this.folder.name?
      html`

      <hr>
      <paper-button raised @click="${(e) =>  this._onSelect(this.folder.url)}">
      ${this.folder.name}
      </paper-button>


      <paper-button class="green" raised @click="${(e) =>  this._onSelect(this.folder.parent)}">
      Parent : ${this.folder.parent}
      </paper-button>
      <hr>


      <div id="trigger" @click="${(e) =>  this.toggle("folder_collapse")}">
      <slot name="collapse-trigger">Dossiers / Folders (${this.folder.folders.length})</slot>
      <!--  <iron-icon icon="[[_toggle(opened, collapseIcon, expandIcon)]]" hidden$="[[noIcons]]"></iron-icon> -->
      <iron-icon id="folder_collapse_icon" icon="${this.isOpen("folder_collapse")}" hidden$="[[noIcons]]"></iron-icon>

      </div>
      <iron-collapse id="folder_collapse" horizontal="[[horizontal]]" no-animation="[[noAnimation]]">
      <slot name="collapse-content">
      ${this.folder.folders.map((fo) => html`
        <paper-item>
        <span @click="${(e) =>  this._onSelect(fo.url)}">
        ${fo.label?
          html`<p>${fo.label}</p>`:
          html`<p>${fo.name}</p>`
        }
        </span>
        <a href="${fo.url}" title="Open ${fo.url}" target="_blank">
        <img width="24px" height="24px" src="./assets/solid.png" />
        </a>
        &nbsp;
        <iron-icon on-tap="_share" title="Share ${fo.url}" icon="social:share"></iron-icon>&nbsp;
        <iron-icon on-tap="_copylink" title="Copy link ${fo.url}" icon="icons:link"></iron-icon>
        </paper-item>

        `)
      }
      </slot>
      </iron-collapse>








      <hr>
      Fichiers (${this.folder.files.length})

      ${this.folder.files.map((fi) => html`
        <paper-item raised @click="${(e) =>  this._onSelect(fi.url)}" >
        <span @click="${(e) =>  this._onSelect(fi.url)}">
        ${fi.label?
          html`<p>${fi.label}</p>`:
          html`<p>${fi.name}</p>`
        }
        </span>
        <a href="${fi.url}" title="Open ${fi.url}" target="_blank">
        <img width="24px" height="24px" src="./assets/solid.png" />
        </a>
        &nbsp;
        <iron-icon on-tap="_share" title="Share ${fi.url}" icon="social:share"></iron-icon>&nbsp;
        <iron-icon on-tap="_copylink" title="Copy link ${fi.url}" icon="icons:link"></iron-icon>

        </paper-item>
        `)
      }



      `:
      html`<p>Saisissez une url & Cliquez sur "Explore"</p>`}

      ${this.file.url?
        html`
        <hr>
        <h4>  ${this.file.url}</h4>
        <small>
        ${this.file.body}
        </small>
        `:
        html`<p><!--Cliquez sur "Explorer"--></p>`}



        </p>
        </div>
        <solid-utils>Outils Chargement</solid-utils>
        `;
      }

      constructor() {
        super();
        this.url = "https://holacratie.solid.community/public/"
        this.data = ["one","two","three","four","five","six","seven","huit","neuf"]
        this.agentGrid = new GridAgent("agentGrid", this);
        console.log(this.agentGrid);
        this.folder = {};
        this.file = {};
      }

      firstUpdated() {
        this.shadowRoot.getElementById("url_input").value = this.url;
        this._onUrlChange();
        //this.name = this.destinataire+"_Input"

        //  this.agentLogin.send('agentApp', {type: 'dispo', name: 'agentLogin' });
        //  console.log("DESTINATAIRE2:",this.destinataire);
      }

      _onUrlChange(){
        this.url = this.shadowRoot.getElementById("url_input").value;
        console.log(this.url)
        this.agentGrid.send('agentSolid', {type: 'explore', url: this.url });
      }
      _onSelect(url){
        console.log("select",url)
        this.shadowRoot.getElementById("url_input").value = url;
        this._onUrlChange();
      }

      _onNouveau(){

      }
      _onRecherche(){

      }
      exploreReponse(reponse, status){
        switch (status) {
          case 'erreur':
          alert(reponse)
          break;
          case 'folder':

          this.folder = reponse;
          console.log(this.folder)
          break;
          case 'file':
          this.file = reponse;
          console.log(this.file)
          break;
          default:
          alert ("Impossible d'exploiter la réponse : ",status, reponse)
          //  console.log('Sorry, we are out of ' + expr + '.');
        }
      }

      toggle(which) {
        console.log("toggl",which)
        var which_icon = which+"_icon";
        this.shadowRoot.getElementById(which).toggle();
console.log(this.shadowRoot.getElementById(which_icon).icon)
if(this.shadowRoot.getElementById(which).opened){
  this.shadowRoot.getElementById(which_icon).icon =  "icons:expand-less"
}else{
  this.shadowRoot.getElementById(which_icon).icon =  "icons:expand-more";
}
      }

      isOpen(which){
        if (this.shadowRoot.getElementById(which)){
          console.log(this.shadowRoot.getElementById(which).opened);


        }else{
          return "icons:expand-more";
        }
      }
    }
    window.customElements.define('spoggy-grid', SpoggyGrid);
