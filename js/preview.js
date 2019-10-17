'use strict';

(function () {
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

  window.picture.picturesNode.addEventListener('click', function (event) {
    var target = event.target.closest('.picture');

    if (target.closest('.pictures') === window.picture.picturesNode) {
      var id = target.dataset.id;

      bigPicture.querySelector('.big-picture__img img').src =
        'photos/' + id + '.jpg';
      openBigPicure();
    }
  });

  bigPictureCloseButton.addEventListener('click', closeBigPicture);
})();
