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

  var smallPictures = window.picture.picturesNode.querySelectorAll('.picture');
  var pictures = document.querySelector('.pictures');

  for (var i = 0; i < smallPictures.length; i++) {
    var smallPicture = smallPictures[i];

    var link = smallPicture.dataset.id;

    pictures.closest('.pictures').addEventListener(
        'click',
        function () {
          bigPicture.querySelector('.big-picture__img img').src =
          'photos/' + link + '.jpg';
          openBigPicure();
        }.bind(null, i)
    );
  }

  bigPictureCloseButton.addEventListener('click', closeBigPicture);
})();
