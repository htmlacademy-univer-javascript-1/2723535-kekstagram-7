import { photos } from './photo.js';
import { renderPictures } from './pictures.js';
import { initUploadForm } from './upload-form.js';
import { initImageEditor } from './image-editor.js';

renderPictures(photos);
initImageEditor();
initUploadForm();
