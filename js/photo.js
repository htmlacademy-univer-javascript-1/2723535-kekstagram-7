import { PHOTOS_COUNT, MIN_LIKES, MAX_LIKES } from './data.js';
import { getRandomInteger } from './util.js';
import { createComments } from './comment.js';

const createDescription = (id) => `Фотография №${id}`;

const createPhotos = () => {
  const photosList = [];
  let commentId = 1;

  for (let i = 1; i <= PHOTOS_COUNT; i++) {
    const comments = createComments(commentId);
    commentId += comments.length;

    photosList.push({
      id: i,
      url: `photos/${i}.jpg`,
      description: createDescription(i),
      likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
      comments
    });
  }

  return photosList;
};

const photos = createPhotos();

export { photos };
