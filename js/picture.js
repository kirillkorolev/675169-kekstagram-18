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

  var renderPictures = function (photos) {
    var fragment = document.createDocumentFragment();

    photos.forEach(function (photo) {
      fragment.appendChild(renderDescriptions(photo));
    });

    picturesNode.appendChild(fragment);

    filters.classList.remove('img-filters--inactive');

    var smallPictures = picturesNode.querySelectorAll('.picture');

    for (var i = 0; i < smallPictures.length; i++) {
      smallPictures[i].setAttribute('data-id', i + 1);
    }
  };

  var successHandler = function (photos) {
    window.picture.loadedData = photos;
    renderPictures(photos);
  };

  window.backend.load(successHandler, window.form.errorHandler);

  window.picture = {
    renderPictures: renderPictures,
    filters: filters,
    picturesNode: picturesNode,
    successHandler: successHandler
  };
})();
