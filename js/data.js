'use strict';

(function () {
  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var NAMES = ['Артем', 'Михаил', 'Руслан', 'Татьяна', 'Валерия'];

  var getRandomElement = function (arr) {
    return arr[gerRandomBetweenTwo(0, arr.length - 1)];
  };

  var gerRandomBetweenTwo = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  var getMessage = function (arr) {
    if (gerRandomBetweenTwo(1, 2) === 1) {
      return arr[gerRandomBetweenTwo(0, arr.length - 1)];
    } else {
      return (
        arr[gerRandomBetweenTwo(0, arr.length - 1)] +
        ' ' +
        arr[gerRandomBetweenTwo(0, arr.length - 1)]
      );
    }
  };

  var getComment = function (number) {
    var leftComments = [];
    for (var i = 0; i < number; i++) {
      var comment = {
        avatar: 'img/avatar-' + gerRandomBetweenTwo(1, 6) + '.svg',
        message: getMessage(COMMENTS),
        name: getRandomElement(NAMES)
      };

      leftComments[i] = comment;
    }

    return leftComments;
  };

  var getPhotosDescription = function (arr) {
    for (var i = 0; i < 25; i++) {
      var photoDescription = {
        url: 'photos/' + (i + 1) + '.jpg',
        description: '',
        likes: gerRandomBetweenTwo(15, 200),
        comments: getComment(gerRandomBetweenTwo(0, 100))
      };

      arr[i] = photoDescription;
    }
    return arr;
  };

  var onMessageEscPress = function (evt) {
    if (evt.keyCode === window.constants.ESC_KEYCODE) {
      closeMessage();
    }
  };

  var closeMessage = function () {
    var block = document.querySelector('.message');
    block.remove();
    document.removeEventListener('keydown', onMessageEscPress);
    document.removeEventListener('click', closeMessageOnClick);
  };

  var closeMessageOnButton = function (buttonSelector, selector) {
    var block = document.querySelector(selector);
    block.classList.add('message');

    var button = block.querySelector(buttonSelector);
    button.addEventListener('click', closeMessage);
  };

  var closeMessageOnClick = function () {
    document.addEventListener('click', closeMessage);
    closeMessage();
  };

  var showMessage = function (selector) {
    var main = document.querySelector('main');
    var template = document.querySelector(selector).content.cloneNode(true);

    main.appendChild(template);
    document.addEventListener('keydown', onMessageEscPress);
    document.addEventListener('click', closeMessageOnClick);
  };

  window.data = {
    COMMENTS: COMMENTS,
    NAMES: NAMES,
    getComment: getComment,
    getPhotosDescription: getPhotosDescription,
    closeMessageOnButton: closeMessageOnButton,
    showMessage: showMessage
  };
})();
