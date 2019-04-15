/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html } from 'lit-element';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import  '/node_modules/evejs/dist/eve.custom.js';
import { GraphAgent } from './agents/GraphAgent.js'
import  'solid-auth-client/dist-lib/solid-auth-client.bundle.js';
import  'rdflib/dist/rdflib.min.js';
import  'solid-file-client/dist/browser/solid-file-client.bundle.js';
//import  '/node_modules/solid-file-client/solid-file-client.js';
import { SolidTools } from "./solid-tools.js"
import './spoggy-vis.js'
//import './my-graph.js'

// This is a reusable element. It is not connected to the store. You can
// imagine that it could just as well be a third-party element that you
// got from someone else.
class SolidGraph extends LitElement {
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
      store: Object,
      fetcher: Object,
      context: Object,
      webId: Object,
      //  public: String,
      current: Object,
      //  thing: Object,
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

    console.log(solid)
    console.log($rdf)
    app.thing={}
    //  this.fileclient = SolidFileClient;
    this.st = new SolidTools();
    this.st.fileclient = SolidFileClient;
    console.log("FILE CLIENT ", this.fileclient )
    // NAMESPACES : https://github.com/solid/solid-namespace/blob/master/index.js
    this.VCARD = $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
    this.SPACE = $rdf.Namespace('http://www.w3.org/ns/pim/space#');
    this.SOLID = $rdf.Namespace('http://www.w3.org/ns/solid/terms#');
    this.LDP = $rdf.Namespace('http://www.w3.org/ns/ldp#');
    this.RDFS = $rdf .Namespace('http://www.w3.org/2000/01/rdf-schema#');
    this.OWL = $rdf .Namespace('http://www.w3.org/2002/07/owl#');


  }

  currentChanged(current){
    console.log(current)
    this.current = current;
    this.agentGraph.send('agentVis', {type: 'clear' });
    if (this.current.status == "folder"){
      this.folder2vis(this.current)
    }else {
      console.log("INTEGRATION DU FICHIER")
    //  this.file2vis(this.current)
    }
  }






  /*async nodeChanged(node){
    var thing = {};
    thing.url = node.id;
    this.current =  await this.st.get(thing);
    console.log("RESULT : ",this.current)
    this.agentGraph.send('agentCurrent', {type: 'currentChanged', current: this.current });
    this.agentGraph.send('agentFileeditor', {type: 'currentChanged', current: this.current });
    this.agentGraph.send('agentFoldermenu', {type: 'currentChanged', current: this.current });
    this.currentChanged(this.current)
  }*/

  folder2vis(sfolder){
    var app = this;
    console.log('sfolder')
    console.log(sfolder)
    var name = sfolder.name;
    var url = sfolder.url;
    var parent = sfolder.parent;
    //  var folders = sfolder.folders||"Folders";
    //  var files = sfolder.files|| "Files";

    var nodes = [];
    var edges = [];
    nodes.push({id: url, label: name, type: "folder", shape: "image", image: "assets/folder.png"});
  /*  nodes.push({id:'folders', label:"Folder"});
    edges.push({from:url, to: 'folders', arrows: 'to', label:"type"});*/
    //console.log("PAREnT", parent)

    if (parent != undefined){
      //  console.log("undef")
      nodes.push({id: parent, label: parent, type: "folder", shape: "image", image: "assets/folder.png"});
      edges.push({from: url, to: parent, arrows:'to', label: "parent"});
    }
    //  {id: "urlNode"+url, label: url},
    /*,
    {id: "folderCluster", label: folders},
    {id: "fileCluster", label: files}*/


    // create an array with edges

    //{from: url, to: "urlNode"+url, arrows:'to', label: "url"},
    /*,
    {from: url, to: "folderCluster", arrows:'to', label: "folders"},
    {from: url, to: "fileCluster", arrows:'to', label: "files"},*/


    if (sfolder.folders && sfolder.folders.length >0){

      sfolder.folders.forEach(function(fo){
        if(fo.name != ".."){
          app.folder2vis(fo)
          var node = {id:fo.url, label:fo.name, type: 'folder', shape: "image", image:"assets/folder.png"}
          //  console.log(node)
          nodes.push(node);
          edges.push({from:url, to: fo.url, arrows: 'to', label:"folder"});
        /*  edges.push({from:fo.url, to: 'folders', arrows: 'to', label:"type"});*/
        }
      })
    }
    if (sfolder.files && sfolder.files.length > 0){
      //nodes.push({id:'files', label:"File"});
      sfolder.files.forEach(function(fi){
          console.log("FILE",fi)
        //  app.file2vis(fi)
        var node = {id:fi.url, label:fi.label, type: fi.type, shape: "image", image: "assets/document.png"};
        //  console.log(node)
        nodes.push(node);
        edges.push({from:url, to: fi.url, arrows: 'to', label:"file"});
      /*  edges.push({from:fi.url, to: 'files', arrows: 'to', label:"type"});*/
      })
    }

    var  data = {
      nodes: nodes,
      edges: edges
    };
    console.log(data)


    this.agentGraph.send('agentVis', {type: 'addToGraph', data: data });
  }

  file2vis(sfile){
    console.log('sfile',sfile)
    this.agentGraph.send('agentVis', {type: 'fileChanged', file: sfile });
  }

}

window.customElements.define('solid-graph', SolidGraph);
