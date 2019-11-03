'use strict';

(function () {
  var shuffle = function (arr) {
    var j;
    var temp;
    var shuffleArr = arr.slice();
    shuffleArr.forEach(function (el, i) {
      j = Math.floor(Math.random() * (i + 1));
      temp = shuffleArr[j];
      shuffleArr[j] = el;
      shuffleArr[i] = temp;
    });

    return shuffleArr;
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

  var closeMessageOnButtonClick = function (buttonSelector, selector) {
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

  var deleteElements = function (block) {
    while (block.firstChild) {
      block.removeChild(block.firstChild);
    }
  };

  var isUniqArray = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      for (var j = i + 1; j < arr.length; j++) {
        if (arr[i] === arr[j]) {
          return false;
        }
      }
    }
    return true;
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
    closeMessageOnButtonClick: closeMessageOnButtonClick,
    showMessage: showMessage,
    deleteElements: deleteElements,
    isUniqArray: isUniqArray,
    debounce: debounce
  };
})();
