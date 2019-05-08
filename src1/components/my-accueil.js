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


class MyAccueil extends PageViewElement {
  static get styles() {
    return [
      SharedStyles
    ];
  }

  render() {
    return html`
    <section>
    Accueil
    <br>
    look at / jetez un oeil à <a href="/solid">Solid</a> <br>
    old version with Polymer 2 (wait 15s and refresh if nothing appear) -->
    <a href="http://spoggy.herokuapp.com/" target="_blank">http://spoggy.herokuapp.com/</a> <br>
    ancienne version avec Polymer 2 (attendre 15s et rafraichir pour laisser le temps au serveur de se reveiller) -->
    <a href="http://spoggy.herokuapp.com/" target="_blank">http://spoggy.herokuapp.com/</a>


    </section>
    `;
  }


  constructor() {
    super();

  }


}

window.customElements.define('my-accueil', MyAccueil);
