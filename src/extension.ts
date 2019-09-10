import * as vscode from 'vscode';
import { Keys } from './keys';
import { IonicDocumentation, ElementProps } from './ionic-documentation';

const fetch = require('node-fetch');
const atob = require('atob');


export function activate(context: vscode.ExtensionContext) {

  /**
   * Store element for use in extension.openDocExternal
   */
  let codeElement: ElementProps | undefined;

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

        vscode.window.withProgress({
          location: vscode.ProgressLocation.Window,
          title: "Loading Documentation"
        }, (progress, token) => {

          let progressPromise = new Promise(resolve => {

            codeElement = checkCodeElementExists(highlightedText);

            if (codeElement) {

              fetch(`${IonicDocumentation.IonicGitHubUri}/${codeElement.path}?client_id=${Keys.clientId}&client_secret=${Keys.clientSecret}`)
                .then((respone: any) => respone.json()).then((data: any) => {

                  const content = atob(data.content);

                  vscode.workspace.openTextDocument({ language: 'markdown', content: content }).then(textDocument => {
                    vscode.commands.executeCommand('markdown.showPreviewToSide', textDocument.uri);
                    resolve();
                  });

                }).catch((error: any) => {
                  showError(`Ionic Documentation Error: There was an issues getting the documentation.`);
                  resolve();
                });

            } else {
              showError(`Ionic Documentation Error: Element "${highlightedText}" does not exist.`);
              resolve();
            }

          });

          return progressPromise;

        });
      }
    }
  });

  /**
   * Open documentation to website from webview "editor/title"
   */
  const openDocExt = vscode.commands.registerCommand('extension.openDocExt', () => {
    codeElement
      ? vscode.env.openExternal(vscode.Uri.parse(`${IonicDocumentation.IonicExternalDocumentationUri}/${codeElement.path}`))
      : showError(`Ionic Documentation Error: Cannot navigate to the ionic documentation website.`);
  });

  context.subscriptions.push(openDoc);
  context.subscriptions.push(openDocExt);

}

/**
 * Checks that element exists
 * @param highlightedText The selected text from the editor
 */
function checkCodeElementExists(highlightedText: string) {
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
