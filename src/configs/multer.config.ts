import { diskStorage } from 'multer';
import { extname } from 'path';

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  callback(null, `${name}-${Date.now()}${fileExtName}`);
};

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const fileOptions = {
  storage: diskStorage({
    destination: './public/userimages',
    filename: editFileName,
  }),
  fileFilter: imageFileFilter,
  limits: { fileSize: 250000 },
};
