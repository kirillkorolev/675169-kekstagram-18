'use strict';

(function () {
  var createXhr = function (url, method, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

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

    xhr.open(method, url);
    return xhr;
  };

  var load = function (onLoad, onError) {
    var url = 'https://js.dump.academy/kekstagram/data';
    var xhr = createXhr(url, 'GET', onLoad, onError);
    xhr.send();
  };

  var publish = function (data, onLoad, onError) {
    var url = 'https://js.dump.academy/kekstagram';
    var xhr = createXhr(url, 'POST', onLoad, onError);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    publish: publish
  };
})();
