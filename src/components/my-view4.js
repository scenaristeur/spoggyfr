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


class MyView4 extends PageViewElement {
  static get styles() {
    return [
      SharedStyles
    ];
  }

  render() {
    return html`
    <section>
    Blop
    </section>
    `;
  }


  constructor() {
    super();
  //  var socket = new WebSocket('wss://example.org/');
  var socket = new WebSocket('wss://spoggy.solid.community/');
    console.log ("socket",socket)
    socket.onopen = function() {
      this.send('sub https://spoggy.solid.community/public/test/fichier.ttl');
      this.send('sub https://spoggy.solid.community/public/test');
      this.send('sub https://spoggy.solid.community/public/test/index.ttl');
    };
    socket.onmessage = function(msg) {
      if (msg.data && msg.data.slice(0, 3) === 'pub') {
        // resource updated, refetch resource
        console.log("msg",msg);
        console.log("data",msg.data)
      }
    };
  }


}

window.customElements.define('my-view4', MyView4);
