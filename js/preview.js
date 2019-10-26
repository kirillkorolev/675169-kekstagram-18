'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');

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

  var showComments = function (commentaries) {
    var fragmentComments = document.createDocumentFragment();
    commentaries.forEach(function (item, j) {
      var comment = renderComments(item);

      if (j >= 5) {
        comment.classList.add('visually-hidden');
      }
      fragmentComments.appendChild(comment);
    });
    window.data.deleteElements(socialComments);

    socialComments.appendChild(fragmentComments);
  };

  var loadNextComments = function () {
    var hiddenComments = bigPicture.querySelectorAll('li.visually-hidden');

    if (hiddenComments.length > 5) {
      for (var i = 0; i < 5; i++) {
        hiddenComments[i].classList.remove('visually-hidden');
      }
    } else {
      for (i = 0; i < hiddenComments.length; i++) {
        hiddenComments[i].classList.remove('visually-hidden');
        commentsLoaderButton.classList.add('visually-hidden');
      }
    }
  };

  window.picture.picturesNode.addEventListener('click', function (event) {
    var target = event.target.closest('.picture');

    if (target) {
      var id = target.dataset.id;

      var commentsArr = window.picture.loadedData[id - 1].comments;
      var commentsAmmount = commentsArr.length;

      bigPicture.querySelector('.big-picture__img img').src =
        'photos/' + id + '.jpg';
      openBigPicure();

      bigPicture.querySelector('.likes-count').textContent =
        window.picture.loadedData[id - 1].likes;
      bigPicture.querySelector('.social__caption').textContent =
        window.picture.loadedData[id - 1].description;

      if (commentsAmmount < 5) {
        commentsLoaderButton.classList.add('visually-hidden');

        bigPicture.querySelector('.social__comment-count').innerHTML =
          'Комментариев ' +
          '<span class="comments-count">' +
          commentsAmmount +
          '</span>';

        showComments(commentsArr);
      } else {
        bigPicture.querySelector('.social__comment-count').innerHTML =
          '5 из ' +
          '<span class="comments-count">' +
          commentsAmmount +
          '</span>' +
          '  комментариев';

        if (commentsLoaderButton.classList.contains('visually-hidden')) {
          commentsLoaderButton.classList.remove('visually-hidden');
        }

        showComments(commentsArr);

        commentsLoaderButton.addEventListener('click', function () {
          loadNextComments();

          var shownComments = bigPicture.querySelectorAll(
              'li:not(.visually-hidden)'
          );
          bigPicture.querySelector('.social__comment-count').innerHTML =
            shownComments.length +
            ' из ' +
            '<span class="comments-count">' +
            commentsAmmount +
            '</span>' +
            '  комментариев';
        });
      }
    }
  });

  bigPictureCloseButton.addEventListener('click', closeBigPicture);
})();
