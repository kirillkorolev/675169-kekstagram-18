'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');

  var socialComments = bigPicture.querySelector('.social__comments');
  var commentsLoaderButton = bigPicture.querySelector('.comments-loader');

  var closeBigPicureOnMenuEscPress = function (evt) {
    if (evt.keyCode === window.constants.ESC_KEYCODE) {
      closeBigPicture();
    }
  };

  var openBigPicure = function () {
    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', closeBigPicureOnMenuEscPress);
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', closeBigPicureOnMenuEscPress);
    commentsLoaderButton.removeEventListener('click', loadNextCommentsHandler);
  };

  var renderComments = function (arr) {
    var commentTemplate = socialComments.children[0].cloneNode(true);
    var socialPicture = commentTemplate.querySelector('.social__picture');
    socialPicture.src = arr.avatar;
    socialPicture.alt = arr.name;
    commentTemplate.querySelector('.social__text').textContent = arr.message;

    return commentTemplate;
  };

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

    if (hiddenComments.length > window.constants.COMMENTS_STEP) {
      for (var i = 0; i < window.constants.COMMENTS_STEP; i++) {
        hiddenComments[i].classList.remove('visually-hidden');
      }
    } else {
      hiddenComments.forEach(function (comment) {
        comment.classList.remove('visually-hidden');
      });

      commentsLoaderButton.classList.add('visually-hidden');
    }
  };

  var updateCommentsAmmount = function (
      socialCommentStart,
      ammount,
      socialCommentEnd
  ) {
    var socialCommentCountNode = bigPicture.querySelector(
        '.social__comment-count'
    );
    var commentsCountNode = document.createElement('span');
    commentsCountNode.classList.add('comments-count');

    socialCommentCountNode.textContent = socialCommentStart;
    commentsCountNode.innerText = ammount;
    socialCommentCountNode.appendChild(commentsCountNode);
    socialCommentCountNode.append(socialCommentEnd);
  };

  var loadNextCommentsHandler = function () {
    loadNextComments();
    var commentsAmmount = bigPicture.querySelectorAll('li').length;
    var shownComments = bigPicture.querySelectorAll('li:not(.visually-hidden)');

    updateCommentsAmmount(
        shownComments.length + ' из ',
        commentsAmmount,
        '  комментариев'
    );
  };

  bigPicture.classList.add('hidden');

  window.picture.picturesNode.addEventListener('click', function (event) {
    var target = event.target.closest('.picture');

    if (target) {
      var id = target.id;
      var commentsArr = window.picture.loadedData[id - 1].comments;
      var commentsAmmount = commentsArr.length;

      bigPicture.querySelector('.big-picture__img img').src =
        window.picture.loadedData[id - 1].url;

      openBigPicure();

      bigPicture.querySelector('.likes-count').textContent =
        window.picture.loadedData[id - 1].likes;
      bigPicture.querySelector('.social__caption').textContent =
        window.picture.loadedData[id - 1].description;

      if (commentsAmmount < window.constants.COMMENTS_STEP) {
        commentsLoaderButton.classList.add('visually-hidden');

        updateCommentsAmmount('Комментариев ', commentsAmmount, '');
        showComments(commentsArr);
      } else {
        updateCommentsAmmount('5 из ', commentsAmmount, '  комментариев');

        if (commentsLoaderButton.classList.contains('visually-hidden')) {
          commentsLoaderButton.classList.remove('visually-hidden');
        }

        showComments(commentsArr);

        commentsLoaderButton.addEventListener('click', loadNextCommentsHandler);
      }
    }
  });

  bigPictureCloseButton.addEventListener('click', closeBigPicture);
})();
