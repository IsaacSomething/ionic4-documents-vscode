import * as vscode from 'vscode';
import { CodeElementList } from './code-element-list';
import { Keys } from './keys';
import { IonicDocumentation, ElementProps } from './documentation-lists/ionic';
const fetch = require('node-fetch');
const atob = require('atob');

export function activate(context: vscode.ExtensionContext) {

  let openDoc = vscode.commands.registerCommand('extension.openDoc', (e) => {

    const editor = vscode.window.activeTextEditor;

    if (editor) {

      const highlightedText = editor.document.getText(editor.selection);
      const foundElement = checkCodeElement(highlightedText);

      if (foundElement) {

        // Open webview Panel Beside
        const documentationPanel = vscode.window.createWebviewPanel('html', `Ionic Documentation: ${highlightedText}`,
          vscode.ViewColumn.Beside, { enableScripts: true });

        documentationPanel.webview.html = getWebviewContent();

        fetch(`https://api.github.com/repos/ionic-team/ionic/readme/${foundElement.path}?client_id=${Keys.clientId}&client_secret=${Keys.clientSecret}`)
          .then((resp: any) => resp.json())
          .then(function (data: any) {

            const content = atob(data.content);
            // Post content as message to HTML
            documentationPanel.webview.postMessage({ content: content });

          }).catch((error: any) => {
            showError(`Api issue`);
          });

      } else {
        // Show error if highlighted test is not found
        showError(`Ionic Documentation Error: Code element ${highlightedText} does not exist`);
      }
    }
  });

  let openDocExternal = vscode.commands.registerCommand('extension.openDocExternal', (e) => {
    // TODO: Open external documentation
  });

  context.subscriptions.push(openDoc);
  context.subscriptions.push(openDocExternal);
}

function checkCodeElement(highlightedText: string) {
  return IonicDocumentation.ElementProperties.find((element) => {
    return element.element === highlightedText ? element : null;
  });
}

function showError(highlightedText: string) {
  // TODO: open list of all code elements
  vscode.window.showErrorMessage(`Ionic Documentation Error: Code element ${highlightedText} does not exist`);
}

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
            <body>
              <div id="test"></div>
              <div id="content"></div>
            </body>
          </html>`;
}

export function deactivate() { }
