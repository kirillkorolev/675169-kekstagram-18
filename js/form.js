'use strict';

(function () {
  var imageUpload = document.querySelector('.img-upload');
  var uploadFile = imageUpload.querySelector('.img-upload__input');
  var changeImagePopup = imageUpload.querySelector('.img-upload__overlay');
  var closePopupButton = changeImagePopup.querySelector('.img-upload__cancel');
  var sliderBlock = imageUpload.querySelector('.img-upload__effect-level');

  var onMenuEscPress = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      closePopup();
    }
  };

  var openPopup = function () {
    changeImagePopup.classList.remove('hidden');
    sliderBlock.classList.add('hidden');
    document.addEventListener('keydown', onMenuEscPress);
  };

  var closePopup = function () {
    changeImagePopup.classList.add('hidden');
    document.removeEventListener('keydown', onMenuEscPress);
    imagePreview.className = '';
    imagePreview.classList.add('effects__preview--none');
  };

  uploadFile.addEventListener('change', openPopup);
  closePopupButton.addEventListener('click', closePopup);

  var radioEffects = document.querySelectorAll('.effects__radio');
  var imagePreview = document.querySelector('.img-upload__preview img');

  var sliderPin = imageUpload.querySelector('.effect-level__pin');
  var slider = imageUpload.querySelector('.effect-level__line');
  var sliderDepth = imageUpload.querySelector('.effect-level__depth');

  var effects = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];

  for (var i = 0; i < radioEffects.length; i++) {
    var radio = radioEffects[i];

    radio.addEventListener(
        'change',
        function (index) {
          sliderBlock.classList.remove('hidden');

          var max = slider.offsetWidth + 'px';
          sliderPin.style.left = max;
          sliderDepth.style.width = 100 + '%';

          var effect = effects[index];
          imagePreview.className = '';
          imagePreview.classList.add('effects__preview--' + effect);

          var intensity = 100;

          switch (imagePreview.className) {
            case 'effects__preview--chrome':
              imagePreview.style.filter = 'grayscale(' + intensity / 100;
              break;

            case 'effects__preview--sepia':
              imagePreview.style.filter = 'sepia(' + intensity / 100;
              break;

            case 'effects__preview--marvin':
              imagePreview.style.filter = 'invert(' + intensity + '%)';
              break;

            case 'effects__preview--phobos':
              imagePreview.style.filter = 'blur(' + (intensity * 5) / 100 + 'px)';
              break;

            case 'effects__preview--heat':
              imagePreview.style.filter = 'brightness(' + (intensity * 3) / 100;
              break;
            case 'effects__preview--none':
              imagePreview.style.filter = '';
              break;
          }
        }.bind(null, i)
    );
  }

  sliderPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX + sliderPin.offsetWidth / 2
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      var pinPosition = sliderPin.offsetLeft - shift.x;

      if (pinPosition < 0) {
        pinPosition = 0;
      } else if (pinPosition > slider.offsetWidth) {
        pinPosition = slider.offsetWidth;
      }

      sliderPin.style.left = pinPosition + 'px';

      var intensity = Math.round((pinPosition * 100) / slider.offsetWidth);
      sliderDepth.style.width = intensity + '%';

      switch (imagePreview.className) {
        case 'effects__preview--chrome':
          imagePreview.style.filter = 'grayscale(' + intensity / 100;
          break;

        case 'effects__preview--sepia':
          imagePreview.style.filter = 'sepia(' + intensity / 100;
          break;

        case 'effects__preview--marvin':
          imagePreview.style.filter = 'invert(' + intensity + '%)';
          break;

        case 'effects__preview--phobos':
          imagePreview.style.filter = 'blur(' + (intensity * 5) / 100 + 'px)';
          break;

        case 'effects__preview--heat':
          imagePreview.style.filter = 'brightness(' + (intensity * 3) / 100;
          break;
        case 'effects__preview--none':
          imagePreview.style.filter = '';
          break;
      }

      startCoords = {
        x: moveEvt.clientX
      };
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var smallerButton = imageUpload.querySelector('.scale__control--smaller');
  var biggerButton = imageUpload.querySelector('.scale__control--bigger');
  var sizeValue = imageUpload.querySelector('.scale__control--value');

  var maxValue = 100;
  var minValue = 25;

  sizeValue.value = '100%';

  biggerButton.addEventListener('click', function () {
    sizeValue.value = parseInt(sizeValue.value, 10) + 25;
    sizeValue.value =
      sizeValue.value <= maxValue ? sizeValue.value + '%' : 100 + '%';

    imagePreview.style.transform =
      'scale(' + parseInt(sizeValue.value, 10) / 100 + ')';
  });

  smallerButton.addEventListener('click', function () {
    sizeValue.value = parseInt(sizeValue.value, 10) - 25;
    if (sizeValue.value >= minValue) {
      sizeValue.value = sizeValue.value + '%';
    } else {
      sizeValue.value = 25 + '%';
    }
    imagePreview.style.transform =
      'scale(' + parseInt(sizeValue.value, 10) / 100 + ')';
  });

  var inputHashTag = imageUpload.querySelector('.text__hashtags');

  var isUniqArray = function (arr) {
    for (i = 0; i < arr.length; i++) {
      for (var j = i + 1; j < arr.length; j++) {
        if (arr[i] === arr[j]) {
          return false;
        }
      }
    }
    return true;
  };

  var hasHashtag = function (str) {
    return str.lastIndexOf('#') === 0;
  };

  var isArrayHashTags = function (arr) {
    return arr.every(hasHashtag);
  };

  inputHashTag.addEventListener('input', function () {
    inputHashTag.setCustomValidity('');

    var inputArr = inputHashTag.value
      .toLowerCase()
      .trim()
      .split(' ');

    if (inputArr.length > 5) {
      inputHashTag.setCustomValidity('слишком много хэштегов');
      return;
    }

    if (isArrayHashTags(inputArr) === false) {
      inputHashTag.setCustomValidity('хэштег должен начинать с #');
      return;
    }

    if (inputArr.length > 1) {
      if (isUniqArray(inputArr) === false) {
        inputHashTag.setCustomValidity('хэштеги повторяются');
      }
    }

    for (i = 0; i < inputArr.length; i++) {
      var hashTag = inputArr[i];

      if (hashTag.length > 20) {
        inputHashTag.setCustomValidity('слишком длинный хэштег');
        return;
      }
    }
  });

  var textInput = imageUpload.querySelector('.text__description');

  var onFocusNotCloseMenu = function (input) {
    input.addEventListener('focus', function () {
      document.removeEventListener('keydown', onMenuEscPress);
    });
  };

  onFocusNotCloseMenu(inputHashTag);
  onFocusNotCloseMenu(textInput);

  var form = document.querySelector('.img-upload__form');

  // var error = document.querySelector('.error');

  // var errorCloseButton = document.querySelector('.error__button');

  var onMessageEscPress = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      closeMessage();
    }
  };

  var closeMessage = function (block) {
    block.remove();
    document.removeEventListener('keydown', onMessageEscPress);
  };

  var closeMessageOnButton = function (buttonSelector, selector) {
    var block = document.querySelector(selector);
    var button = block.querySelector(buttonSelector);
    block.remove();
    button.addEventListener('click', closeMessage);
  };

  var showMessage = function (selector) {
    var main = document.querySelector('main');
    var template = document.querySelector(selector).content.cloneNode(true);
    main.appendChild(template);
    document.addEventListener('keydown', onMessageEscPress);
  };

  var onSuccessHandler = function () {
    changeImagePopup.classList.add('hidden');
    showMessage('#success');

    closeMessageOnButton('.success__button', '.success');
  };

  var errorHandler = function () {
    changeImagePopup.classList.add('hidden');
    showMessage('#error');

    closeMessageOnButton('.error__button', '.error');
  };

  form.addEventListener('submit', function (evt) {
    window.publish(new FormData(form), onSuccessHandler, errorHandler);
    evt.preventDefault();
  });
})();
