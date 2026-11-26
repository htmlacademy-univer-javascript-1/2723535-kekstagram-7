import { renderBigPicture } from './big-picture.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

let currentPhotos = [];

const createPicture = ({ id, url, description, likes, comments }) => {
  const picture = pictureTemplate.cloneNode(true);
  const image = picture.querySelector('.picture__img');

  picture.dataset.id = id;
  image.src = url;
  image.alt = description;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comments.length;

  return picture;
};

const renderPictures = (photos) => {
  const picturesFragment = document.createDocumentFragment();

  currentPhotos = photos;

  photos.forEach((photo) => {
    picturesFragment.append(createPicture(photo));
  });

  picturesContainer.append(picturesFragment);
};

const onPicturesContainerClick = (evt) => {
  const picture = evt.target.closest('.picture');

  if (!picture) {
    return;
  }

  evt.preventDefault();

  const photo = currentPhotos.find((item) => String(item.id) === picture.dataset.id);

  if (photo) {
    renderBigPicture(photo);
  }
};

picturesContainer.addEventListener('click', onPicturesContainerClick);

export { renderPictures };
