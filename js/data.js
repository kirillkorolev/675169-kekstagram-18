'use strict';

(function () {
  var randomInteger = function (min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
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

  window.data = {
    randomInteger: randomInteger,
    closeMessageOnButton: closeMessageOnButton,
    showMessage: showMessage
  };
})();
