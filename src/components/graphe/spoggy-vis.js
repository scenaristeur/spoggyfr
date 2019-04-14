/**
* Import LitElement base class, html helper function,
* and TypeScript decorators
**/
import {  LitElement, html,} from 'lit-element';
//import '/node_modules/vis/dist/vis-network.min.js';
import '/node_modules/dist/vis/vis.js';
import  '/node_modules/evejs/dist/eve.custom.js';
import { VisAgent } from './agents/VisAgent.js'
import { GraphStyles } from './graph-styles.js';
import './vis-input.js';
//import './vis-popup.js';
import './import-export.js';


/**
* Use the customElement decorator to define your class as
* a custom element. Registers <my-element> as an HTML tag.
*/

class SpoggyVis extends LitElement {

  /**
  * Create an observed property. Triggers update on change.
  */

  /**
  * Implement `render` to define a template for your element.
  */
  render(){
    /**
    * Use JavaScript expressions to include property values in
    * the element template.
    */
    return html`
    ${GraphStyles}
    <link rel="stylesheet" href="/node_modules/vis/dist/vis.css">
    <style>
    #mynetwork {
      top: 0;
      left: 0;
      width: 99%;
      height: 85vh;
      bottom: 0px  !important;;
      border: 1px solid lightgray;
      background: linear-gradient(to bottom, rgba(55, 55, 255, 0.2), rgba(200, 200, 10, 0.2));
    }
    </style>

    <vis-input id="visInput" destinataire="agentVis"></vis-input>
    <div id="mynetwork"></div>
    <!--<vis-popup id="visPopup" parent="agentVis"></vis-popup>-->

    `;
  }

  // properties getter
  static get properties() {
    return {
      //  id: {type: String, value:""},
    };
  }

  constructor() {
    // Always call super() first
    super();


  }

  firstUpdated(){
    var app = this;

    //console.log( 'id : ', this.id);
    this.agentVis = new VisAgent("agentVis", this);
    console.log(this.agentVis);
    //this.agentVis.send('agentApp', {type: 'dispo', name: this.id });
    this.fc = SolidFileClient;

    var container = this.shadowRoot.getElementById('mynetwork');
    //  console.log(container)

    // create an array with nodes
    var nodes = new vis.DataSet([
      {id: "node1", label: 'Node 1'},
      {id: "node2", label: 'Node 2'},
      {id: "node3", label: 'Node 3'},
      {id: "node4", label: 'Node 4'},
      {id: "node5", label: 'Node 5'}
    ]);

    // create an array with edges
    var edges = new vis.DataSet([
      {from: "node1", to: "node3", arrows:'to', label: "type"},
      {from: "node1", to: "node2", arrows:'to', label: "subClassOf"},
      {from: "node2", to: "node4", arrows:'to', label: "partOf"},
      {from: "node2", to: "node5", arrows:'to', label: "first"},
      {from: "node3", to: "node3", arrows:'to', label: "mange"}
    ]);


    var data = {
      nodes: nodes,
      edges: edges
    };

    var seed = 2;
    var options = {
      layout: {randomSeed:seed}, // just to make sure the layout is the same when the locale is changed
      //  locale: this._root.querySelector('#locale').value,
      edges:{
        arrows: {
          to:     {enabled: true, scaleFactor:1, type:'arrow'},
          middle: {enabled: false, scaleFactor:1, type:'arrow'},
          from:   {enabled: false, scaleFactor:1, type:'arrow'}
        }},
        interaction:{
          navigationButtons: true,
          //  keyboard: true  //incompatible avec rappel de commande en cours d'implémentation
          multiselect: true,
        },
        manipulation: {
          addNode: function (data, callback) {
            // filling in the popup DOM elements
            //  app.shadowRoot.getElementById('node-operation').innerHTML = "Add Node";
            //  data.label =""
            //console.log(app.shadowRoot.getElementById('popup'));
            //  console.log(this.shadowRoot.getElementById('popup'));
            console.log("NETWORK ADD NODE ",data,callback)
            //app.editNode(data, app.clearNodePopUp, callback);
            app.agentVis.send('visPopup', {type: "addNode", data: data, callback: callback});

          },
          editNode: function (data, callback) {
            // filling in the popup DOM elements
            //app.shadowRoot.getElementById('node-operation').innerHTML = "Edit Node";
            console.log("NETWORK EDIT NODE ",data,callback)
            //  app.editNode(data, app.cancelNodeEdit, callback);
            app.agentVis.send('visPopup', {type: "editNode", data: data, callback: callback});
          },
          addEdge: function (data, callback) {
            console.log("NETWORK ADD EDGE ", data,callback)
            if (data.from == data.to) {
              var r = confirm("Souhaitez-vous connecter ce noeud sur lui-même?");
              if (r != true) {
                callback(null);
                return;
              }
            }
            //  app.shadowRoot.getElementById('edge-operation').innerHTML = "Add Edge";
            //app.editEdgeWithoutDrag(data, callback);
            app.agentVis.send('visPopup', {type: "addEdge", data: data, callback: callback});
          },
          editEdge: {
            //console.log("EDIT EDGE ", data,callback)
            editWithoutDrag: function(data, callback) {
              console.log("NETWORK EDIT WITHOUT DRAG ", data,callback)
              //  app.shadowRoot.getElementById('edge-operation').innerHTML = "Edit Edge";
              //  app.editEdgeWithoutDrag(data,callback);
              app.agentVis.send('visPopup', {type: "editEdgeWithoutDrag", data: data, callback: callback});
            }
          }
        }
      };

      app.network = new vis.Network(container, data, options);

      app.network.on("selectNode", async function (params) {
        console.log('selectNode Event: ', params);
        var existNode = app.network.body.data.nodes.get({
          filter: function(node){
            return (node.id == params.nodes[0] );
          }
        });
        console.log(existNode);
      })



      app.network.on("doubleClick", async function (params) {
        console.log('selectNode Event: ', params);
        var id = params.nodes[0];
        var existNode;
        try{
          existNode = app.network.body.data.nodes.get({
            filter: function(node){
              return (node.id == id );
            }
          });
          console.log(existNode);
          if (existNode.length != 0){
            console.log("existe",existNode[0])
            var current = {}
            current.url = existNode[0].id;
            current.type = existNode[0].type;
            app.agentVis.send('agentFoldermenu', {type: "currentChanged", current: current});
            app.agentVis.send('agentCurrent', {type: "currentChanged", current: current});
          //  app.agentVis.send('agentGraph', {type: "currentChanged", current: current});
            app.agentVis.send('agentFileeditor', {type: "currentChanged", current: current});
            app.agentVis.send('agentIde', {type: 'currentChanged', current: current });
            //  app.agentVis.send('agentFoldermenu', {type: "nodeChanged", node: existNode[0]});
            //  network.body.data.nodes.add(data);
            //  var thing = this.thing;

          }else{

            console.log("n'existe pas")
            //  delete data.x;
            //  delete data.y
            //  network.body.data.nodes.update(data);

          }
        }
        catch (err){
          console.log(err);
        }
        //  app.agentVis.send('agentCurrent', {type: "urlChanged", url: params.nodes[0]});
      });
      console.log(app.network)
    }

    savenode(data){
      this.popup = null;
      console.log("SAVENODE :",data)
    }
    /////////
    clear(){
      this.network.body.data.nodes.clear();
      this.network.body.data.edges.clear();
    }
    addToGraph(data){
      console.log(data)

      this.network.body.data.nodes.update(data.nodes)
      this.network.body.data.edges.update(data.edges)
    }

    fileChanged(current){

      console.log(current);

      if(current.type == "application/json"){
        this.parseJson(current)
      }else{
        this.parseTurtle(current)
      }
    }



    parseJson(current){
      console.log("JSON",current)
      //  console.log(file.value.content)

      this.fc.readFile(current.url).then(  body => {
        console.log(body)
        var data = JSON.parse(body);
        console.log(data)
        //  console.log(typeof data)
        this.network.body.data.nodes.update(data.nodes)
        this.network.body.data.edges.update(data.edges)
      }, err => console.log(err) );


      /*  console.log(data.nodes)
      console.log(data.edges)
      data.nodes.forEach(function(n){
      console.log(n)
    })

    data.edges.forEach(function(e){
    console.log(e)
  })*/
}



parseTurtle(file){
  console.log("TURTLE",file)
  var app = this;
  //  console.log(file.value.content)
  //  ttl2Xml(file.value.content, this.network)
  /* TEST AVEC STORE+SPARQL, mais on a dejà les infos dans file.value.content */
  const store = $rdf.graph();
  console.log(store)
  const fetcher = new $rdf.Fetcher(store);
  console.log(fetcher)
  fetcher.load(file.url).then( response => {
    console.log(response)
    console.log(store)
    console.log(store.statements)
    var edges=[];
    console.log("STORE STATEMENTS",store.statements)
    app.statements2vis(store.statements)

    /*  if (store.statements.length > 0){
    store.statements.forEach(function (s){
    var nodeSujetTemp = {
    id: s.subject.value,
    label: s.subject.value,
    type: "node"
  };
  var nodeObjetTemp = {
  id:  s.object.value,
  label: s.object.value,
  type: "node"
};
addNodeIfNotExist(app.network, nodeSujetTemp)
addNodeIfNotExist(app.network, nodeObjetTemp)
edges.push({from:s.subject.value, to: s.object.value, arrows: 'to', label:s.predicate.value});
console.log(edges)
app.network.body.data.edges.update(edges)
})}*/
})
/*let name = store.any(person, VCARD(‘fn’));
if (name) {
label.textContent =  name.value; // name is a Literal object
}*/
}


// implementation of import-export.js utilities
newGraph(){
  newGraph(this.network)
}

updateGraph(data){
  console.log("#############################################################UPDATE GRAPH",data);
  var app =this;
  /*  if (message.params.remplaceNetwork){
  this.network.body.data.nodes.clear();
  this.network.body.data.edges.clear();
}*/
//this.network.body.data.nodes.update(message.data.nodes)
//this.network.body.data.edges.update(message.data.edges)
//console.log(this.network)
this.addResultsToGraph(this.network, data)
this.network.fit();
this.network.redraw();
//console.log(this.network)
}

addResultsToGraph(network, results){
  console.debug("addResultsToGraph")
  var app = this;
  var nodes = results.nodes;
  var edges = results.edges;
  //  console.log("Nodes",nodes);
  //  console.log("Edges",edges);


  //console.log("NETWORK",app.network)
  //  app.network.options.edges.smooth.type = "continuous";
  //  app.network.options.edges.smooth.forceDirection = "none";
  /*var options = {
  physics:{
  stabilization: false
},
edges: {
smooth: {
type: "continuous",
forceDirection: "none"
}
}
}
app.network.setOptions(options);
console.log("NETWORK2",app.network)*/
nodes.forEach(function(n){
  console.log(n)
  app.addNodeIfNotExist(app.network, n);
});
app.network.body.data.edges.update(edges)
console.log("updated")
console.log(app.network)
}

addNodeIfNotExist(network, data){
  var existNode = false;
  //  console.log("addNodeIfNotExist",data);
  var nodeId;
  try{
    existNode = network.body.data.nodes.get({
      filter: function(n){
        return (n.id == data.id || (n.label == data.label)); //  || n.title == data.label
      }
    });
    //console.log(existNode);
    if (existNode.length == 0){
      //  console.log("n'existe pas")
      nodeId =   network.body.data.nodes.add(data)[0];
    }else{
      //  console.log("existe")
      delete data.x;
      delete data.y
      nodeId =  network.body.data.nodes.update(data)[0];
    }
  }
  catch (err){
    console.log(err);
  }
}

statements2vis(statements){
  console.log("statements2vis")
  var app = this;
  var data = {nodes:[], edges:[]};
  //  var i = 0;
  statements.forEach(function (statement){
    console.log(statement)
    //  i++;
    //  app.agentImport.send('agentApp', {type: 'message', data: statements.length-i});
    //  console.log("STATEMENT2VIS", statement)
    var edges = [];
    var s = statement.subject;
    var p = statement.predicate;
    var o = statement.object;
    var w = statement.why;

    switch(p.value) {
      case "http://www.w3.org/2000/01/rdf-schema#label":
      case "http://xmlns.com/foaf/0.1/label":
      console.log("LABEL")
      console.log(s.value)
      console.log(o.value)
      var nodeAndLabel = {
        id: s.value,
        title: o.value,
        label: o.value,
        why: w.value,
        y:2*Math.random(),
        type: "node"
      };
      console.log(nodeAndLabel)
      //app.addNodeIfNotExist(app.network, nodeAndLabel)
      data.nodes.push(nodeAndLabel)
      break;
      default:
      console.log("NON LABEL ",p.value);
      var edges = [];
      var nodeSujetTemp;
      console.log("objet",o)
      if (s.termType != "BlankNode"){
        var ls = app.localname(s);
        console.log(ls)
        nodeSujetTemp = {
          id: s.value,
          title: s.value,
          label: ls,
          why: w.value,
          y:2*Math.random(),
          type: "node"
        };
        console.log(nodeSujetTemp)
        //app.addNodeIfNotExist(app.network, nodeSujetTemp)
        data.nodes.push(nodeSujetTemp)
      }/*else{
        nodeSujetTemp = {
        id: s.value,
        type: "node"
      };
    }*/


    console.log("objet",o)
    if (o.termType != "BlankNode"){
      var lo = app.localname(o);
      console.log(lo)
      var nodeObjetTemp = {
        id:  o.value,
        title: o.value,
        label: lo,
        why: w.value,
        type: "node"
      };
      console.log(nodeObjetTemp)
      //app.addNodeIfNotExist(app.network, nodeObjetTemp)
      data.edges.push(nodeObjetTemp)
    }

    /*  let pArray = p.split("#");
    //  console.log(conceptCut);
    let labelP = pArray[pArray.length-1];
    if (labelP == p){
    pArray = p.split("/");
    //console.log(conceptCut);
    labelP = pArray[pArray.length-1];
  }*/

  data.edges.push({from:s.value, to: o.value, arrows: 'to', label: app.localname(p), uri: p.value});
  //  app.addEdgeIfNotExist(app.network,{from:s.subject.value, to: s.object.value, arrows: 'to', label:s.predicate.value});

  //app.network.body.data.edges.update(edges)
}
});
console.log("DATA dans statements2vis",data)
//return data;
//console.log("\n\nDATA\n\n",data)
app.updateGraph(data)
}

localname(node){
  //  console.log("LOCALNAME OF ",node)
  if (node.value != undefined){
    var value = node.value;
    //  console.log(value)
    if (value.endsWith('/') || value.endsWith('#')){
      value = value.substring(0,value.length-1);
    }
    var labelU = value;

    if (node.termType == "NamedNode"){
      //  console.log("namenode")
      var uLabel = value.split("#");
      var labelU = uLabel[uLabel.length-1];
      if (labelU == uLabel){
        uLabel = value.split("/");
        labelU = uLabel[uLabel.length-1];
      }
    }else{
      console.log("literal or blanknode ???")
    }
    //  console.log(labelU)
    return labelU;
  }else{
    console.log("TODO node.value = undefined, il faut maintenant traiter le tableau",node.elements)
  }

}


exportTtl(){
  var output = exportTtl(this.network)
  this.agentVis.send('visPopup', {type:'exportTtl', ttlData : output});
}

exportJson(){
  exportJson(this.network)
}

importJson(){
  this.agentVis.send('visPopup', {type: 'toggle', popup:'importPopUp'})
}

decortiqueFile(fichier, remplaceNetwork){
  decortiqueFile(fichier, remplaceNetwork, this.network)
}

catchTriplet(tripletString){

  // console.log(message.length);
  //message=message.trim();
  //var tripletString = message.substring(2).trim().split(" ");
  // les noeuds existent-ils ?
  var sujetNode = this.network.body.data.nodes.get({
    filter: function(node){
      //    console.log(node);
      return (node.label == tripletString[0] );
    }
  });
  var objetNode = this.network.body.data.nodes.get({
    filter: function(node){
      //    console.log(node);
      return (node.label == tripletString[2]);
    }
  });
  console.log(sujetNode);
  console.log(objetNode);
  // sinon, on les créé
  if (sujetNode.length == 0){
    this.network.body.data.nodes.add({label: tripletString[0] });
  }
  if (objetNode.length == 0){
    this.network.body.data.nodes.add({ label: tripletString[2] });
  }
  // maintenant ils doivent exister, pas très po=ropre comme méthode , à revoir
  sujetNode = this.network.body.data.nodes.get({
    filter: function(node){
      console.log(node);
      return (node.label == tripletString[0] );
    }
  });
  objetNode = this.network.body.data.nodes.get({
    filter: function(node){
      console.log(node);
      return (node.label == tripletString[2]);
    }
  });
  /* var actionSujet = {};
  actionSujet.type = "newNode";
  actionSujet.data = sujetNode[0];
  //  actionsToSendTemp.push(actionSujet);
  this.addAction(actionSujet);
  var actionObjet = {};
  actionObjet.type = "newNode";
  actionObjet.data = objetNode[0];
  //  actionsToSendTemp.push(actionObjet);
  this.addAction(actionObjet);*/
  // maintenant, on peut ajouter l'edge
  this.network.body.data.edges.add({
    label: tripletString[1],
    from : sujetNode[0].id,
    to : objetNode[0].id
  });
  //on récupère ce edge pour l'envoyer au serveur
  var edge = this.network.body.data.edges.get({
    filter: function(edge) {
      return (edge.from == sujetNode[0].id && edge.to == objetNode[0].id && edge.label == tripletString[1]);
    }
  });
  console.log("OK")
  /*var actionEdge = {};
  actionEdge.type = "newEdge";
  actionEdge.data = edge;
  this.addAction(actionEdge);*/
  //  actionsToSendTemp.push(actionEdge);
  //console.log(actionsToSendTemp);
  //  return actionsToSendTemp;
}


/*  updated(changedProperties){
super.updated(changedProperties)
changedProperties.forEach((oldValue, propName) => {
console.log(`${propName} changed. oldValue: ${oldValue}`);
console.log("responseData UPDATED: ",this.responseData)
});
}

attributeChangedCallback(name, oldval, newval) {
console.log('attribute change: ', name, oldval, newval);
super.attributeChangedCallback(name, oldval, newval);
}*/




}

// Register the new element with the browser.
customElements.define('spoggy-vis', SpoggyVis);
