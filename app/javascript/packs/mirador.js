/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

import Mirador from 'mirador/dist/es/src/index.js';
import miradorImageToolsPlugin from 'mirador-image-tools/es/plugins/miradorImageToolsPlugin.js';

const manifestUrl = document.querySelector('#m3').dataset.iiifManifest;
const htmlAttributes = document.querySelector('html').attributes;

const config = {
  id: 'm3',
  language: htmlAttributes.lang.nodeValue,
  theme: {
    direction: htmlAttributes.dir && htmlAttributes.dir.nodeValue || 'ltr',
    palette: {
      primary: {
        main: '#17377b'
      },
      shades: {
        dark: '#dadada'
      }
    }
  },
  window: {
    allowClose: false,
    allowFullscreen: true,
    allowMaximize: false,
    authNewWindowCenter: 'screen',
    hideWindowTitle: true,
  },
  workspace: {
    showZoomControls: true,
    type: 'single',
  },
  workspaceControlPanel: {
    enabled: false,
  },
  windows: [{
    imageToolsEnabled: true,
    loadedManifest: manifestUrl
  }]
}

const plugins = [
  ...miradorImageToolsPlugin
];

Mirador.viewer(config, plugins)
