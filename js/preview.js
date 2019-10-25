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
              // window.picture.successHandler(filterRandomPictures());
              filterRandomPictures();

              break;
            case 'filter-discussed':
              removePictures();
              // window.picture.successHandler(filterDiscussedPictures());
              filterDiscussedPictures();
              break;
            case 'filter-popular':
              removePictures();

              // window.picture.successHandler(window.picture.loadedData);
              window.picture.renderPictures(window.picture.loadedData);
              break;
          }
        }
      })
  );

  bigPictureCloseButton.addEventListener('click', closeBigPicture);
})();
