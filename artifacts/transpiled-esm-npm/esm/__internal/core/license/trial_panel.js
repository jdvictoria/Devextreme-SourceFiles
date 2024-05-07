import _extends from "@babel/runtime/helpers/esm/extends";
/* eslint-disable max-classes-per-file */
/* eslint no-restricted-imports: ["error", { "patterns": ["*"] }] */
export var BASE_Z_INDEX = 1500;
var DATA_PERMANENT_ATTRIBUTE = 'data-permanent';
var componentNames = {
  trigger: 'dx-license-trigger',
  panel: 'dx-license'
};
var attributeNames = {
  buyNow: 'buy-now',
  version: 'version'
};
var commonStyles = {
  opacity: '1',
  visibility: 'visible'
};
var containerStyles = _extends(_extends({}, commonStyles), {
  width: '100%',
  height: 'auto',
  lineHeight: 'auto',
  display: 'block',
  'z-index': "".concat(BASE_Z_INDEX),
  position: 'relative',
  top: '0px',
  left: '0px',
  transform: 'translate(0px, 0px)',
  padding: '8px',
  'background-color': '#FF7200',
  border: 'none',
  margin: 'auto',
  'box-sizing': 'border-box',
  'text-align': 'center'
});
var textStyles = _extends(_extends({}, commonStyles), {
  display: 'inline',
  position: 'static',
  padding: '0px',
  margin: '0px',
  color: 'white',
  'font-family': '"Segoe UI","Open Sans Condensed",-apple-system,BlinkMacSystemFont,avenir next,avenir,helvetica neue,helvetica,Cantarell,Ubuntu,roboto,noto,arial,sans-serif',
  'font-size': '14px',
  'font-wight': '600'
});
class DxLicense extends HTMLElement {
  constructor() {
    var _a, _b, _c;
    super();
    this._observer = null;
    this._inReassign = false;
    this._spanStyles = this._createImportantStyles(textStyles, (_a = DxLicense.customStyles) === null || _a === void 0 ? void 0 : _a.textStyles);
    this._linkStyles = this._createImportantStyles(textStyles, (_b = DxLicense.customStyles) === null || _b === void 0 ? void 0 : _b.linkStyles);
    this._containerStyles = this._createImportantStyles(containerStyles, (_c = DxLicense.customStyles) === null || _c === void 0 ? void 0 : _c.containerStyles);
  }
  _createImportantStyles(defaultStyles, customStyles) {
    var styles = customStyles ? _extends(_extends({}, defaultStyles), customStyles) : defaultStyles;
    return Object.keys(styles).reduce((cssString, currentKey) => "".concat(cssString).concat([currentKey, "".concat(styles[currentKey], " !important;")].join(': ')), '');
  }
  _createSpan(text) {
    var span = document.createElement('span');
    span.innerText = text;
    span.style.cssText = this._spanStyles;
    return span;
  }
  _createLink(text, href) {
    var link = document.createElement('a');
    link.innerText = text;
    link.style.cssText = this._linkStyles;
    link.href = href;
    link.target = '_blank';
    return link;
  }
  _reassignComponent() {
    this.innerHTML = '';
    this.style.cssText = this._containerStyles;
    this.append(this._createSpan('For evaluation purposes only. Redistribution not authorized. Please '), this._createLink('purchase a license', this.getAttribute(attributeNames.buyNow)), this._createSpan(" to continue use of DevExpress product libraries (v".concat(this.getAttribute(attributeNames.version), ").")));
  }
  connectedCallback() {
    this._reassignComponent();
    if (!this._observer) {
      this._observer = new MutationObserver(() => {
        if (this._inReassign) {
          this._inReassign = false;
        } else {
          this._inReassign = true;
          this._reassignComponent();
        }
      });
      this._observer.observe(this, {
        childList: true,
        attributes: true,
        // eslint-disable-next-line spellcheck/spell-checker
        subtree: true
      });
    }
  }
  disconnectedCallback() {
    setTimeout(() => {
      var licensePanel = document.getElementsByTagName(componentNames.panel);
      if (!licensePanel.length) {
        document.body.prepend(this);
      }
    }, 100);
  }
}
DxLicense.customStyles = undefined;
class DxLicenseTrigger extends HTMLElement {
  connectedCallback() {
    var licensePanel = document.getElementsByTagName(componentNames.panel);
    if (!licensePanel.length) {
      var license = document.createElement(componentNames.panel);
      license.setAttribute(attributeNames.version, this.getAttribute(attributeNames.version));
      license.setAttribute(attributeNames.buyNow, this.getAttribute(attributeNames.buyNow));
      license.setAttribute(DATA_PERMANENT_ATTRIBUTE, 'true');
      document.body.prepend(license);
    }
  }
}
export function registerTrialPanelComponents(customStyles) {
  if (typeof customElements !== 'undefined' && !customElements.get(componentNames.trigger)) {
    DxLicense.customStyles = customStyles;
    customElements.define(componentNames.trigger, DxLicenseTrigger);
    customElements.define(componentNames.panel, DxLicense);
  }
}
export function showTrialPanel(buyNowUrl, version, customStyles) {
  if (typeof customElements === 'undefined') {
    return;
  }
  registerTrialPanelComponents(customStyles);
  var trialPanelTrigger = document.createElement(componentNames.trigger);
  trialPanelTrigger.setAttribute(attributeNames.buyNow, buyNowUrl);
  trialPanelTrigger.setAttribute(attributeNames.version, version);
  document.body.appendChild(trialPanelTrigger);
}