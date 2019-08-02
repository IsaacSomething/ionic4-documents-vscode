import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { Keys } from './keys';
import { IonicDocumentation } from './documentation-lists/ionic';

const fetch = require('node-fetch');
const atob = require('atob');
const marked = require('marked');
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
          vscode.ViewColumn.Beside, {
            enableScripts: true,
            localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'webview'))]
          });

        const filePath: vscode.Uri = vscode.Uri.file(path.join(context.extensionPath, 'src', 'webview', 'readme.html')).with({ scheme: 'vscode-resource' });
        documentationPanel.webview.html = fs.readFileSync(filePath.fsPath, 'utf8');

        fetch(`${githubUrl}/${foundElement.path}?client_id=${Keys.clientId}&client_secret=${Keys.clientSecret}`).then((resp: any) => resp.json())
          .then(function (data: any) {

            const content = marked(atob(data.content));
            console.log(content);
            
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
  const versionn = vscode.workspace.getConfiguration().get('ionic.documentation.version');
  console.log('versionn', versionn);

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


export function deactivate() { }
