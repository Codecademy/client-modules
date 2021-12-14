import React from 'react';
export var Editor = function Editor(_ref) {
  var text = _ref.text,
      _onChange = _ref.onChange;
  return /*#__PURE__*/React.createElement("textarea", {
    value: text,
    onChange: function onChange(e) {
      return _onChange(e.target.value);
    }
  });
};