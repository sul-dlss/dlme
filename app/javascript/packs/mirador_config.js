import Mirador from 'mirador/dist/es/src/index.js';
import miradorImageToolsPlugin from 'mirador-image-tools/es/plugins/miradorImageToolsPlugin.js';

const manifestUrl = document.querySelector('#m3')?.dataset?.iiifManifest;

if (manifestUrl) {
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
}
