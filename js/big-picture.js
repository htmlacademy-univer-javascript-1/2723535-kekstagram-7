const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img  img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const commentsCountBlock = bigPicture.querySelector('.social__comment-count');
const socialComments = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const cancelButton = bigPicture.querySelector('#picture-cancel');

const COMMENTS_PORTION = 5;

let comments = [];
let shownCommentsCount = 0;

const createComment = ({ avatar, message, name }) => {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');

  const image = document.createElement('img');
  image.classList.add('social__picture');
  image.src = avatar;
  image.alt = name;
  image.width = 35;
  image.height = 35;

  const text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = message;

  comment.append(image, text);

  return comment;
};

const renderCommentsCount = () => {
  const counter = document.createElement('span');
  counter.classList.add('comments-count');
  counter.textContent = comments.length;

  commentsCountBlock.replaceChildren(
    `${shownCommentsCount} из `,
    counter,
    ' комментариев'
  );
};

const renderCommentsPortion = () => {
  const portion = comments.slice(shownCommentsCount, shownCommentsCount + COMMENTS_PORTION);
  const fragment = document.createDocumentFragment();

  portion.forEach((comment) => fragment.append(createComment(comment)));

  socialComments.append(fragment);
  shownCommentsCount += portion.length;

  renderCommentsCount();
  commentsLoader.classList.toggle('hidden', shownCommentsCount >= comments.length);
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
  comments = photo.comments;
  shownCommentsCount = 0;

  bigPictureImage.src = photo.url;
  bigPictureImage.alt = photo.description;
  likesCount.textContent = photo.likes;
  socialCaption.textContent = photo.description;

  socialComments.replaceChildren();
  renderCommentsPortion();

  commentsCountBlock.classList.remove('hidden');

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

cancelButton.addEventListener('click', closeBigPicture);
commentsLoader.addEventListener('click', renderCommentsPortion);
document.addEventListener('keydown', onDocumentKeydown);

export { renderBigPicture };
