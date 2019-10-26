'use strict';

(function () {
  var imageUpload = document.querySelector('.img-upload');
  var uploadFile = imageUpload.querySelector('.img-upload__input');
  var changeImagePopup = imageUpload.querySelector('.img-upload__overlay');
  var closePopupButton = changeImagePopup.querySelector('.img-upload__cancel');
  var sliderBlock = imageUpload.querySelector('.img-upload__effect-level');
  var radioEffects = document.querySelectorAll('.effects__radio');
  var imagePreview = document.querySelector('.img-upload__preview img');
  var sliderPin = imageUpload.querySelector('.effect-level__pin');
  var slider = imageUpload.querySelector('.effect-level__line');
  var sliderDepth = imageUpload.querySelector('.effect-level__depth');
  var effects = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];
  var smallerButton = imageUpload.querySelector('.scale__control--smaller');
  var biggerButton = imageUpload.querySelector('.scale__control--bigger');
  var sizeValue = imageUpload.querySelector('.scale__control--value');
  var textInput = imageUpload.querySelector('.text__description');
  var form = document.querySelector('.img-upload__form');
  var inputHashTag = imageUpload.querySelector('.text__hashtags');
  var fileChooser = imageUpload.querySelector('#upload-file');

  var onMenuEscPress = function (evt) {
    if (evt.keyCode === window.constants.ESC_KEYCODE) {
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
    resetForm();
  };

  uploadFile.addEventListener('change', openPopup);
  closePopupButton.addEventListener('click', closePopup);

  var setFilter = function (intenseness) {
    switch (imagePreview.className) {
      case 'effects__preview--chrome':
        imagePreview.style.filter = 'grayscale(1)';
        imagePreview.style.filter = 'grayscale(' + intenseness / 100 + ')';
        break;

      case 'effects__preview--sepia':
        imagePreview.style.filter = 'sepia(1)';
        imagePreview.style.filter = 'sepia(' + intenseness / 100 + ')';
        break;

      case 'effects__preview--marvin':
        imagePreview.style.filter = 'invert(100%)';
        imagePreview.style.filter = 'invert(' + intenseness + '%)';
        break;

      case 'effects__preview--phobos':
        imagePreview.style.filter = 'blur(5px)';
        imagePreview.style.filter = 'blur(' + (intenseness * 5) / 100 + 'px)';
        break;

      case 'effects__preview--heat':
        imagePreview.style.filter = 'brightness(3)';
        imagePreview.style.filter =
          'brightness(' + (intenseness * 3) / 100 + ')';
        break;
      case 'effects__preview--none':
        imagePreview.style.filter = '';
        sliderBlock.classList.add('hidden');
        break;
    }
  };

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

          setFilter();
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

      setFilter(intensity);

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

  biggerButton.addEventListener('click', function () {
    sizeValue.value =
      parseInt(sizeValue.value, 10) + window.constants.SHIFT_PERCENT;
    sizeValue.value =
      sizeValue.value <= window.constants.MAX_PERCENT
        ? sizeValue.value + '%'
        : 100 + '%';

    imagePreview.style.transform =
      'scale(' + parseInt(sizeValue.value, 10) / 100 + ')';
  });

  smallerButton.addEventListener('click', function () {
    sizeValue.value =
      parseInt(sizeValue.value, 10) - window.constants.SHIFT_PERCENT;
    if (sizeValue.value >= window.constants.MIN_PERCENT) {
      sizeValue.value = sizeValue.value + '%';
    } else {
      sizeValue.value = window.constants.MIN_PERCENT + '%';
    }
    imagePreview.style.transform =
      'scale(' + parseInt(sizeValue.value, 10) / 100 + ')';
  });

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
      if (window.data.isUniqArray(inputArr) === false) {
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

  var onFocusNotCloseMenu = function (input) {
    input.addEventListener('focus', function () {
      document.removeEventListener('keydown', onMenuEscPress);
    });
  };

  onFocusNotCloseMenu(inputHashTag);
  onFocusNotCloseMenu(textInput);

  var resetForm = function () {
    inputHashTag.value = '';
    textInput.value = '';
    sizeValue.value = '100%';
    imagePreview.src = 'img/upload-default-image.jpg';
    imagePreview.style = '';
    imagePreview.classList = '';
    imagePreview.classList.add('effects__preview--none');
  };

  var onSuccessHandler = function () {
    changeImagePopup.classList.add('hidden');
    window.data.showMessage('#success');
    resetForm();
    window.data.closeMessageOnButton('.success__button', '.success');
  };

  var errorHandler = function () {
    changeImagePopup.classList.add('hidden');
    window.data.showMessage('#error');
    resetForm();
    window.data.closeMessageOnButton('.error__button', '.error');
  };

  form.addEventListener('submit', function (evt) {
    window.backend.publish(new FormData(form), onSuccessHandler, errorHandler);
    evt.preventDefault();
  });

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = window.constants.FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imagePreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  window.form = {
    errorHandler: errorHandler
  };
})();
