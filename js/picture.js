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

  var picturesNode = document.querySelector('.pictures');

  var successHandler = function (photos) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderDescriptions(photos[i]));
    }
    picturesNode.appendChild(fragment);

    var smallPictures = picturesNode.querySelectorAll('.picture');

    for (i = 0; i < smallPictures.length; i++) {
      smallPictures[i].setAttribute('data-id', i);
    }
  };

  window.load(successHandler, window.form.errorHandler);

  window.picture = {
    picturesNode: picturesNode,
    successHandler: successHandler
  };
})();
