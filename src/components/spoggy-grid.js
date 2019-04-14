import { LitElement, html, css } from 'lit-element';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-item/paper-item.js';
import './solid-utils';
import  '/node_modules/evejs/dist/eve.custom.js';
import { GridAgent } from '../agents/GridAgent.js'


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

      <paper-item @click="${(e) =>  this._onSelect(this.folder.url)}">
      <h4>${this.folder.name}</h4>
      </paper-item>


      <paper-item @click="${(e) =>  this._onSelect(this.folder.parent)}">
      <small>  Parent : ${this.folder.parent}</small>
      </paper-item>

      Dossiers (${this.folder.folders.length})

      ${this.folder.folders.map((fo) => html`
        <paper-item @click="${(e) =>  this._onSelect(fo.url)}" >

        ${fo.label?
          html`<p>${fo.label}</p>`:
          html`<p>${fo.name}</p>`
        }

        </paper-item>
        `)
      }

      Fichiers (${this.folder.files.length})

      ${this.folder.files.map((fi) => html`
        <paper-item raised @click="${(e) =>  this._onSelect(fi.url)}" >
        ${fi.label?
          html`<p>${fi.label}</p>`:
          html`<p>${fi.name}</p>`
        }
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
    }

    window.customElements.define('spoggy-grid', SpoggyGrid);
