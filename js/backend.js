'use strict';

(function () {
  window.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.open('GET', 'https://js.dump.academy/kekstagram/data');

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.send();
  };

  var errorHandler = function () {
    var templateError = document
      .querySelector('#picture')
      .content.querySelector('.error');

    templateError.style.display = 'block';
    templateError.style.position = 'absolute';
    templateError.style.left = '50%';
    templateError.style.right = '50%';
    document.body.insertAdjacentElement('afterbegin', templateError);
  };

  window.backend = {
    errorHandler: errorHandler
  };
})();
