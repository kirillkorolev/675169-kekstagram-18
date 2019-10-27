'use strict';

(function () {
  var picturesNode = document.querySelector('.pictures');
  var filters = document.querySelector('.img-filters');

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
    descriptionElement.id = description.id;

    return descriptionElement;
  };

  var renderPictures = function (photos) {
    var fragment = document.createDocumentFragment();

    photos.forEach(function (photo) {
      fragment.appendChild(renderDescriptions(photo));
    });

    picturesNode.appendChild(fragment);

    filters.classList.remove('img-filters--inactive');
  };

  var successHandler = function (photos) {
    window.picture.loadedData = photos.map(function (photo, id) {
      photo.id = id + 1;
      return photo;
    });
    renderPictures(window.picture.loadedData);
  };

  window.backend.load(successHandler, window.form.errorHandler);

  window.picture = {
    renderPictures: renderPictures,
    filters: filters,
    picturesNode: picturesNode,
    successHandler: successHandler
  };
})();
