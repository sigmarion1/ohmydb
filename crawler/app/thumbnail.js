const sharp = require("sharp");
const path = require("path");

const thm_width = 500;

const makeThumbnail = (image_path, image_name) => {
  return new Promise((resolve, rejects) => {
    const image_path_ori = path.join(image_path, image_name);

    const image_name_wo_ext = image_name.split(".")[0];
    const image_thm_name = "thm_" + image_name_wo_ext + ".jpg";

    const image_path_thm = path.join(image_path, image_thm_name);

    sharp(image_path_ori)
      .resize(thm_width)
      .toFile(image_path_thm, (err, info) => {
        if (err) {
          rejects(err);
        } else {
          resolve(image_path_thm);
        }
      });
  });
};

// (async () => {
//   await makeThumbnail("sample/4.jpg");
// })();

module.exports = makeThumbnail;
