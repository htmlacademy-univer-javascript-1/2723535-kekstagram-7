import { resetImageEditor } from './image-editor.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadInput = document.querySelector('.img-upload__input');
const uploadCancel = document.querySelector('.img-upload__cancel');
const hashtagsField = uploadForm.querySelector('.text__hashtags');
const descriptionField = uploadForm.querySelector('.text__description');

const MAX_HASHTAGS_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_DESCRIPTION_LENGTH = 140;
const HASHTAG_PATTERN = /^#[a-zа-яё0-9]+$/i;

const getHashtags = (value) => value.trim().split(/\s+/).filter((hashtag) => hashtag.length > 0);

const isHashtagsFormatValid = (value) =>
  getHashtags(value).every((hashtag) => hashtag.length <= MAX_HASHTAG_LENGTH && HASHTAG_PATTERN.test(hashtag));

const isHashtagsCountValid = (value) => getHashtags(value).length <= MAX_HASHTAGS_COUNT;

const isHashtagsUnique = (value) => {
  const hashtags = getHashtags(value).map((hashtag) => hashtag.toLowerCase());

  return new Set(hashtags).size === hashtags.length;
};

const isDescriptionValid = (value) => value.length <= MAX_DESCRIPTION_LENGTH;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'img-upload__error',
}, false);

const validatedFields = [hashtagsField, descriptionField];

pristine.addValidator(
  hashtagsField,
  isHashtagsFormatValid,
  'Хэш-тег начинается с #, состоит из букв и чисел, не длиннее 20 символов',
);

pristine.addValidator(
  hashtagsField,
  isHashtagsCountValid,
  'Нельзя указать больше пяти хэш-тегов',
);

pristine.addValidator(
  hashtagsField,
  isHashtagsUnique,
  'Один и тот же хэш-тег нельзя использовать дважды',
);

pristine.addValidator(
  descriptionField,
  isDescriptionValid,
  'Комментарий не может быть длиннее 140 символов',
);

const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  resetImageEditor();
};

const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadForm.reset();
  uploadInput.value = '';
  pristine.reset();
  resetImageEditor();
};

const isUploadFormOpened = () => !uploadOverlay.classList.contains('hidden');

const onUploadInputChange = () => {
  openUploadForm();
};

const onUploadCancelClick = (evt) => {
  evt.preventDefault();
  closeUploadForm();
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && isUploadFormOpened()) {
    closeUploadForm();
  }
};

const onTextFieldKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

const onUploadFormSubmit = (evt) => {
  if (!pristine.validate(validatedFields)) {
    evt.preventDefault();
  }
};

const onHashtagsInput = () => {
  pristine.validate([hashtagsField]);
};

const onDescriptionInput = () => {
  pristine.validate([descriptionField]);
};

const initUploadForm = () => {
  uploadInput.addEventListener('change', onUploadInputChange);
  uploadCancel.addEventListener('click', onUploadCancelClick);
  document.addEventListener('keydown', onDocumentKeydown);
  hashtagsField.addEventListener('keydown', onTextFieldKeydown);
  descriptionField.addEventListener('keydown', onTextFieldKeydown);
  hashtagsField.addEventListener('input', onHashtagsInput);
  descriptionField.addEventListener('input', onDescriptionInput);
  uploadForm.addEventListener('submit', onUploadFormSubmit);
};

export { initUploadForm };
