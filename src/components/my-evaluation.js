/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';


class MyEvaluation extends PageViewElement {
  static get styles() {
    return [
      SharedStyles
    ];
  }

  render() {
    return html`
    <section>
    Niveau 1 : Ouvrir le graphe <a href="/solo">Solo</a>
    </section>
    <section>
    Niveau 2 : Créer un noeud
    </section>
    <section>
    Niveau 3 : Créer un deuxième noeud
    </section>
    <section>
    Niveau 4 : Créer un lien entre ces noeuds
    </section>
    <section>
    Niveau 5 : Exporter un graphe en json
    </section>
    <section>
    Niveau 6 : Importer un graphe en json
    </section>
    <section>
    Niveau 7 : Exporter un graphe en turtle
    </section>
    <section>
    Niveau 8 : Importer un graphe en turtle
    </section>
    <section>
    Niveau 9 : Ajouter un triplet via l'input
    </section>
    <section>
    Niveau 11 : Importer un graphe depuis une url
    </section>
    <section>
    Niveau 10 : Ouvrir un graphe en mode collaboratif
    </section>
    `;
  }


  constructor() {
    super();

  }


}

window.customElements.define('my-evaluation', MyEvaluation);
