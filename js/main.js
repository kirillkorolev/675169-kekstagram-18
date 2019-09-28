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

var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');

bigPicture.querySelector('.big-picture__img img').src = descriptions[0].url;
bigPicture.querySelector('.likes-count').innerHTML = descriptions[0].likes;
bigPicture.querySelector('.comments-count').innerHTML =
  descriptions[0].comments.length;

var socialComments = bigPicture.querySelector('.social__comments');

var renderComments = function (arr) {
  var commentTemplate = socialComments.children[0].cloneNode(true);
  commentTemplate.querySelector('.social__picture').src = arr.avatar;
  commentTemplate.querySelector('.social__picture').alt = arr.name;
  commentTemplate.querySelector('.social__text').textContent = arr.message;

  return commentTemplate;
};

for (i = 0; i < descriptions[0].comments.length; i++) {
  fragment.appendChild(renderComments(descriptions[0].comments[i]));
}

socialComments.replaceWith(fragment);

bigPicture
  .querySelector('.social__comment-count')
  .classList.add('visually-hidden');
bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');

bigPicture.classList.add('hidden');

var ESC_KEYCODE = 27;

var imageUpload = document.querySelector('.img-upload');
var uploadFile = imageUpload.querySelector('.img-upload__input');
var changeImagePopup = imageUpload.querySelector('.img-upload__overlay');
var closePopupButton = changeImagePopup.querySelector('.img-upload__cancel');

var onMenuEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  changeImagePopup.classList.remove('hidden');
  document.addEventListener('keydown', onMenuEscPress);
};

var closePopup = function () {
  changeImagePopup.classList.add('hidden');
  document.removeEventListener('keydown', onMenuEscPress);
};

uploadFile.addEventListener('change', openPopup);
closePopupButton.addEventListener('click', closePopup);

var radioEffects = document.querySelectorAll('.effects__radio');
var imagePreview = document.querySelector('.img-upload__preview img');

var effects = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];

for (i = 0; i < radioEffects.length; i++) {
  var effect = effects[i];
  var radio = radioEffects[i];

  radio.addEventListener('change', function () {
    imagePreview.classList.add('effects__preview--' + effect);
  });
}

var smallerButton = imageUpload.querySelector('.scale__control--smaller');
var biggerButton = imageUpload.querySelector('.scale__control--bigger');
var sizeValue = imageUpload.querySelector('.scale__control--value');

var maxValue = 100;

sizeValue.value = maxValue + '%';

biggerButton.addEventListener('click', function () {
  sizeValue.value = parseInt(sizeValue.value, 10) + 25 + '%';
});

smallerButton.addEventListener('click', function () {
  sizeValue.value = parseInt(sizeValue.value, 10) - 25 + '%';
});
