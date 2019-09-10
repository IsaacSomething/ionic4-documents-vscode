export interface ElementProps {
  path: string;
  element: string;
}

export class IonicDocumentation {

  public static readonly IonicGitHubUri = 'https://api.github.com/repos/ionic-team/ionic/readme/core/src/components';
  public static readonly IonicExternalDocumentationUri = 'https://ionicframework.com/docs/api';

  public static readonly ElementProperties: ElementProps[] = [
    { path: 'action-sheet-controller', element: 'ion-action-sheet-controller', },
    { path: 'action-sheet', element: 'ActionSheetController' },
    { path: 'alert-controller', element: 'ion-alert-controller' },
    { path: 'alert', element: 'ion-alert' },
    { path: 'anchor', element: 'ion-anchor' },
    { path: 'app', element: 'ion-app' },
    { path: 'avatar', element: 'ion-avatar' },
    { path: 'back-button', element: 'ion-back-button' },
    { path: 'backdrop', element: 'ion-backdrop' },
    { path: 'badge', element: 'ion-badge' },
    { path: 'button', element: 'ion-button' },
    { path: 'buttons', element: 'ion-buttons' },
    { path: 'card-content', element: 'ion-card-content' },
    { path: 'card-header', element: 'ion-card-header' },
    { path: 'card-subtitle', element: 'ion-card-subtitle' },
    { path: 'card-title', element: 'ion-card-title' },
    { path: 'card', element: 'ion-card' },
    { path: 'checkbox', element: 'ion-checkbox' },
    { path: 'chip', element: 'ion-chip' },
    { path: 'col', element: 'ion-col' },
    { path: 'content', element: 'ion-content' },
    { path: 'datetime', element: 'ion-datetime' },
    { path: 'fab-button', element: 'ion-fab-button' },
    { path: 'fab-list', element: 'ion-fab-list' },
    { path: 'fab', element: 'ion-fab' },
    { path: 'footer', element: 'ion-footer' },
    { path: 'grid', element: 'ion-grid' },
    { path: 'header', element: 'ion-header' },
    { path: 'icon', element: 'ion-icon' },
    { path: 'img', element: 'ion-img' },
    { path: 'infinite-scroll-content', element: 'ion-infinite-scroll-content' },
    { path: 'infinite-scroll', element: 'ion-infinite-scroll' },
    { path: 'input', element: 'ion-input' },
    { path: 'item-divider', element: 'ion-item-divider' },
    { path: 'item-group', element: 'ion-item-group' },
    { path: 'item-option', element: 'ion-item-option' },
    { path: 'item-options', element: 'ion-item-options' },
    { path: 'item-sliding', element: 'ion-item-sliding' },
    { path: 'item', element: 'ion-item' },
    { path: 'label', element: 'ion-label' },
    { path: 'list-header', element: 'ion-list-header' },
    { path: 'list', element: 'ion-list' },
    { path: 'loading-controller', element: 'ion-loading-controller' },
    { path: 'loading', element: 'ion-loading' },
    { path: 'menu-button', element: 'ion-menu-button' },
    { path: 'menu-controller', element: 'ion-menu-controller' },
    { path: 'menu-toggle', element: 'ion-menu-toggle' },
    { path: 'menu', element: 'ion-menu' },
    { path: 'modal-controller', element: 'ion-modal-controller' },
    { path: 'modal', element: 'ion-modal' },
    { path: 'nav-pop', element: 'ion-nav-pop' },
    { path: 'nav-push', element: 'ion-nav-push' },
    { path: 'nav-set-root', element: 'ion-nav-set-root' },
    { path: 'nav', element: 'ion-nav' },
    { path: 'note', element: 'ion-note' },
    { path: 'picker-column', element: 'ion-picker-column' },
    { path: 'picker-controller', element: 'ion-picker-controller' },
    { path: 'picker', element: 'ion-picker' },
    { path: 'platform', element: 'platform' },
    { path: 'popover-controller', element: 'ion-popover-controller' },
    { path: 'popover', element: 'ion-popover' },
    { path: 'progress-bar', element: 'ion-progress-bar' },
    { path: 'radio-group', element: 'ion-radio-group' },
    { path: 'radio', element: 'ion-radio' },
    { path: 'range', element: 'ion-range' },
    { path: 'refresher-content', element: 'ion-refresher-content' },
    { path: 'refresher', element: 'ion-refresher' },
    { path: 'reorder-group', element: 'ion-reorder-group' },
    { path: 'reorder', element: 'ion-reorder' },
    { path: 'ripple-effect', element: 'ion-ripple-effect' },
    { path: 'route-redirect', element: 'ion-route-redirect' },
    { path: 'route', element: 'ion-route' },
    { path: 'router-link', element: 'ion-router-link' },
    { path: 'router-outlet', element: 'ion-router-outlet' },
    { path: 'router', element: 'ion-router' },
    { path: 'row', element: 'ion-row' },
    { path: 'searchbar', element: 'ion-searchbar' },
    { path: 'segment-button', element: 'ion-segment-button' },
    { path: 'segment', element: 'ion-segment' },
    { path: 'select-option', element: 'ion-select-option' },
    { path: 'select-popover', element: 'ion-select-popover' },
    { path: 'select', element: 'ion-select' },
    { path: 'skeleton-text', element: 'ion-skeleton-text' },
    { path: 'slide', element: 'ion-slide' },
    { path: 'slides', element: 'ion-slides' },
    { path: 'spinner', element: 'ion-spinner' },
    { path: 'split-pane', element: 'ion-split-pane' },
    { path: 'tab-bar', element: 'ion-tab-bar' },
    { path: 'tab-button', element: 'ion-tab-button' },
    { path: 'tab', element: 'ion-tab' },
    { path: 'tabs', element: 'ion-tabs' },
    { path: 'text', element: 'ion-text' },
    { path: 'textarea', element: 'ion-textarea' },
    { path: 'thumbnail', element: 'ion-thumbnail' },
    { path: 'title', element: 'ion-title' },
    { path: 'toast-controller', element: 'ion-toast-controller' },
    { path: 'toast', element: 'ion-toast' },
    { path: 'toggle', element: 'ion-toggle' },
    { path: 'toolbar', element: 'ion-toolbar' },
    { path: 'virtual-scroll', element: 'ion-virtual-scroll' }
  ];

}