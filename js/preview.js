'use strict';

(function () {
  var loadedData = [];
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');

  bigPicture
    .querySelector('.social__comment-count')
    .classList.add('visually-hidden');
  bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');

  bigPicture.classList.add('hidden');

  var bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');

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

  var socialComments = bigPicture.querySelector('.social__comments');

  var renderComments = function (arr) {
    var commentTemplate = socialComments.children[0].cloneNode(true);
    commentTemplate.querySelector('.social__picture').src = arr.avatar;
    commentTemplate.querySelector('.social__picture').alt = arr.name;
    commentTemplate.querySelector('.social__text').textContent = arr.message;

    return commentTemplate;
  };

  var fragmentComments = document.createDocumentFragment();

  window.picture.picturesNode.addEventListener('click', function (event) {
    var target = event.target.closest('.picture');

    if (target) {
      var id = target.dataset.id;

      bigPicture.querySelector('.big-picture__img img').src =
        'photos/' + id + '.jpg';
      openBigPicure();

      bigPicture.querySelector('.likes-count').textContent =
        loadedData[id - 1].likes;
      bigPicture.querySelector('.social__caption').textContent =
        loadedData[id - 1].description;

      for (var i = 0; i < loadedData[id - 1].comments.length; i++) {
        fragmentComments.appendChild(
            renderComments(loadedData[id - 1].comments[i])
        );
      }
      socialComments.replaceWith(fragmentComments);
    }
  });

  var successHandler = function (data) {
    loadedData = data;

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
    };

    var filterPopularPictures = function () {
      var popularPictures = loadedData.sort(function (a, b) {
        return b.likes - a.likes;
      });

      loadedData = popularPictures;
    };

    var filterRandomPictures = function () {
      var randomPictures = [];

      var randomInteger = function (min, max) {
        var rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
      };
      for (var i = 0; i < 10; i++) {
        randomPictures.push(loadedData[randomInteger(0, 25)]);
      }
      loadedData = randomPictures;
      // console.log(randomPictures);
    };

    setActiveButton(filterDiscussed, filterPopular, filterRandom);
    setActiveButton(filterRandom, filterPopular, filterDiscussed);
    setActiveButton(filterPopular, filterRandom, filterDiscussed);

    filterRandomPictures();
    filterPopularPictures();
    */
  };

  window.backend.load(successHandler, window.form.errorHandler);

  bigPictureCloseButton.addEventListener('click', closeBigPicture);
})();
