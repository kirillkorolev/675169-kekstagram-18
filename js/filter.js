'use strict';

(function () {
  var filterRandomPictures = function (photos) {
    var randomPictures = photos.slice();
    randomPictures = window.data.shuffle(randomPictures).slice(0, 10);
    window.picture.renderPictures(randomPictures);
  };

  var filterDiscussedPictures = function (photos) {
    var discussedPictures = photos.slice().sort(function (a, b) {
      return b.likes - a.likes;
    });
    window.picture.renderPictures(discussedPictures);
  };

  var removePictures = function () {
    var loadedPictures = window.picture.picturesNode.querySelectorAll(
        '.picture'
    );
    loadedPictures.forEach(function (picture) {
      picture.remove();
    });
  };

  window.picture.filters.addEventListener(
      'click',
      window.data.debounce(function (event) {
        var filter = event.target.closest('.img-filters__button');

        if (filter) {
          window.picture.filters
          .querySelector('.img-filters__button--active')
          .classList.remove('img-filters__button--active');

          filter.classList.add('img-filters__button--active');
          removePictures();

          switch (filter.id) {
            case 'filter-random':
              filterRandomPictures(window.picture.loadedData);
              break;
            case 'filter-discussed':
              filterDiscussedPictures(window.picture.loadedData);
              break;
            case 'filter-popular':
              window.picture.renderPictures(window.picture.loadedData);
              break;
          }
        }
      })
  );
})();
