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

export const GraphStyles = html`
<style>
  :host {
    display: block;
    box-sizing: border-box;
  }

  .mood { color: green; }
  #mynetwork {
    top: 0;
    left: 0;
    width: 100%;
    height: 50vh; /*height: 90vh;*/
    bottom: 0px  !important;;
    border: 1px solid lightgray;
    background: linear-gradient(to bottom, rgba(55, 55, 255, 0.2), rgba(200, 200, 10, 0.2));
  }
  div.vis-network div.vis-manipulation {
    box-sizing: content-box;
    border-width: 0;
    border-bottom: 1px;
    border-style:solid;
    border-color: #d6d9d8;
    background: #ffffff; /* Old browsers */
    background: -moz-linear-gradient(top,  #ffffff 0%, #fcfcfc 48%, #fafafa 50%, #fcfcfc 100%); /* FF3.6+ */
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#ffffff), color-stop(48%,#fcfcfc), color-stop(50%,#fafafa), color-stop(100%,#fcfcfc)); /* Chrome,Safari4+ */
    background: -webkit-linear-gradient(top,  #ffffff 0%,#fcfcfc 48%,#fafafa 50%,#fcfcfc 100%); /* Chrome10+,Safari5.1+ */
    background: -o-linear-gradient(top,  #ffffff 0%,#fcfcfc 48%,#fafafa 50%,#fcfcfc 100%); /* Opera 11.10+ */
    background: -ms-linear-gradient(top,  #ffffff 0%,#fcfcfc 48%,#fafafa 50%,#fcfcfc 100%); /* IE10+ */
    background: linear-gradient(to bottom,  #ffffff 0%,#fcfcfc 48%,#fafafa 50%,#fcfcfc 100%); /* W3C */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#fcfcfc',GradientType=0 ); /* IE6-9 */
    padding-top:4px;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 28px;
  }
  div.vis-network div.vis-edit-mode {
    position:absolute;
    left: 0;
    top: 5px;
    height: 30px;
  }
  /* FIXME: shouldn't the vis-close button be a child of the vis-manipulation div? */
  div.vis-network div.vis-close {
    position:absolute;
    right: 0;
    top: 0;
    width: 30px;
    height: 30px;
    background-position: 20px 3px;
    background-repeat: no-repeat;
    background-image: url("/node_modules/vis/dist/img/network/cross.png");
    cursor: pointer;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  div.vis-network div.vis-close:hover {
    opacity: 0.6;
  }
  div.vis-network div.vis-manipulation div.vis-button,
  div.vis-network div.vis-edit-mode div.vis-button {
    float:left;
    font-family: verdana;
    font-size: 12px;
    -moz-border-radius: 15px;
    border-radius: 15px;
    display:inline-block;
    background-position: 0px 0px;
    background-repeat:no-repeat;
    height:24px;
    /*  margin-left: 10px; */
    /*vertical-align:middle;*/
    cursor: pointer;
    padding: 0px 8px 0px 8px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  div.vis-network div.vis-manipulation div.vis-button:hover {
    box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.20);
  }
  div.vis-network div.vis-manipulation div.vis-button:active {
    box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.50);
  }
  div.vis-network div.vis-manipulation div.vis-button.vis-back {
    background-image: url("/node_modules/vis/dist/img/network/backIcon.png");
  }
  div.vis-network div.vis-manipulation div.vis-button.vis-none:hover {
    box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.0);
    cursor: default;
  }
  div.vis-network div.vis-manipulation div.vis-button.vis-none:active {
    box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.0);
  }
  div.vis-network div.vis-manipulation div.vis-button.vis-none {
    padding: 0;
  }
  div.vis-network div.vis-manipulation div.notification {
    margin: 2px;
    font-weight: bold;
  }
  div.vis-network div.vis-manipulation div.vis-button {
    background-color:#0D578B;
    color:white;
  }
  div.vis-network div.vis-manipulation div.vis-button.vis-add {
    background-image: url("/node_modules/vis/dist/img/network/addNodeIcon.png");
  }
  div.vis-network div.vis-manipulation div.vis-button.vis-edit,
  div.vis-network div.vis-edit-mode div.vis-button.vis-edit {
    background-image: url("/node_modules/vis/dist/img/network/editIcon.png");
  }
  div.vis-network div.vis-edit-mode div.vis-button.vis-edit.vis-edit-mode {
    background-color: #fcfcfc;
    border: 1px solid #cccccc;
  }
  div.vis-network div.vis-manipulation div.vis-button.vis-connect {
    background-image: url("/node_modules/vis/dist/img/network/connectIcon.png");
  }
  div.vis-network div.vis-manipulation div.vis-button.vis-delete {
    background-image: url("/node_modules/vis/dist/img/network/deleteIcon.png");
  }
  /* top right bottom left */
  div.vis-network div.vis-manipulation div.vis-label,
  div.vis-network div.vis-edit-mode div.vis-label {
    margin: 0 0 0 23px;
    line-height: 25px;
  }
  div.vis-network div.vis-manipulation div.vis-separator-line {
    float:left;
    display:inline-block;
    width:1px;
    height:21px;
    background-color: #bdbdbd;
    margin: 0px 1px 0 1px;
    /*  margin: 0px 7px 0 15px;*/ /*top right bottom left*/
  }
  div.vis-network div.vis-navigation div.vis-button {
    width:34px;
    height:34px;
    -moz-border-radius: 17px;
    border-radius: 17px;
    position:absolute;
    display:inline-block;
    background-position: 2px 2px;
    background-repeat:no-repeat;
    cursor: pointer;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  div.vis-network div.vis-navigation div.vis-button:hover {
    box-shadow: 0 0 3px 3px rgba(56, 207, 21, 0.30);
  }
  div.vis-network div.vis-navigation div.vis-button:active {
    box-shadow: 0 0 1px 3px rgba(56, 207, 21, 0.95);
  }
  div.vis-network div.vis-navigation div.vis-button.vis-up {
    background-image: url("/node_modules/vis/dist/img/network/upArrow.png");
    bottom:50px;
    left:55px;
  }
  div.vis-network div.vis-navigation div.vis-button.vis-down {
    background-image: url("/node_modules/vis/dist/img/network/downArrow.png");
    bottom:10px;
    left:55px;
  }
  div.vis-network div.vis-navigation div.vis-button.vis-left {
    background-image: url("/node_modules/vis/dist/img/network/leftArrow.png");
    bottom:10px;
    left:15px;
  }
  div.vis-network div.vis-navigation div.vis-button.vis-right {
    background-image: url("/node_modules/vis/dist/img/network/rightArrow.png");
    bottom:10px;
    left:95px;
  }
  div.vis-network div.vis-navigation div.vis-button.vis-zoomIn {
    background-image: url("/node_modules/vis/dist/img/network/plus.png");
    bottom:10px;
    right:15px;
  }
  div.vis-network div.vis-navigation div.vis-button.vis-zoomOut {
    background-image: url("/node_modules/vis/dist/img/network/minus.png");
    bottom:10px;
    right:55px;
  }
  div.vis-network div.vis-navigation div.vis-button.vis-zoomExtends {
    background-image: url("/node_modules/vis/dist/img/network/zoomExtends.png");
    bottom:50px;
    right:15px;
  }
</style>
`;
