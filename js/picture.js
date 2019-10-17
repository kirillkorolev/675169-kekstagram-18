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
  var smallPictures = picturesNode.querySelectorAll('.picture');

  var setIdToPictures = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].setAttribute('data-id', i + 1);
    }
  };

  var createSmallPictures = function (photos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderDescriptions(photos[i]));
    }
    picturesNode.appendChild(fragment);
  };

  var successHandler = function (photos) {
    createSmallPictures(photos);

    filters.classList.remove('img-filters--inactive');

    setIdToPictures(smallPictures);
  };

  window.backend.load(successHandler, window.form.errorHandler);

  /*
  var loadedPictures = [];

  window.backend.load(function (data) {
    loadedPictures = data;
    createSmallPictures(data);
  }, window.form.errorHandler);
*/

  window.picture = {
    picturesNode: picturesNode,
    successHandler: successHandler
  };
})();
