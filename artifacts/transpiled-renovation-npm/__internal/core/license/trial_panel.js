"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BASE_Z_INDEX = void 0;
exports.registerTrialPanelComponents = registerTrialPanelComponents;
exports.showTrialPanel = showTrialPanel;
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function () { return !!t; })(); }
function _isNativeFunction(fn) { try { return Function.toString.call(fn).indexOf("[native code]") !== -1; } catch (e) { return typeof fn === "function"; } }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
/* eslint-disable max-classes-per-file */
/* eslint no-restricted-imports: ["error", { "patterns": ["*"] }] */
const BASE_Z_INDEX = exports.BASE_Z_INDEX = 1500;
const DATA_PERMANENT_ATTRIBUTE = 'data-permanent';
const componentNames = {
  trigger: 'dx-license-trigger',
  panel: 'dx-license'
};
const attributeNames = {
  buyNow: 'buy-now',
  version: 'version'
};
const commonStyles = {
  opacity: '1',
  visibility: 'visible'
};
const containerStyles = _extends(_extends({}, commonStyles), {
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
const textStyles = _extends(_extends({}, commonStyles), {
  display: 'inline',
  position: 'static',
  padding: '0px',
  margin: '0px',
  color: 'white',
  'font-family': '"Segoe UI","Open Sans Condensed",-apple-system,BlinkMacSystemFont,avenir next,avenir,helvetica neue,helvetica,Cantarell,Ubuntu,roboto,noto,arial,sans-serif',
  'font-size': '14px',
  'font-wight': '600'
});
let DxLicense = /*#__PURE__*/function (_HTMLElement) {
  _inheritsLoose(DxLicense, _HTMLElement);
  function DxLicense() {
    var _this;
    var _a, _b, _c;
    _this = _HTMLElement.call(this) || this;
    _this._observer = null;
    _this._inReassign = false;
    _this._spanStyles = _this._createImportantStyles(textStyles, (_a = DxLicense.customStyles) === null || _a === void 0 ? void 0 : _a.textStyles);
    _this._linkStyles = _this._createImportantStyles(textStyles, (_b = DxLicense.customStyles) === null || _b === void 0 ? void 0 : _b.linkStyles);
    _this._containerStyles = _this._createImportantStyles(containerStyles, (_c = DxLicense.customStyles) === null || _c === void 0 ? void 0 : _c.containerStyles);
    return _this;
  }
  var _proto = DxLicense.prototype;
  _proto._createImportantStyles = function _createImportantStyles(defaultStyles, customStyles) {
    const styles = customStyles ? _extends(_extends({}, defaultStyles), customStyles) : defaultStyles;
    return Object.keys(styles).reduce((cssString, currentKey) => "".concat(cssString).concat([currentKey, "".concat(styles[currentKey], " !important;")].join(': ')), '');
  };
  _proto._createSpan = function _createSpan(text) {
    const span = document.createElement('span');
    span.innerText = text;
    span.style.cssText = this._spanStyles;
    return span;
  };
  _proto._createLink = function _createLink(text, href) {
    const link = document.createElement('a');
    link.innerText = text;
    link.style.cssText = this._linkStyles;
    link.href = href;
    link.target = '_blank';
    return link;
  };
  _proto._reassignComponent = function _reassignComponent() {
    this.innerHTML = '';
    this.style.cssText = this._containerStyles;
    this.append(this._createSpan('For evaluation purposes only. Redistribution not authorized. Please '), this._createLink('purchase a license', this.getAttribute(attributeNames.buyNow)), this._createSpan(" to continue use of DevExpress product libraries (v".concat(this.getAttribute(attributeNames.version), ").")));
  };
  _proto.connectedCallback = function connectedCallback() {
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
  };
  _proto.disconnectedCallback = function disconnectedCallback() {
    setTimeout(() => {
      const licensePanel = document.getElementsByTagName(componentNames.panel);
      if (!licensePanel.length) {
        document.body.prepend(this);
      }
    }, 100);
  };
  return DxLicense;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
DxLicense.customStyles = undefined;
let DxLicenseTrigger = /*#__PURE__*/function (_HTMLElement2) {
  _inheritsLoose(DxLicenseTrigger, _HTMLElement2);
  function DxLicenseTrigger() {
    return _HTMLElement2.apply(this, arguments) || this;
  }
  var _proto2 = DxLicenseTrigger.prototype;
  _proto2.connectedCallback = function connectedCallback() {
    const licensePanel = document.getElementsByTagName(componentNames.panel);
    if (!licensePanel.length) {
      const license = document.createElement(componentNames.panel);
      license.setAttribute(attributeNames.version, this.getAttribute(attributeNames.version));
      license.setAttribute(attributeNames.buyNow, this.getAttribute(attributeNames.buyNow));
      license.setAttribute(DATA_PERMANENT_ATTRIBUTE, 'true');
      document.body.prepend(license);
    }
  };
  return DxLicenseTrigger;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
function registerTrialPanelComponents(customStyles) {
  if (typeof customElements !== 'undefined' && !customElements.get(componentNames.trigger)) {
    DxLicense.customStyles = customStyles;
    customElements.define(componentNames.trigger, DxLicenseTrigger);
    customElements.define(componentNames.panel, DxLicense);
  }
}
function showTrialPanel(buyNowUrl, version, customStyles) {
  if (typeof customElements === 'undefined') {
    return;
  }
  registerTrialPanelComponents(customStyles);
  const trialPanelTrigger = document.createElement(componentNames.trigger);
  trialPanelTrigger.setAttribute(attributeNames.buyNow, buyNowUrl);
  trialPanelTrigger.setAttribute(attributeNames.version, version);
  document.body.appendChild(trialPanelTrigger);
}