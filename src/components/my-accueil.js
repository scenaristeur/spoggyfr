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
<!--<section>
FR/EN
</section>-->
    <section>
    <h1>Spoggy</h1>
    <p><b>Spoggy est une application permettant la représentation de l'information,
     ou des connaissances sous forme de graphe.
     <br> Un graphe est composé de NOEUDS (nodes) et de LIENS (edges).
    </b></p>
    <br>
    <p>
    Les noeuds représentent les concepts d'un domaine et les liens permettent de
     qualifier la relation entre deux concepts. Les liens sont orientés et se
     terminent par une flèche.
     L'ensemble de deux noeuds et du lien entre ces deux noeuds peut aussi être appelé un TRIPLET.</p>
    </section>

<section>
<h1>Spoggy Solo</h1>
<p>Décrivez votre propre monde avec Spoggy.<br>
<a href="/solo"><button>Spoggy Solo</button></a>
</p>
</section>

    <section>
    Spoggy est en totale refection <br>
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
