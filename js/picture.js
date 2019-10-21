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
  var filters = document.querySelector('.img-filters');

  var successHandler = function (photos) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderDescriptions(photos[i]));
    }
    picturesNode.appendChild(fragment);

    filters.classList.remove('img-filters--inactive');

    var smallPictures = picturesNode.querySelectorAll('.picture');
    for (i = 0; i < smallPictures.length; i++) {
      smallPictures[i].setAttribute('data-id', i + 1);
    }
  };

  window.backend.load(successHandler, window.form.errorHandler);

  window.picture = {
    filters: filters,
    picturesNode: picturesNode,
    successHandler: successHandler
  };
})();
