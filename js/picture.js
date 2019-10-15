'use strict';

(function () {
  var template = document
    .querySelector('#picture')
    .content.querySelector('.picture');

  var renderDescriptions = function (description) {
    var descriptionElement = template.cloneNode(true);
    descriptionElement.querySelector('.picture__img').src = description.url;
    descriptionElement.querySelector('.picture__comments').textContent =
      description.comments.length;
    descriptionElement.querySelector('.picture__likes').textContent =
      description.likes;

    return descriptionElement;
  };

  var pictures = document.querySelector('.pictures');

  var successHandler = function (photos) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderDescriptions(photos[i]));
    }
    pictures.appendChild(fragment);

    var smallPictures = pictures.querySelectorAll('.picture');

    for (i = 0; i < smallPictures.length; i++) {
      smallPictures[i].setAttribute('data-id', i + 1);
    }
  };

  window.load(successHandler, window.form.errorHandler);

  window.picture = {
    pictures: pictures,
    successHandler: successHandler
  };
})();
