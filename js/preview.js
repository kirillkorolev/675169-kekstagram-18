'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');

  var bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
  var allFilters = window.picture.filters.querySelectorAll(
      '.img-filters__button'
  );
  var socialComments = bigPicture.querySelector('.social__comments');
  var commentsLoaderButton = bigPicture.querySelector('.comments-loader');

  var bigPicureOnMenuEscPress = function (evt) {
    if (evt.keyCode === window.constants.ESC_KEYCODE) {
      closeBigPicture();
    }
  };

  var openBigPicure = function () {
    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', bigPicureOnMenuEscPress);
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', bigPicureOnMenuEscPress);
  };

  var renderComments = function (arr) {
    var commentTemplate = socialComments.children[0].cloneNode(true);
    commentTemplate.querySelector('.social__picture').src = arr.avatar;
    commentTemplate.querySelector('.social__picture').alt = arr.name;
    commentTemplate.querySelector('.social__text').textContent = arr.message;

    return commentTemplate;
  };

  bigPicture.classList.add('hidden');
  var fragmentComments = document.createDocumentFragment();

  var showComments = function (arr, number) {
    for (var i = 0; i < number; i++) {
      fragmentComments.appendChild(renderComments(arr[i]));
    }
    socialComments.replaceWith(fragmentComments);
  };

  window.picture.picturesNode.addEventListener('click', function (event) {
    var target = event.target.closest('.picture');

    if (target) {
      var id = target.dataset.id;

      bigPicture.querySelector('.big-picture__img img').src =
        'photos/' + id + '.jpg';
      openBigPicure();

      bigPicture.querySelector('.likes-count').textContent =
        window.picture.loadedData[id - 1].likes;
      bigPicture.querySelector('.social__caption').textContent =
        window.picture.loadedData[id - 1].description;
      var commentsAmmount = window.picture.loadedData[id - 1].comments.length;
      if (commentsAmmount < 5) {
        bigPicture
          .querySelector('.social__comment-count')
          .classList.add('visually-hidden');

        commentsLoaderButton.classList.add('visually-hidden');

        bigPicture.querySelector('.comments-count').remove();
        bigPicture.querySelector(
            ('.social__comment-count'.textContent =
            commentsAmmount - 1 + 'комментраиев')
        );

        showComments(
            window.picture.loadedData[id - 1].comments,
            commentsAmmount
        );
      } else {
        bigPicture.querySelector(
            '.comments-count'
        ).textContent = commentsAmmount;
        showComments(window.picture.loadedData[id - 1].comments, 5);

        commentsLoaderButton.addEventListener('click', function () {
          if (commentsAmmount > 5) {
            showComments(window.picture.loadedData[id - 1].comments, 5);
          } else {
            commentsLoaderButton.classList.add('visually-hidden');
          }
        });
      }
    }
  });

  var filterRandomPictures = function () {
    var randomPictures = [];

    randomPictures = window.data
      .shuffle(window.picture.loadedData)
      .slice(0, 10);

    console.log(randomPictures);
    window.picture.renderPictures(randomPictures);
  };

  var filterDiscussedPictures = function () {
    var discussedPictures = window.picture.loadedData.sort(function (a, b) {
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

  window.picture.filters.addEventListener('click', function (event) {
    var filter = event.target.closest('.img-filters__button');

    if (filter) {
      allFilters.forEach(function (oneFilter) {
        oneFilter.classList.remove('img-filters__button--active');
      });
      filter.classList.add('img-filters__button--active');

      switch (filter.id) {
        case 'filter-random':
          removePictures();
          window.picture.successHandler(filterRandomPictures());

          break;
        case 'filter-discussed':
          removePictures();
          window.picture.successHandler(filterDiscussedPictures());
          break;
        case 'filter-popular':
          removePictures();
          window.picture.successHandler(window.picture.loadedData);
          break;
      }
    }
  });

  /*
  var filterPopular = window.picture.filters.querySelector('#filter-popular');
  var filterRandom = window.picture.filters.querySelector('#filter-random');
  var filterDiscussed = window.picture.filters.querySelector(
      '#filter-discussed'
  );

  var setActiveButton = function (activeButton, otherButton1, otherButton2) {
    activeButton.addEventListener('click', function () {
      if (!activeButton.classList.contains('img-filters__button--active')) {
        activeButton.classList.add('img-filters__button--active');
        otherButton1.classList.remove('img-filters__button--active');
        otherButton2.classList.remove('img-filters__button--active');
      }
    });
    filterPopularPictures();
  };

  var filterPopularPictures = function () {
    var popularPictures = loadedData.sort(function (a, b) {
      return b.likes - a.likes;
    });
    window.picture.renderPictures(popularPictures);
  };

  filterDiscussed.addEventListener('click', function () {
    filterPopularPictures();
  });


 */

  // window.backend.load(window.picture.successHandler, window.form.errorHandler);

  bigPictureCloseButton.addEventListener('click', closeBigPicture);
})();
