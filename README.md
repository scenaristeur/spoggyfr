# Spoggy

Actions uitilisateurs
- Mode Solo
  - [ X ] ajouter, un noeud, un lien
  - [ ] creer un graphe
  - [ ] exporter un graphe en
    - [ ] en JSON
    - [ ] en turtle
  - [ ] ouvrir un graphe via une url
    - [ ] ouvrir un graphe fichier ttl (http://spoggyfr/source=https://holacratie.solid.community/public/holacratie.ttl), rdf (https://github.com/jmvanel/semantic_forms)
    - [ ] ouvrir un graphe folder (POD Solid) http://spoggyfr/source=https://holacratie.solid.community/public/
    - [ ] ouvrir un graphe (folder ou fichier) via le menu import ou la commande /i
- Mode collaboratif
  - [ ] se connecter
  - [ ] creer une room
  - [ ] entrer une room existante
- Mode Global (http://spoggy.herokuapp.com/)
  - [ ] explorer des datasets / endpoints Sparql DBPEDIA, PERSEE...
  - [ ] proposer un endpoint
- Mode Solid
  - [ ] demander autorisation d'enregistrer le POD de l'utilisateur dans la liste des PODS, avec possibilité de gérer les droits, de supprimer de la liste des pods publics
  - [ ] explorer un POD, friends,...
  - [ ] update d'un POD
- Mode Holacratie


- [ ] implement Solid Websocket API https://github.com/solid/solid-spec/blob/master/api-websockets.md (test dans view4)
```
constructor() {
  super();
//  var socket = new WebSocket('wss://example.org/');
var socket = new WebSocket('wss://spoggy.solid.community/');
  console.log ("socket",socket)
  socket.onopen = function() {
    this.send('sub https://spoggy.solid.community/public/test/fichier.ttl');
    this.send('sub https://spoggy.solid.community/public/test/fichier2.ttl');

  };
  socket.onmessage = function(msg) {
    if (msg.data && msg.data.slice(0, 3) === 'pub') {
      // resource updated, refetch resource
      console.log("msg",msg);
      console.log("data",msg.data)
    }
  };
}```















# based on sarl.io
SARL is a general-purpose agent-oriented programming language [10]. It
 aims at providing the fundamental abstractions for dealing with standard agent
 features: concurrency, distribution, interaction, decentralization, reactivity, autonomy and dynamic reconfiguration.

# evejs multiagent
# Holacratie
# Solid




[![Built with pwa–starter–kit](https://img.shields.io/badge/built_with-pwa–starter–kit_-blue.svg)](https://github.com/Polymer/pwa-starter-kit "Built with pwa–starter–kit")
[![Build status](https://api.travis-ci.org/Polymer/pwa-starter-kit.svg?branch=template-no-redux)](https://travis-ci.org/Polymer/pwa-starter-kit)

# PWA Starter Kit -- `template-no-redux`

This sample app is a starting point for building PWAs. Out of the box, the template
gives you the following features:
- all the PWA goodness (manifest, service worker)
- a responsive layout
- application theming
- offline UI
- simple routing solution
- fast time-to-interactive and first-paint through the PRPL pattern
- easy deployment to prpl-server or static hosting
- unit and integrating testing starting points
- documentation about other advanced patterns.

This template has the same UI elements as the `master` one (`app-layout` elements, theming, etc), but does not use Redux for state management. Instead, it does a properties-down-events-up unidirectional data flow approach, where the data source of truth is mutable, and individual elements (specifically, each view) own parts of the entire application state.

### 📖 Head over to the [documentation site](https://pwa-starter-kit.polymer-project.org/) for more details or check out [how to get started](https://pwa-starter-kit.polymer-project.org/setup)!

![pwa-starter-kit screenshot](https://user-images.githubusercontent.com/1369170/39715580-a1be5126-51e2-11e8-8440-96b07be03a3c.png)

## TODOs

- [x] Setup Safari testing on Travis.
- [x] Deploy all templates as demos.
- [ ] Update to latest [Material Web Components](https://github.com/material-components/material-components-web-components).


# CDNJS
https://www.jsdelivr.com/package/npm/vis?tab=collection
https://cdnjs.com/libraries/vis
https://www.jsdelivr.com/package/npm/@polymer/polymer
