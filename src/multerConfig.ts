import multer from "multer";
/* import path from 'path';


export const storage = multer.diskStorage({
  destination: async (req, file, callback) => {
     callback(null, path.resolve("uploads"));
  },
  filename: async (req, file, callback) => {
    const time = new Date().getTime();

    callback(null, `${time}_${file.originalname}`);
  },
}) */