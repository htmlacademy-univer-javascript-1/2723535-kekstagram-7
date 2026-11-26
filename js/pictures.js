const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const createPicture = ({ url, description, likes, comments }) => {
  const picture = pictureTemplate.cloneNode(true);
  const image = picture.querySelector('.picture__img');

  image.src = url;
  image.alt = description;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comments.length;

  return picture;
};

const renderPictures = (photos) => {
  const picturesFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    picturesFragment.append(createPicture(photo));
  });

  picturesContainer.append(picturesFragment);
};

export { renderPictures };
