//https://npm-demos.appspot.com/@polymer/iron-icons@3.0.1/demo/index.html
//https://www.materialpalette.com/icons
//https://icones8.fr/icon/set/turtle/material
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
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-toggle-button/paper-toggle-button.js';
import '@vaadin/vaadin-split-layout/vaadin-split-layout.js';
import  './graphe/solid-graph.js';
import '@granite-elements/ace-widget/ace-widget.js';
//import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';


class SpoggyGrid extends LitElement {
  static get properties() {
    return {
      url: String,
      data: Array,
      folder: Object,
      file: Object,
      sources: Array
    }
  }



  render() {
    // TEMPLATES
    const itemTemplate = (item) => html`
    <paper-item>
    <paper-icon-button
    src="../../images/${item.type}.png"
    title="${item.type}"
    @click="${(e) => this._onSelect(item.url)}">
    </paper-icon-button>
    <div @click="${(e) => this._onSelect(item.url)}">

    ${item.label?
      html`<p>${item.label}</p>`:
      html`<p>${item.name}</p>`
    }
    </div>
    <div class="lightblue" style="margin-left:auto; margin-right:0;">
    <a href="${item.url}" title="Open ${item.url}" target="_blank">
    <paper-icon-button
    src="../../images/solid.png"
    class="blue"
    alt="open"
    title="Open on POD / Ouvrir sur le POD"></paper-icon-button></a>
    <paper-icon-button on-tap="_share" disabled title="Share ${item.url}" icon="social:share"></paper-icon-button>
    <paper-icon-button on-tap="_copylink" disabled title="Copy link ${item.url}" icon="icons:link"></paper-icon-button>
    </div>
    </paper-item>
    `;

    // FIN TEMPLATES
    return html`
    <style>
/*    .container {
  background-color: #ccc;
  padding: 5px;
  margin: 0;
}
.container > div {
  padding: 15px;
  margin: 5px;
  background-color: white;
  min-height: 20px;
}
.test { width: 100px; }
    .flex {
      @apply --layout-horizontal;
    }*/
    paper-icon-button.blue {
      --paper-icon-button-ink-color: var(--paper-orange-500);
      background-color: var(--paper-light-blue-500);
      color: white;
      border-radius: 3px;

    }

    div.lightblue {
      --paper-icon-button-ink-color: var(--paper-orange-500);
      background-color: var(--paper-light-blue-100);
      color: var(--paper-deep-orange-400);
      border-radius: 3px;
      margin: 1px;
    }
    </style>

  <!--  l
    <div class="container flex">
    <div class="test">one</div>
    <div class="test">two</div>
    <div class="test">three</div>
    <div class="layout horizontal center-center">
       <div class="test">horizontal layout center alignment</div>
     </div>
    </div>
    l-->

    <vaadin-split-layout >
    <div style="width: 45%;">
    <paper-toggle-button id="bascule" checked @click="${(e) => this._onBascule(e)}" >smag0 / holacratie</paper-toggle-button>
    <div>
    <p>
    <paper-input id="url_input"></paper-input>
    <div class="lightblue">
    <paper-icon-button  icon="icons:search" class="blue" title="Explore" raised @click="${this._onUrlChange}"></paper-icon-button>
    <paper-icon-button  icon="icons:create"  disabled title="New file / Nouveau fichier" raised @click="${this._onNouveau}"></paper-icon-button>
    <paper-icon-button  icon="icons:create-new-folder"  disabled title="New folder / Nouveau dossier" raised @click="${this._onNouveau}"></paper-icon-button>
    </div>
    ${this.folder.name?
      html`

      <hr>

      <div id="trigger" class="lightblue" @click="${(e) =>  this.toggle("folder_collapse")}">
      <slot name="collapse-trigger"> ${this.folder.folders.length} Dossiers / Folders</slot>
      <!--  <iron-icon icon="[[_toggle(opened, collapseIcon, expandIcon)]]" hidden$="[[noIcons]]"></iron-icon> -->
      <paper-icon-button id="folder_collapse_icon" icon="icons:expand-more" class="blue" ></paper-icon-button>

      </div>
      <iron-collapse id="folder_collapse" horizontal="[[horizontal]]" no-animation="[[noAnimation]]">
      <slot name="collapse-content">
      ${this.parentTemplate}
      ${this.folder.folders.map((fo) => html`
        ${itemTemplate(fo)}
        `)}
        </slot>
        </iron-collapse>


        <hr>


        <div id="trigger2" class="lightblue" @click="${(e) =>  this.toggle("files_collapse")}">
        <slot name="collapse-trigger"> ${this.folder.files.length} Fichiers / Files</slot>
        <!--  <iron-icon icon="[[_toggle(opened, collapseIcon, expandIcon)]]" hidden$="[[noIcons]]"></iron-icon> -->
        <paper-icon-button id="files_collapse_icon" icon="icons:expand-more" class="blue" ></paper-icon-button>

        </div>
        <iron-collapse id="files_collapse" horizontal="[[horizontal]]" no-animation="[[noAnimation]]">
        <slot name="collapse-content2">
        ${this.parentTemplate}
        ${this.folder.files.map((fi) => html`
          ${itemTemplate(fi)}
          `)
        }
        </slot>
        </iron-collapse>

        `:
        html`${this.parentTemplate}`}



        </p>



        </div>



        </div>
        <vaadin-split-layout orientation="vertical">
        <div style="height: 50%;">
        <solid-graph></solid-graph>
        </div>
        <div>


        ${this.file.url?
          html`
          ${this.file.url}
          `:
          html`<p>Selectionnez un fichier dans le navigateur</p>`}

        <ace-widget
        id="acetwo"
        theme="ace/theme/monokai"
        mode="ace/mode/turtle"
        softtabs="true"
        wrap="true">
        </ace-widget>

          </div>
          </vaadin-split-layout>
          </vaadin-split-layout>

          <img id="cpt" src="" border="0" title="compteur de site" alt="compteur de visites">
          <solid-utils>Outils Chargement</solid-utils>
          `;
        }

        constructor() {
          super();
          this.sources = ["https://holacratie.solid.community/public/", "https://smag0.solid.community/public/"]
          this.url = this.sources[0];
          this.data = ["one","two","three","four","five","six","seven","huit","neuf"]
          this.agentGrid = new GridAgent("agentGrid", this);
          //console.log(this.agentGrid);
          this.folder = {};
          this.file = {};
        }



        firstUpdated() {
          this.shadowRoot.getElementById("url_input").value = this.url;

          if (window.location.hostname != "127.0.0.1"){
            console.log(window.location.hostname);
            this._onUrlChange();
            this.shadowRoot.getElementById("cpt").src="https://counter10.allfreecounter.com/private/compteurdevisite.php?c=kap2qgssr21ur788587am4dra6chp35n";
          }else{
            console.log(window.location.hostname);
            this.shadowRoot.getElementById("cpt").style.display = "none";
          }
          console.log("TERMINE 1")
          //  console.log("ACE ",ace)
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
        _onBascule(){
          console.log(this.shadowRoot.getElementById("bascule").checked);
          var url = "";
          if (this.shadowRoot.getElementById("bascule").checked){
            url = this.sources[0]
          }else{
            url = this.sources[1]
          }
          this.shadowRoot.getElementById("url_input").value = url;
          this._onUrlChange();
        }
        exploreReponse(reponse, status){
          console.log("|||||||||||||||||||||||\nREPONSE :",reponse)
          switch (status) {
            case 'folder':
            this.folder = reponse;
            this.agentGrid.send('agentGraph', {type: 'currentChanged', current: reponse });
            console.log(this.folder)
            break;
            case 'file':
            this.file = reponse;
            console.log(this.file)
            this.shadowRoot.getElementById('acetwo').editorValue = this.file.body;
            break;
            default:
            alert ("Impossible d'exploiter la réponse : ",status, reponse)
          }
        }

        toggle(which) {
          var which_icon = which+"_icon";
          this.shadowRoot.getElementById(which).toggle();
          if(this.shadowRoot.getElementById(which).opened){
            this.shadowRoot.getElementById(which_icon).icon =  "icons:expand-less"
          }else{
            this.shadowRoot.getElementById(which_icon).icon =  "icons:expand-more";
          }
        }

        // TEmplates

        get parentTemplate() {
          return html`
          <paper-item raised @click="${(e) =>  this._onSelect(this.folder.parent)}">&nbsp;
          <div class="lightblue">
          <paper-icon-button icon="icons:arrow-upward" class="blue"></paper-icon-button>
          ${this.folder.parent}
          </div>
          </paper-item>`;
        }






      }
      window.customElements.define('spoggy-grid', SpoggyGrid);
