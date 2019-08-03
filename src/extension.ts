import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { Keys } from './keys';
import { IonicDocumentation, ElementProps } from './ionic-documentation';

const fetch = require('node-fetch');
const atob = require('atob');
const marked = require('marked');

export function activate(context: vscode.ExtensionContext) {

  /**
   * Store element for use in extension.openDocExt
   */
  let foundElement: ElementProps | undefined;

  /**
   * Open Documentation 
   */
  const openDoc = vscode.commands.registerCommand('extension.openDoc', () => {
    const editor = vscode.window.activeTextEditor;

    if (editor) {

      const highlightedText = editor.document.getText(editor.selection);

      if (!highlightedText) {
        showError('Ionic Documentation Error: You need to highlight an element in order to view its documentation.');
      } else {

        foundElement = checkCodeElement(highlightedText);

        if (foundElement) {

          // Set webview panel
          const documentationPanel = vscode.window.createWebviewPanel('html', `Ionic Documentation: ${highlightedText}`,
            vscode.ViewColumn.Beside, {
              localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'webview'))],
              enableScripts: true,
              retainContextWhenHidden: true,
              enableFindWidget: true
            });

          // Get html file webview/readme.html
          const filePath: vscode.Uri = vscode.Uri.file(path.join(context.extensionPath, 'src', 'webview', 'readme.html')).with({ scheme: 'vscode-resource' });
          documentationPanel.webview.html = fs.readFileSync(filePath.fsPath, 'utf8');

          // Get github documentation
          fetch(`${IonicDocumentation.IonicGitHubUri}/${foundElement.path}?client_id=${Keys.clientId}&client_secret=${Keys.clientSecret}`).then((resp: any) => resp.json())
            .then(function (data: any) {

              // Decode .content property and set as markdown
              const content = marked(atob(data.content), { langPrefix: '' });

              // Post markdown text to readme.html - window.addEventListener('message', event => {
              documentationPanel.webview.postMessage({ content: content });

              console.log('documentationPanel', documentationPanel);


            }).catch((error: any) => {
              showError(error);
            });

        } else {
          showError(`Ionic Documentation Error: Element "${highlightedText}" does not exist.`);
        }

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
        ? vscode.env.openExternal(vscode.Uri.parse(`${IonicDocumentation.IonicExternalDocumentationUri}/${foundElement.path}`))
        : showError(`Ionic Documentation Error: Element ${highlightedText} does not exist.`);

    } else {
      showError('Ionic Documentation Error: No editor found.');
    }
  });

  /**
   * Open documentation to website from webview "editor/title"
   */
  const openDocExt = vscode.commands.registerCommand('extension.openDocExt', () => {
    foundElement
      ? vscode.env.openExternal(vscode.Uri.parse(`${IonicDocumentation.IonicExternalDocumentationUri}/${foundElement.path}`))
      : showError(`Ionic Documentation Error: Cannot navigate to the ionic documentation website.`);
  });

  context.subscriptions.push(openDoc);
  context.subscriptions.push(openDocExternal);
  context.subscriptions.push(openDocExt);

}

/**
 * Checks that element exists
 * @param highlightedText The selected text from the editor
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
