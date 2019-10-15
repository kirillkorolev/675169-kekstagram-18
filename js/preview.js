'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');

  bigPicture
    .querySelector('.social__comment-count')
    .classList.add('visually-hidden');
  bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');

  bigPicture.classList.add('hidden');

  var smallPictures = window.picture.pictures.querySelectorAll('.picture');
  var bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');

  var bigPicureOnMenuEscPress = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
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

  for (var i = 0; i < smallPictures.length; i++) {
    var smallPicture = smallPictures[i];

    var link = smallPicture.dataset.id;

    smallPicture.addEventListener(
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
