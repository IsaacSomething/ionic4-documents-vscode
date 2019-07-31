import * as vscode from 'vscode';
import { CodeElementList } from './code-element-list';
import { Keys } from './keys';
import { IonicDocumentation } from './documentation-lists/ionic';

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

        /* documentationPanel.webview.postMessage({ content: data }); */
        documentationPanel.webview.html = getWebviewContent();

      } else {

        // Show error if highlighted test is not found
        showError(highlightedText);
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
  return CodeElementList.CodeElements.find((codeElement: string) => {
    return codeElement === highlightedText;
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
                fetch('https://api.github.com/repos/ionic-team/ionic/readme/core/src/components/menu?client_id=Iv1.088b31b4976113a7&client_secret=e5857b2d7ef31d35343696d6ad62e63c395edeeb')
                  .then((resp) => resp.json())
                  .then(function (data) {
                    document.getElementById('content').innerHTML = marked(window.atob(data.content));
                    });
            </script>

            </head>
            <body id="content">
            </body>
          </html>`;
}

export function deactivate() { }
