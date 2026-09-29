const PHOTOS_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const AVATAR_MIN = 1;
const AVATAR_MAX = 6;

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Артём',
  'Евгений',
  'Мария',
  'Анна',
  'Дмитрий',
  'Ольга',
  'Иван',
  'Екатерина',
  'Сергей',
  'Наталья'
];

const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomElement = (array) => array[getRandomInteger(0, array.length - 1)];

const createComment = (id) => {
  const avatarNumber = getRandomInteger(AVATAR_MIN, AVATAR_MAX);
  const messageCount = getRandomInteger(1, 2);
  const messages = [];

  for (let i = 0; i < messageCount; i++) {
    messages.push(getRandomElement(MESSAGES));
  }

  return {
    id: id,
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

const createDescription = (id) => `Фотография №${id}`;

const createPhotos = () => {
  const photos = [];
  let commentId = 1;

  for (let i = 1; i <= PHOTOS_COUNT; i++) {
    const comments = createComments(commentId);
    commentId += comments.length;

    photos.push({
      id: i,
      url: `photos/${i}.jpg`,
      description: createDescription(i),
      likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
      comments: comments
    });
  }

  return photos;
};

const photos = createPhotos();

console.log(photos);
