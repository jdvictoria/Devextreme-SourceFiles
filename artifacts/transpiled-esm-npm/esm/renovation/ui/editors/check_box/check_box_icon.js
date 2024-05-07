import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["size"];
import { createVNode } from "inferno";
import { BaseInfernoComponent } from '@devextreme/runtime/inferno';
import { normalizeStyles } from '@devextreme/runtime/inferno';
import { normalizeStyleProp } from '../../../../core/utils/style';
import '../../../../ui/themes';
export var viewFunction = viewModel => {
  var {
    cssStyles,
    elementRef
  } = viewModel;
  return createVNode(1, "span", "dx-checkbox-icon", null, 1, {
    "style": normalizeStyles(cssStyles)
  }, null, elementRef);
};
export var CheckBoxIconProps = {};
import { createRef as infernoCreateRef } from 'inferno';
export class CheckBoxIcon extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.elementRef = infernoCreateRef();
    this.__getterCache = {};
  }
  get cssStyles() {
    if (this.__getterCache['cssStyles'] !== undefined) {
      return this.__getterCache['cssStyles'];
    }
    return this.__getterCache['cssStyles'] = (() => {
      var {
        size
      } = this.props;
      var fontSize = normalizeStyleProp('fontSize', size);
      return {
        fontSize
      };
    })();
  }
  get restAttributes() {
    var _this$props = this.props,
      restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
    return restProps;
  }
  componentWillUpdate(nextProps, nextState, context) {
    if (this.props['size'] !== nextProps['size']) {
      this.__getterCache['cssStyles'] = undefined;
    }
  }
  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      elementRef: this.elementRef,
      cssStyles: this.cssStyles,
      restAttributes: this.restAttributes
    });
  }
}
CheckBoxIcon.defaultProps = CheckBoxIconProps;