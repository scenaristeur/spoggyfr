/*2.1. Action
65 An action is a specification of a transformation of a part of the designed
66 system or its environment. This transformation guarantees resulting properties
67 if the system before the transformation satisfies a set of constraints. An action
68 a ∈ A is defined by its prototype and its body, as illustrated by Equation 1. The
69 prototype is composed by the name na of the action, a sequence Pa of formal
70 parameters, and the type ra of the returned values. The body Ba is a sequence
71 of expressions — a subset of the language constructs for describing evaluable
72 expressions — that represents transformations. These two parts of the action’s
73 definition are represented respectively by the Action Prototype and Action in
74 Figure 1.
75
a = hna, Pa, ra, Bai (1)
1Official website: http://www.sarl.io
3
76
77 For pedagogical reasons, the SARL action concept could be linked to method
78 concept into the object-oriented paradigm: both concepts represent the same
79 language construct.
*/

import './sarl-action-prototype.js';
import './sarl-action-sequence.js';


import { LitElement, html, css } from 'lit-element';

class SarlAction extends LitElement {
  static get properties() {
    return {
      name: String,
      parametres: Array,
      prototype: Object,
      returnedtype: String,
      sequence: Array,
    }
  }

  render() {
    return html`
    <div>
    <h1>Action</h1>
    <small>
    Une action est la spécification d'une transformation d'une part du système ou de son environnement.
    Cette transformation garantit les propriétés du résultat si le système, avant la transformation
    satisfait un ensemble de contraintes.
    <br>
    Une action est définie par son prototype et son corps. Le prototype est composé du nom de l'action,
    d'une séquence de paramètres et du type de valeur retourné.<br>
    Le corps est une séquence d'expressions qui représentent la transformation.
    </small>
    <sarl-action-prototype
    name="${this.name}"
    .parametres="${this.parametres}"
    returnedtype="${this.returnedtype}">
    </sarl-action-prototype>

    <sarl-action-sequence
    .sequence="${this.sequence}">
    </sarl-action-sequence>

    </div>
    `;
  }

  constructor() {
    super();
    this.name = "nom de l'action";
    this.parametres= ["parametre1", "parametre2", "parametre3"];
    this.returnedtype= "String";
    this.sequence = ["action1","action2","action3"]
  }
}

window.customElements.define('sarl-action', SarlAction);
