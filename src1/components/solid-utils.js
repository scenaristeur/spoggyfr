import { LitElement, html, css } from 'lit-element';
import  '/node_modules/evejs/dist/eve.custom.js';
import { SolidAgent } from '../agents/SolidAgent.js'
import  'solid-auth-client/dist-lib/solid-auth-client.bundle.js';
import  'rdflib/dist/rdflib.min.js';
import  'solid-file-client/dist/browser/solid-file-client.bundle.js';



class SolidUtils extends LitElement {
  static get properties() {
    return {
      fileClient: Object,
      data: Array
    }
  }

  render() {
    return html`
    `;
  }

  constructor() {
    super();
    this.agentSolid = new SolidAgent("agentSolid", this);
    console.log(this.agentSolid);
    //    console.log(solid)
    //    console.log($rdf)
    this.fileClient = SolidFileClient;
    console.log("FILE CLIENT ", this.fileClient )
  }

  firstUpdated() {

    // NAMESPACES : https://github.com/solid/solid-namespace/blob/master/index.js
    this.VCARD = $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
    this.SPACE = $rdf.Namespace('http://www.w3.org/ns/pim/space#');
    this.SOLID = $rdf.Namespace('http://www.w3.org/ns/solid/terms#');
    this.LDP = $rdf.Namespace('http://www.w3.org/ns/ldp#');
    this.RDFS = $rdf .Namespace('http://www.w3.org/2000/01/rdf-schema#');
    this.OWL = $rdf .Namespace('http://www.w3.org/2002/07/owl#');
    //this.name = this.destinataire+"_Input"
    //  this.agentCreate = new CreateAgent("agentCreate", this);
    //  console.log(this.agentCreate);
    //  this.agentLogin.send('agentApp', {type: 'dispo', name: 'agentLogin' });
    //  console.log("DESTINATAIRE2:",this.destinataire);
  }
  explore(url,sender){
    if(!this.isFile(url)){
      this.fileClient.readFolder(url).then(
        folder => {
          this.agentSolid.send(sender, {type: 'exploreReponse', reponse: folder, status: "folder" });
        },
        err =>
        {
          console.log(err);
          this.agentSolid.send(sender, {type: 'exploreReponse', reponse: err, status: "erreur" });
        }
      );
    }else{
      this.fileClient.readFile(url).then(
        body => {
          var file = {};
          file.body = body;
          file.url = url;
          this.agentSolid.send(sender, {type: 'exploreReponse', reponse: file, status: "file" });
        },
        err => {
          console.log(err);
          this.agentSolid.send(sender, {type: 'exploreReponse', reponse: err, status: "erreur" });
        } );

        /*this.fileClient.fetchAndParse(url, 'text/turtle').then(graph => {
          console.log("GRAPH",graph)
          //let something = graph.any(someSubject, somePredicate);
        }, err => console.log(err) );*/

      }
    }

    isFile(pathname) {
      return pathname.split('/').pop().indexOf('.') > -1;
    }


    login(){
      this.fileClient.popupLogin().then( webId => {
        console.log( `Logged in as ${webId}.`)
      }, err => console.log(err) );
    }

    logout(){
      this.fileClient.logout().then( console.log( `Bye now!` ))
    }
    checkSession(){
      this.fileClient.checkSession().then( session => {
        console.log("Logged in as "+session.webId)
      }, err => console.log(err) );
    }

    createFile(newFile){
      this.fileClient.createFile(newFile).then( fileCreated => {
        console.log(`Created file ${fileCreated}.`);
      }, err => console.log(err) );
    }

    readFile(file){
      this.fileClient.readFile(file).then(  body => {
        console.log(`File content is : ${body}.`);
      }, err => console.log(err) );
    }

    updateFile(url,content,contentType){
      this.fileClient.updateFile( url, newContent, contentType ).then( success => {
        console.log( `Updated ${url}.`)
      }, err => console.log(err) );
    }

    deleteFile(url){
      this.fileClient.deleteFile(url).then(success => {
        console.log(`Deleted ${url}.`);
      }, err => console.log(err) );
    }
    copy(oldFile,newFile){
      this.fileClient.copy(oldFile,newFile).then(success => {
        console.log(`Copied ${oldFile} to ${newFile}.`);
      }, err => console.log(err) );
    }

    fetchAndParse(url)
    {
      this.fileClient.fetchAndParse(url, 'text/turtle').then(graph => {
        let something = graph.any(someSubject, somePredicate);
      }, err => console.log(err) );
    }



    //  Folder Methods

    createFolder(url){
      this.fileClient.createFolder(url).then(success => {
        console.log(`Created folder ${url}.`);
      }, err => console.log(err) );
    }

    deleteFolder(url){
      this.fileClient.deleteFolder(url).then(success => {
        console.log(`Deleted ${url}.`);
      }, err => console.log(err) );
    }

    readFolder(url){
      this.fileClient.readFolder(url).then(folder => {
        console.log(`Read ${folder.name}, it has ${folder.files.length} files.`);
        return folder;
      }, err => console.log(err) );
    }
    /*
    {
    type : "folder",
    name : // folder name (without path),
    url : // full URL of the resource,
    modified : // dcterms:modified date
    mtime : // stat:mtime
    size : // stat:size
    parent : // parentFolder or undef if none,
    content : // raw content of the folder's turtle representation,
    files : // an array of files in the folder
    folders : // an array of sub-folders in the folder,
  }*/

  copyFolder(oldFolder,newFolder){
    //Does a deep (recursive) copy from one Solid folder to another, creating sub-folders as needed or filling them if they already exist.
    this.fileClient.copy(oldFolder,newFolder).then(success => {
      console.log(`Copied ${oldFolder} to ${newFolder}.`);
    }, err => console.log(err) );
  }

  fetch(url,request){
    this.fileClient.fetch(url, request).then( results => {
      // do something with results
      console.log(results)
    }, err => console.log(err) );
  }



}

window.customElements.define('solid-utils', SolidUtils);
