const express = require("express");
const router = express.Router();
const userController = require("../Conrollers/userController")
const bookController = require("../Conrollers/bookController")
// const reviewController = require("../controller/reviewController")
const Middleware = require("../Middleware/Auth")


// ====================== Register  API ====================
router.post("/addAuthor",userController.createUser)  

// // ====================== Login API ====================
router.post("/login",userController.loginUser)

// //(Books Apis)
// // ====================== Create Book API ====================
router.post ("/books", Middleware.authentication, bookController.createBook)  


// // ====================== Get Book API ======================
// router.get ("/books", Middleware.authentication, bookController.getBooks) 


// // ====================== Get Books by Book ID API ====================
// router.get ("/books/:bookId", Middleware.authentication, bookController.getBooksbyId) 


// // ====================== Update Books by Book id API ====================
// router.put("/books/:bookId",  Middleware.authorization, bookController.updateBook) 


// // ====================== Delete Book by book id API ====================
// router.delete ("/books/:bookId",  Middleware.authorization, bookController.deleteBookById) 

// //(Reviews Apis)
// //============================= Add review api by books and book id ===========================
// router.post("/books/:bookId/review", reviewController.addReview) 


// //================================ Update Review by books and book id =============================
// router.put("/books/:bookId/review/:reviewId", reviewController.updateReview) 


// //================================ Delete Review by books and book id =============================
// router.delete("/books/:bookId/review/:reviewId", reviewController.deletedReview) 


router.all("/*", (req,res)=>{
    return res.status(400).send({status:false, message:"Path not found"})
})


module.exports = router;