const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img  img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('.social__comments');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const cancelButton = bigPicture.querySelector('#picture-cancel');

const createComment = ({ avatar, message, name }) => {
  const comment = document.createElement('li');
  const image = document.createElement('img');
  const text = document.createElement('p');

  comment.classList.add('social__comment');
  image.classList.add('social__picture');
  image.src = avatar;
  image.alt = name;
  image.setAttribute('width', '35');
  image.setAttribute('height', '35');
  text.classList.add('social__text');
  text.textContent = message;
  comment.append(image, text);

  return comment;
};

const renderComments = (comments) => {
  const commentsFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    commentsFragment.append(createComment(comment));
  });

  socialComments.replaceChildren(commentsFragment);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && !bigPicture.classList.contains('hidden')) {
    closeBigPicture();
  }
};

const renderBigPicture = (photo) => {
  bigPictureImage.src = photo.url;
  bigPictureImage.alt = photo.description;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;

  renderComments(photo.comments);

  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

cancelButton.addEventListener('click', closeBigPicture);
document.addEventListener('keydown', onDocumentKeydown);

export { renderBigPicture };
