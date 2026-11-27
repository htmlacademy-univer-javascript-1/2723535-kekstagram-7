const uploadPreview = document.querySelector('.img-upload__preview');
const previewImage = uploadPreview.querySelector('img');
const scaleValue = document.querySelector('.scale__control--value');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const effectsList = document.querySelector('.img-upload__effects');
const effectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.effect-level__slider');

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const EFFECTS = {
  none: {
    min: 0,
    max: 100,
    step: 1,
    filter: () => '',
  },
  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
    filter: (value) => `grayscale(${value})`,
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    filter: (value) => `sepia(${value})`,
  },
  marvin: {
    min: 0,
    max: 100,
    step: 1,
    filter: (value) => `invert(${value}%)`,
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    filter: (value) => `blur(${value}px)`,
  },
  heat: {
    min: 1,
    max: 3,
    step: 0.1,
    filter: (value) => `brightness(${value})`,
  },
};

let currentEffect = 'none';
let slider = null;

const getScale = () => parseInt(scaleValue.value, 10);

const setScale = (value) => {
  const scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, value));

  scaleValue.value = `${scale}%`;
  previewImage.style.transform = `scale(${scale / 100})`;
};

const onScaleSmallerClick = () => {
  setScale(getScale() - SCALE_STEP);
};

const onScaleBiggerClick = () => {
  setScale(getScale() + SCALE_STEP);
};

const destroySlider = () => {
  if (slider !== null) {
    slider.noUiSlider.destroy();
    slider = null;
  }
};

const updateEffectLevel = (value) => {
  effectLevelValue.value = value;
  previewImage.style.filter = EFFECTS[currentEffect].filter(value);
};

const setEffect = (name) => {
  currentEffect = name;

  destroySlider();

  if (name === 'none') {
    effectLevel.classList.add('hidden');
    effectLevelValue.value = '';
    previewImage.style.filter = '';
    return;
  }

  const { min, max, step } = EFFECTS[name];

  effectLevel.classList.remove('hidden');

  noUiSlider.create(sliderElement, {
    range: { min, max },
    start: max,
    step,
    connect: [true, false],
  });

  slider = sliderElement;
  slider.noUiSlider.on('update', () => {
    updateEffectLevel(Number(slider.noUiSlider.get()));
  });
};

const onEffectsChange = (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    setEffect(evt.target.value);
  }
};

const resetImageEditor = () => {
  scaleValue.value = `${DEFAULT_SCALE}%`;
  previewImage.style.transform = '';

  const originalEffect = effectsList.querySelector('#effect-none');
  originalEffect.checked = true;
  setEffect('none');
};

const initImageEditor = () => {
  scaleSmaller.addEventListener('click', onScaleSmallerClick);
  scaleBigger.addEventListener('click', onScaleBiggerClick);
  effectsList.addEventListener('change', onEffectsChange);
  resetImageEditor();
};

export { initImageEditor, resetImageEditor };
