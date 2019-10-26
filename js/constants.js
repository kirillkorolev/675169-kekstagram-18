'use strict';

(function () {
  var MAX_PERCENT = 100;
  var MIN_PERCENT = 25;
  var SHIFT_PERCENT = 25;
  var DEBOUNCE_INTERVAL = 500;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var TIMEOUT = 1000;
  var OK_CODE = 200;
  var ESC_KEYCODE = 27;

  window.constants = {
    MAX_PERCENT: MAX_PERCENT,
    MIN_PERCENT: MIN_PERCENT,
    SHIFT_PERCENT: SHIFT_PERCENT,
    DEBOUNCE_INTERVAL: DEBOUNCE_INTERVAL,
    FILE_TYPES: FILE_TYPES,
    TIMEOUT: TIMEOUT,
    OK_CODE: OK_CODE,
    ESC_KEYCODE: ESC_KEYCODE
  };
})();
