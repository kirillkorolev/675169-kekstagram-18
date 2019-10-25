'use strict';

(function () {
  var shuffle = function (arr) {
    var j;
    var temp;
    for (var i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  };

  var onMessageEscPress = function (evt) {
    if (evt.keyCode === window.constants.ESC_KEYCODE) {
      closeMessage();
    }
  };

  var closeMessage = function () {
    var block = document.querySelector('.message');
    block.remove();
    document.removeEventListener('keydown', onMessageEscPress);
    document.removeEventListener('click', closeMessageOnClick);
  };

  var closeMessageOnButton = function (buttonSelector, selector) {
    var block = document.querySelector(selector);
    block.classList.add('message');

    var button = block.querySelector(buttonSelector);
    button.addEventListener('click', closeMessage);
  };

  var closeMessageOnClick = function () {
    document.addEventListener('click', closeMessage);
    closeMessage();
  };

  var showMessage = function (selector) {
    var main = document.querySelector('main');
    var template = document.querySelector(selector).content.cloneNode(true);

    main.appendChild(template);
    document.addEventListener('keydown', onMessageEscPress);
    document.addEventListener('click', closeMessageOnClick);
  };

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, window.constants.DEBOUNCE_INTERVAL);
    };
  };

  window.data = {
    shuffle: shuffle,
    closeMessageOnButton: closeMessageOnButton,
    showMessage: showMessage,
    debounce: debounce
  };
})();
