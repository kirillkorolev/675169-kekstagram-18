'use strict';

(function () {
  var descriptions = [];
  window.data.getPhotosDescription(descriptions);

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

  var fragment = document.createDocumentFragment();
  var pictures = document.querySelector('.pictures');

  for (var i = 0; i < descriptions.length; i++) {
    fragment.appendChild(renderDescriptions(descriptions[i]));
  }
  pictures.appendChild(fragment);

  window.picture = {
    fragment: fragment,
    pictures: pictures,
    descriptions: descriptions
  };
})();
