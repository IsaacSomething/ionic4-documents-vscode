import * as vscode from 'vscode';
import { Keys } from './keys';
import { IonicDocumentation } from './documentation-lists/ionic';

const fetch = require('node-fetch');
const atob = require('atob');
const githubUrl = 'https://api.github.com/repos/ionic-team/ionic/readme/core/src/components';

export function activate(context: vscode.ExtensionContext) {

  /**
   * Open Documentation 
   */
  const openDoc = vscode.commands.registerCommand('extension.openDoc', () => {
    const editor = vscode.window.activeTextEditor;

    if (editor) {

      const highlightedText = editor.document.getText(editor.selection);
      const foundElement = checkCodeElement(highlightedText);

      if (foundElement) {

        const documentationPanel = vscode.window.createWebviewPanel('html', `Ionic Documentation: ${highlightedText}`,
          vscode.ViewColumn.Beside, { enableScripts: true });

        documentationPanel.webview.html = getWebviewContent();

        fetch(`${githubUrl}/${foundElement.path}?client_id=${Keys.clientId}&client_secret=${Keys.clientSecret}`).then((resp: any) => resp.json())
          .then(function (data: any) {

            const content = atob(data.content);
            documentationPanel.webview.postMessage({ content: content });

          }).catch((error: any) => {
            showError(error);
          });

      } else {
        showError(`Ionic Documentation Error: Code element ${highlightedText} does not exist`);
      }
    }
  });

  /**
   * Open documentation to website
   */
  const openDocExternal = vscode.commands.registerCommand('extension.openDocExternal', () => {
    const editor = vscode.window.activeTextEditor;

    if (editor) {

      const highlightedText = editor.document.getText(editor.selection);
      const foundElement = checkCodeElement(highlightedText);

      foundElement
        ? vscode.env.openExternal(vscode.Uri.parse(`https://ionicframework.com/docs/api/${foundElement.path}`))
        : showError(`Ionic Documentation Error: Code element ${highlightedText} does not exist`);

    } else {
      showError(`Error`);
    }
  });

  /**
   * Listen for changes to ionic version change
   */
  const tron = vscode.workspace.getConfiguration().get('ionic.documentation.version');
  console.log('tron', tron);



  context.subscriptions.push(openDoc);
  context.subscriptions.push(openDocExternal);

}

/**
 * Checks that element exists
 * @param highlightedText The selected text
 */
function checkCodeElement(highlightedText: string) {
  return IonicDocumentation.ElementProperties.find((element) => {
    return element.element === highlightedText ? element : null;
  });
}

/**
 * Show error
 * @param error Error message
 */
function showError(error: string) {
  vscode.window.showErrorMessage(error, { modal: true });
}

/**
 * Generate webview
 */
function getWebviewContent() {

  // TODO: Add Security policy
  return `<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">

              <title>Ionic Documentation</title>

              <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>

              <script type="text/javascript">
                window.addEventListener('message', event => {
                  const message = event.data;
                  document.getElementById('content').innerHTML = marked(message.content);
                });
            </script>

            </head>
            <body id="content">
            </body>
          </html>`;
}

export function deactivate() { }
