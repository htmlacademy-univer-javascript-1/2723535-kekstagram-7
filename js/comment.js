import { AVATAR_MIN, AVATAR_MAX, MESSAGES, NAMES, MIN_COMMENTS, MAX_COMMENTS } from './data.js';
import { getRandomInteger, getRandomElement } from './util.js';

const createComment = (id) => {
  const avatarNumber = getRandomInteger(AVATAR_MIN, AVATAR_MAX);
  const messageCount = getRandomInteger(1, 2);
  const messages = [];

  for (let i = 0; i < messageCount; i++) {
    messages.push(getRandomElement(MESSAGES));
  }

  return {
    id,
    avatar: `img/avatar-${avatarNumber}.svg`,
    message: messages.join(' '),
    name: getRandomElement(NAMES)
  };
};

const createComments = (startId) => {
  const commentsCount = getRandomInteger(MIN_COMMENTS, MAX_COMMENTS);
  const comments = [];

  for (let i = 0; i < commentsCount; i++) {
    comments.push(createComment(startId + i));
  }

  return comments;
};

export { createComments };
