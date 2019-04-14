/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html, css } from 'lit-element';

// These are the elements needed by this element.
import { plusIcon, minusIcon } from './my-icons.js';

// These are the shared styles needed by this element.
import { ButtonSharedStyles } from './button-shared-styles.js';

// This is a reusable element. It is not connected to the store. You can
// imagine that it could just as well be a third-party element that you
// got from someone else.
class SpoggyGrid extends LitElement {
  static get properties() {
    return {
      /* The total number of clicks you've done. */
      clicks: { type: Number },
      /* The current value of the counter. */
      value: { type: Number },
      data: Array
    }
  }

  static get styles() {
    return [
      ButtonSharedStyles,
      css`
      span {
        width: 20px;
        display: inline-block;
        text-align: center;
        font-weight: bold;
      }
      `
    ];
  }

  render() {
    return html`
    <div>
    <p>
    <ul>
    ${this.data.map((d) => html`<li>
      ${d}
      </li>`)}
      </ul>
      </p>
      </div>
      `;
    }

    constructor() {
      super();
      this.clicks = 0;
      this.value = 0;
      this.data = ["one","two","three","four","five","six","seven","huit","neuf"]
    }

    _onIncrement() {
      this.value++;
      this.clicks++;
      this.dispatchEvent(new CustomEvent('counter-incremented'));
    }

    _onDecrement() {
      this.value--;
      this.clicks++;
      this.dispatchEvent(new CustomEvent('counter-decremented'));
    }
  }

  window.customElements.define('spoggy-grid', SpoggyGrid);
