const express = require('express');
const router = new express.Router()
const multer = require('multer');
const path = require('path');
const authGurad = require('../middlewares/authGuard');
const roleGuard = require("../middlewares/roleGuard");
const controller = require('../controllers/articles');

// const storage = multer.diskStorage({
//     destination: (req , file, cb) => {
//         cb(null, path.join("..", "public", "images", "article_cover"));
//     },
//     filename: (req, file , cb) => {
//         const filename = `${file.originalname}${Date.now()}${path.extname(file.originalname)}`
//         cb(null , filename)
//     }
// })

// const fileFilter = (req , file , cb) => {
//     const validTypes = /jpeg|png|jpg|webp/
//     const mimeType = validTypes.test(file.mimetype)
//     const extName = validTypes.test(path.extname(file.originalname))

//     if(mimeType && extName){
//         return cb(null , true)
//     }

//     return cb(new Error("File type is not valid !!"))
// }

// const uploader = multer({
//     storage,
//     fileFilter,
//     limits: {fileSize: 3*1024*1024}
// })

router
  .route("/")
  .post(authGurad, roleGuard("admin" || "author"), controller.createArticle)
  .get(controller.getAllArticles)
  .delete(authGurad, roleGuard("admin" || "author"), controller.removeArticle);

router.route('/:slug').get(controller.getOneArticleBySlug)

router.route("/popular").get(controller.getPopularArticles);




module.exports = router