'use strict';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var NAMES = ['Артем', 'Михаил', 'Руслан', 'Татьяна', 'Валерия'];

var getRandomNumber = function (number) {
  return Math.floor(Math.random() * number);
};

var getRandomElement = function (arr) {
  return getRandomNumber(arr.length);
};

var gerRandomBetweenTwo = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var getMessage = function (arr) {
  if (gerRandomBetweenTwo(1, 2) === 1) {
    return arr[getRandomNumber(arr.length)];
  } else {
    return (
      arr[getRandomNumber(arr.length)] + ' ' + arr[getRandomNumber(arr.length)]
    );
  }
};

var getPhotoNumber = function (ammount) {
  for (var i = 0; i < ammount; i++) {
    var number = gerRandomBetweenTwo(1, 25);
    if (number !== number[i]) {
      return number;
    }
  }
  return number;
};

var leftComments = [];

var getComment = function (arr, number) {
  for (var i = 0; i < number; i++) {
    var comment = {
      avatar: 'img/avatar-' + gerRandomBetweenTwo(1, 6) + '.svg',
      message: getMessage(COMMENTS),
      name: NAMES[getRandomElement(NAMES)]
    };

    arr[i] = comment;
  }

  return leftComments;
};

var getPhotosDescription = function (arr) {
  for (var i = 0; i < 25; i++) {
    var photoDescription = {
      url: 'photos/' + (i + 1) + '.jpg',
      description: '',
      likes: gerRandomBetweenTwo(15, 200),
      comments: getComment(leftComments, getRandomNumber(100))
    };

    arr[i] = photoDescription;
    leftComments = [];
  }
  return arr;
};

var descriptions = [];
getPhotosDescription(descriptions);

var template = document
  .querySelector('#picture')
  .content.querySelector('.picture');

var renderDescriptions = function (description) {
  var descriptionElement = template.cloneNode(true);
  descriptionElement.querySelector('.picture__img').src = description.url;
  descriptionElement.querySelector('.picture__comments').textContent =
    description.comments.length;
  descriptionElement.querySelector('.picture__likes').textContent =
    description.likes;

  return descriptionElement;
};

var fragment = document.createDocumentFragment();
var pictures = document.querySelector('.pictures');

for (var i = 0; i < descriptions.length; i++) {
  fragment.appendChild(renderDescriptions(descriptions[i]));
}
pictures.appendChild(fragment);
