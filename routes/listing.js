// const express = require("express");
// const router = express.Router();
// const wrapAsync = require("../utils/wrapAsync.js");
// //const Listing = require("../models/listing.js");

// const {isLoggedIn,isOwner,validateListing} =  require("../middleware.js");

// const listingController = require("../controllers/listings.js");
// const multer  = require('multer');
// const{storage} = require("../cloudConfig.js");
// const upload = multer({storage});


// router
// .route("/") 
// .get( wrapAsync(listingController.index))
// .post(
//     isLoggedIn,
    
//     upload.single("listing[image]"),
//     validateListing,
//     wrapAsync(listingController.createListing));


// //New route
// router.get("/new",
//     isLoggedIn,
//     listingController.renderNewForm);
//     router.route("/:id")
// .get(wrapAsync(listingController.showListing))
// .put(isLoggedIn,
// isOwner,
// upload.single("listing[image]"),
// validateListing,
// wrapAsync(listingController.updateListing))
// .delete(
//     isLoggedIn,
//     isOwner,
//     wrapAsync(listingController.destroyListing));



// //edit route
// router.get(
//     "/:id/edit",
//     isLoggedIn,
//     isOwner,
//     wrapAsync(listingController.renderEditForm));

// module.exports = router;



// // const  mongoose = require("mongoose");
// //   const Schema = mongoose.Schema;
// //   const Review = require("./review.js");

// //   const imageSchema = new Schema({
// //     filename: String,
// //     url: String
// //   });

// //   const listingSchema = new Schema({
// //     title:{
// //         type:String,
// //         required:true,
// //     },
// //     description : String,
// //     image: {
// //         url:String,
// //         filename:String,
// //     },
// //     price: Number,
// //     location: String,
// //     country: String,
// //     reviews:[
// //       {
// //         type: Schema.Types.ObjectId,
// //         ref: "Review",
// //       },
// //     ],
// //     owner: {
// //       type: Schema.Types.ObjectId,
// //        ref: "User",
// //     },
// //   });
// // // Remove invalid review references from listings

// // listingSchema.post("findOneAndDelete",async(listing) =>{
// // if(listing){
// //   await Review.deleteMany({_id:{$in:listing.reviews}});
// // }
// // });





const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");

const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.createListing)
    );

router.get("/new", isLoggedIn, listingController.renderNewForm);

router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(
        isLoggedIn,
        isOwner,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.updateListing)
    )
    .delete(
        isLoggedIn,
        isOwner,
        wrapAsync(listingController.destroyListing)
    );

router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;
