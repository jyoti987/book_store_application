const jwt = require("jsonwebtoken");
// const bookModel = require("../Models/bookModel")
const mongoose = require("mongoose")


// =========================================== Authentication ================================

const authentication = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) return res.status(400).send({ status: false, msg: "Enter token in header" });
        jwt.verify(token, "JyotiVinayikaRajnigandha50groupsecretkey",
            function (invalidToken, decoded) {
                if (invalidToken) return res.status(401).send({ status: false, message: "Invalid token" })
                next()

            });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
};

const authorization = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]
        if (!token) return res.status(400).send({ status: false, message: "token is mandatory in header" })

        let bookId = req.params.bookId
        let isValidID = mongoose.Types.ObjectId.isValid


    if (!isValidID(bookId)) {
        return res.status(400).send({ status: false, message: "enter correct bookId" })
    }
        let BOOK = await bookModel.findOne({ _id: bookId, isDeleted: false })
        if (!BOOK) return res.status(404).send({ status: false, message: "book document not found" })
        
        let UserID = BOOK.userId

        jwt.verify(token, "JyotiVinayikaRajnigandha50groupsecretkey", function (invalidToken, validToken) {
            if (invalidToken) return res.status(401).send({ status: false, message: "Token is invalid" })
            if (validToken) {
                if (validToken.userId == UserID) {
                    next()
                } else {
                    return res.status(403).send({ status: false, message: "Unauthorised" })
                }
            }
        })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
};




module.exports = { authentication, authorization }