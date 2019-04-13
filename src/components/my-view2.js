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

// These are the elements needed by this element.
import './agent-recherche.js';
import './agent-create.js';
import './agents-list.js';
import './sarl-action.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class MyView2 extends PageViewElement {
  static get properties() {
    return {
      // This is the data from the store.
      _clicks: { type: Number },
      _value: { type: Number }
    };
  }

  static get styles() {
    return [
      SharedStyles
    ];
  }

  render() {
    return html`
    <section>
    <p>
    <sarl-action>Chargement action</sarl-action>
    </p>
    </section>

    <section>
    <p>
    <agent-recherche
    value="${this._value}"
    clicks="${this._clicks}"
    @counter-incremented="${this._increment}"
    @counter-decremented="${this._decrement}">
    </agent-recherche>
    </p>
    </section>
    <section>
    <p>
    <agent-create
    value="${this._value}"
    clicks="${this._clicks}"
    @counter-incremented="${this._increment}"
    @counter-decremented="${this._decrement}">
    </agent-create>
    </p>
    </section>
    <section>
    <p>
    <agents-list
    value="${this._value}"
    clicks="${this._clicks}"
    @counter-incremented="${this._increment}"
    @counter-decremented="${this._decrement}">
    </agents-list>
    </p>
    </section>





    `;
  }

  constructor() {
    super();
    this._clicks = 0;
    this._value = 0;
  }

  _increment() {
    this._clicks++;
    this._value++;
  }

  _decrement() {
    this._clicks++;
    this._value--;
  }
}

window.customElements.define('my-view2', MyView2);
