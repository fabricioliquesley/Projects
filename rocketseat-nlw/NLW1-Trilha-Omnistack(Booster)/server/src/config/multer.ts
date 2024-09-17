import multer from "multer";
import { resolve } from "node:path";
import { randomBytes } from "node:crypto";

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, "..", "..", "uploads"),
    filename(request, file, callback) {
      const hash = randomBytes(6).toString("hex");

      const fileName = `${hash}-${file.originalname}`;

      callback(null, fileName);
    },
  }),
};
