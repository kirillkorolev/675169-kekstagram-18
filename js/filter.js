'use strict';

(function () {
  var allFilters = window.picture.filters.querySelectorAll(
      '.img-filters__button'
  );

  var filterRandomPictures = function () {
    var randomPictures = window.picture.loadedData.slice();

    randomPictures = window.data.shuffle(randomPictures).slice(0, 10);

    window.picture.renderPictures(randomPictures);
  };

  var filterDiscussedPictures = function () {
    var discussedPictures = window.picture.loadedData
      .slice()
      .sort(function (a, b) {
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
          allFilters.forEach(function (oneFilter) {
            oneFilter.classList.remove('img-filters__button--active');
          });
          filter.classList.add('img-filters__button--active');

          switch (filter.id) {
            case 'filter-random':
              removePictures();
              filterRandomPictures();

              break;
            case 'filter-discussed':
              removePictures();
              filterDiscussedPictures();
              break;
            case 'filter-popular':
              removePictures();
              window.picture.renderPictures(window.picture.loadedData);
              break;
          }
        }
      })
  );
})();
