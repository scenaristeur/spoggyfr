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
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';
import { installOfflineWatcher } from 'pwa-helpers/network.js';
import { installRouter } from 'pwa-helpers/router.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';

// These are the elements needed by this element.
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import { menuIcon } from './my-icons.js';
import './snack-bar.js';
import  '/node_modules/evejs/dist/eve.custom.js';
import { AppAgent } from './agents/AppAgent.js';


class MyApp extends LitElement {
  static get properties() {
    return {
      appTitle: { type: String },
      _page: { type: String },
      _drawerOpened: { type: Boolean },
      _snackbarOpened: { type: Boolean },
      _offline: { type: Boolean }
    };
  }

  static get styles() {
    return [
      css`
      :host {
        display: block;

        --app-drawer-width: 256px;

        --app-primary-color: #E91E63;
        --app-secondary-color: #293237;
        --app-dark-text-color: var(--app-secondary-color);
        --app-light-text-color: white;
        --app-section-even-color: #f7f7f7;
        --app-section-odd-color: white;

        --app-header-background-color: white;
        --app-header-text-color: var(--app-dark-text-color);
        --app-header-selected-color: var(--app-primary-color);

        --app-drawer-background-color: var(--app-secondary-color);
        --app-drawer-text-color: var(--app-light-text-color);
        --app-drawer-selected-color: #78909C;
      }

      app-header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        text-align: center;
        background-color: var(--app-header-background-color);
        color: var(--app-header-text-color);
        border-bottom: 1px solid #eee;
      }

      .toolbar-top {
        background-color: var(--app-header-background-color);
      }

      [main-title] {
        font-family: 'Pacifico';
        text-transform: lowercase;
        font-size: 30px;
        /* In the narrow layout, the toolbar is offset by the width of the
        drawer button, and the text looks not centered. Add a padding to
        match that button */
        padding-right: 44px;
      }

      .toolbar-list {
        display: none;
      }

      .toolbar-list > a {
        display: inline-block;
        color: var(--app-header-text-color);
        text-decoration: none;
        line-height: 30px;
        padding: 4px 24px;
      }

      .toolbar-list > a[selected] {
        color: var(--app-header-selected-color);
        border-bottom: 4px solid var(--app-header-selected-color);
      }

      .menu-btn {
        background: none;
        border: none;
        fill: var(--app-header-text-color);
        cursor: pointer;
        height: 44px;
        width: 44px;
      }

      .drawer-list {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 24px;
        background: var(--app-drawer-background-color);
        position: relative;
      }

      .drawer-list > a {
        display: block;
        text-decoration: none;
        color: var(--app-drawer-text-color);
        line-height: 40px;
        padding: 0 24px;
      }

      .drawer-list > a[selected] {
        color: var(--app-drawer-selected-color);
      }

      /* Workaround for IE11 displaying <main> as inline */
      main {
        display: block;
      }

      .main-content {
        padding-top: 64px;
        min-height: 100vh;
      }

      .page {
        display: none;
      }

      .page[active] {
        display: block;
      }

      footer {
        padding: 24px;
        background: var(--app-drawer-background-color);
        color: var(--app-drawer-text-color);
        text-align: center;
      }

      /* Wide layout: when the viewport width is bigger than 460px, layout
      changes to a wide layout */
      @media (min-width: 460px) {
        .toolbar-list {
          display: block;
        }

        .menu-btn {
          display: none;
        }

        .main-content {
          padding-top: 107px;
        }

        /* The drawer button isn't shown in the wide layout, so we don't
        need to offset the title */
        [main-title] {
          padding-right: 0px;
        }
      }
      `
    ];
  }

  render() {
    // Anything that's related to rendering should be done in here.
    return html`
    <!-- Header -->
    <app-header condenses reveals effects="waterfall">
    <app-toolbar class="toolbar-top">
    <button class="menu-btn" title="Menu" @click="${this._menuButtonClicked}">${menuIcon}</button>
    <div main-title>${this.appTitle}</div>
    </app-toolbar>

    <!-- This gets hidden on a small screen-->
    <nav class="toolbar-list">
    <a ?selected="${this._page === 'accueil'}" href="/accueil">Accueil</a>
    <a ?selected="${this._page === 'solo'}" href="/solo">Solo</a>
    <a ?selected="${this._page === 'collaboratif'}" href="/collaboratif">Collaboratif</a>
    <a ?selected="${this._page === 'global'}" href="/global">Global</a>
    <a ?selected="${this._page === 'solid'}" href="/solid">Solid</a>
    <a ?selected="${this._page === 'navigateur'}" href="/navigateur">Navigateur</a>
    <a ?selected="${this._page === 'editeur'}" href="/editeur">Editeur</a>
    <a ?selected="${this._page === 'holacratie'}" href="/holacratie">Holacratie</a>
    <a ?selected="${this._page === 'compte'}" href="/compte">Mon compte</a>
    </nav>
    </app-header>

    <!-- Drawer content -->
    <app-drawer
    .opened="${this._drawerOpened}"
    @opened-changed="${this._drawerOpenedChanged}">
    <nav class="drawer-list">
    <a ?selected="${this._page === 'accueil'}" href="/accueil">Accueil</a>
    <a ?selected="${this._page === 'solo'}" href="/solo">Solo</a>
    <a ?selected="${this._page === 'collaboratif'}" href="/collaboratif">Collaboratif</a>
    <a ?selected="${this._page === 'global'}" href="/global">Global</a>
    <a ?selected="${this._page === 'solid'}" href="/solid">Solid</a>
    <a ?selected="${this._page === 'navigateur'}" href="/navigateur">Navigateur</a>
    <a ?selected="${this._page === 'editeur'}" href="/editeur">Editeur</a>
    <a ?selected="${this._page === 'holacratie'}" href="/holacratie">Holacratie</a>
    <a ?selected="${this._page === 'compte'}" href="/compte">Mon compte</a>
    </nav>
    </app-drawer>

    <!-- Main content -->
    <main role="main" class="main-content">
    <my-accueil class="page" ?active="${this._page === 'accueil'}"></my-accueil>
    <my-solo class="page" ?active="${this._page === 'solo'}">Le premier chargement du graphe peut être long...</my-solo>
    <my-collaboratif class="page" ?active="${this._page === 'collaboratif'}">Le premier chargement du graphe peut être long...</my-collaboratif>
    <my-global class="page" ?active="${this._page === 'global'}">Le premier chargement du graphe peut être long...</my-global>
    <my-solid class="page" ?active="${this._page === 'solid'}">Le premier chargement du graphe peut être long...</my-solid>
    <my-navigateur class="page" ?active="${this._page === 'navigateur'}">Le premier chargement du graphe peut être long...</my-navigateur>
    <my-editeur class="page" ?active="${this._page === 'editeur'}">Le premier chargement du graphe peut être long...</my-editeur>
    <my-holacratie class="page" ?active="${this._page === 'holacratie'}">Le premier chargement du graphe peut être long...</my-holacratie>

    <my-compte class="page" ?active="${this._page === 'compte'}"></my-compte>
    <my-evaluation class="page" ?active="${this._page === 'evaluation'}"></my-evaluation>
    <my-view404 class="page" ?active="${this._page === 'view404'}"></my-view404>
    </main>

    <footer>
    <p>Made with &hearts; by the <a href="https://github.com/scenaristeur/spoggyfr" target="_blank">Smag0 team</a>.</p>
    </footer>

    <snack-bar ?active="${this._snackbarOpened}">
    You are now ${this._offline ? 'offline' : 'online'}.
    </snack-bar>
    `;
  }

  constructor() {
    super();
    this._drawerOpened = false;
    // To force all event listeners for gestures to be passive.
    // See https://www.polymer-project.org/3.0/docs/devguide/settings#setting-passive-touch-gestures
    setPassiveTouchGestures(true);
  }

  firstUpdated() {
    installRouter((location) => this._locationChanged(location));
    installOfflineWatcher((offline) => this._offlineChanged(offline));
    installMediaQueryWatcher(`(min-width: 460px)`,
    (matches) => this._layoutChanged(matches));
    this.agentApp = new AppAgent("agentApp", this);
    console.log(this.agentApp);
  }

  updated(changedProps) {
    if (changedProps.has('_page')) {
      const pageTitle = this.appTitle + ' - ' + this._page;
      updateMetadata({
        title: pageTitle,
        description: pageTitle
        // This object also takes an image property, that points to an img src.
      });
    }
  }

  _layoutChanged(isWideLayout) {
    // The drawer doesn't make sense in a wide layout, so if it's opened, close it.
    this._updateDrawerState(false);
  }

  _offlineChanged(offline) {
    const previousOffline = this._offline;
    this._offline = offline;

    // Don't show the snackbar on the first load of the page.
    if (previousOffline === undefined) {
      return;
    }

    clearTimeout(this.__snackbarTimer);
    this._snackbarOpened = true;
    this.__snackbarTimer = setTimeout(() => { this._snackbarOpened = false }, 3000);
  }

  _locationChanged(location) {
    const path = window.decodeURIComponent(location.pathname);
    const page = path === '/' ? 'accueil' : path.slice(1);
    this._loadPage(page);
    // Any other info you might want to extract from the path (like page type),
    // you can do here.

    // Close the drawer - in case the *path* change came from a link in the drawer.
    this._updateDrawerState(false);
  }

  _updateDrawerState(opened) {
    if (opened !== this._drawerOpened) {
      this._drawerOpened = opened;
    }
  }

  _loadPage(page) {
    console.log("LOAD", page)
    switch(page) {
      case 'accueil':
      import('../components/my-accueil.js').then((module) => {
        // Put code in here that you want to run every time when
        // navigating to accueil after my-accueil.js is loaded.

      });

      break;
      case 'solo':
      import('../components/my-solo.js');
      break;
      case 'collaboratif':
      import('../components/my-collaboratif.js');
      break;
      case 'global':
      import('../components/my-global.js');
      break;
      case 'solid':
      import('../components/my-solid.js');
      break;
      case 'holacratie':
      import('../components/my-holacratie.js');
      break;
      case 'navigateur':
      import('../components/my-navigateur.js');
      break;
      case 'editeur':
      console.log("CHARGE EDITEUR")
      import('../components/my-editeur.js');
      break;

      case 'compte':
      import('../components/my-compte.js');
      break;
      //
      case 'evaluation':
      import('../components/my-evaluation.js');
      break;
      default:
      page = 'view404';
      import('../components/my-view404.js');
    }

    this._page = page;
  }

  _menuButtonClicked() {
    this._updateDrawerState(true);
  }

  _drawerOpenedChanged(e) {
    this._updateDrawerState(e.target.opened);
  }

  open(page,data){
    const newLocation = window.location;
    newLocation.pathname = page;
    console.log("newLocation",newLocation)
  window.history.pushState({}, '', newLocation);
  this._locationChanged(newLocation);
  console.log(this._page)
    this.agentApp.send('agentEditeur', {type:'exportTtl', data : data});
  }
}

window.customElements.define('my-app', MyApp);
