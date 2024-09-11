// const mongoose = require('mongoose');

// const Listing = require("./models/listing");
// const Review = require("./models/review");
// const ExpressError = require("./utils/ExpressError.js");
// const { listingSchema,reviewSchema} = require("./schema.js"); 



//  module.exports.isLoggedIn = (req,res,next)=>{
//     if(!req.isAuthenticated()){
//         //redirecturl save
//         req.session.redirectUrl = req.originalUrl;
//         req.flash("error","you must be logged in to create listing!");
//         return res.redirect("/login");
//        }
//     next();

//  };

//  module.exports.saveRedirectUrl = (req,res,next) =>{
//     if(req.session.redirectUrl){
//         res.locals.redirectUrl = req.session.redirectUrl;
//     }
//     next();
//  };

// //  module.exports.isOwner = async(req,res,next) =>{
// //    let {id} = req.params;
// //    id=id.trim();
// //     let listing = await Listing.findById(id);
// //     if(!listing.owner.equals(res.user._iduser._id)){
// //         req.flash("error","you are not the owner of this listing");
// //         return res.redirect(`/listings/${id}`);
// //     }
// //     next();
// //  };

// module.exports.isOwner = async (req, res, next) => {
//    let { id } = req.params;
//    id = id.trim(); // Trim any leading or trailing spaces

//    // Validate ObjectId
//    if (!mongoose.Types.ObjectId.isValid(id)) {
//        req.flash("error", "Invalid listing ID");
//        return res.redirect("/listings");
//    }

//    try {
//        let listing = await Listing.findById(id);

//        if (!listing) {
//            req.flash("error", "Listing not found");
//            return res.redirect("/listings");
//        }

//        if (!listing.owner.equals(req.user._id)) { // Correctly use req.user._id
//            req.flash("error", "You are not the owner of this listing");
//            return res.redirect(`/listings/${id}`);
//        }

//        next();
//    } catch (err) {
//        next(err); // Pass errors to the error handler
//    }
// };

//  module.exports.validateListing = (req,res,next) =>{
//    let { error } =  listingSchema.validate(req.body);
   
//       if(error){
//        let errMsg = error.details.map((el) => el.message).join(",");
//        throw new ExpressError(400, errMsg);
//       } else{
//        next();
//       }
//    };

//    module.exports.validateReview = (req,res,next) =>{
//       let { error } =  reviewSchema.validate(req.body);
      
//          if(error){
//           let errMsg = error.details.map((el) => el.message).join(",");
//           throw new ExpressError(400, errMsg);
//          } else{
//           next();
//          }
//       };


      
//  module.exports.isReviewAuthor = async(req,res,next) =>{
//    let {id,reviewId} = req.params;
//    id = id.trim(); // Trim any leading or trailing spaces
//    reviewId = reviewId.trim();
//     let review = await Review.findById(reviewId);
//     if(!review.author.equals(res.locals.currUser._id)){
//         req.flash("error","you are not the author of this listing");
//        return  res.redirect(`/listings/${id}`);
//     }
//     next();
//  };


const mongoose = require('mongoose');
const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js"); 

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create listing!");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

// module.exports.isOwner = async (req, res, next) => {
//     let {id} = req.params;
//     let listing = await Listing.findById(id);
//     if(!listing.owner.equals(res.locals.currUser._id)){
//         req.flash("error","you are not the owner of this listing");
//         return  res.redirect(`/listings/${id}`);
//     }
//     next();
// };

module.exports.isOwner = async (req, res, next) => {
    try {
        const id = req.params.id.trim();  // Trim the ID before using it
        const listing = await Listing.findById(id);

        if (!listing) {
            req.flash("error", "Listing not found");
            return res.redirect("/listings");
        }

        if (!listing.owner.equals(res.locals.currUser._id)) {
            req.flash("error", "You are not the owner of this listing");
            return res.redirect(`/listings/${id}`);
        }

        next();
    } catch (error) {
        console.error(error);
        req.flash("error", "Something went wrong");
        return res.redirect("/listings");
    }
};


// module.exports.isOwner = async function(req, res, next) {
//     try {
//         const id = req.params.id.trim();  // Trim the ID before using it
//         const listing = await Listing.findById(id);
//         if (!listing) {
//             return res.status(404).send("Listing not found");
//         }
//         // Additional logic for checking ownership
//         next();
//     } catch (error) {
//         next(error);
//     }
// };


module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);

    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);

    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    id = id.trim(); // Trim any leading or trailing spaces
    reviewId = reviewId.trim(); // Trim any leading or trailing spaces

    // Validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(reviewId)) {
        req.flash("error", "Invalid ID format");
        return res.redirect(`/listings/${id}`);
    }

    try {
        let review = await Review.findById(reviewId);

        if (!review) {
            req.flash("error", "Review not found");
            return res.redirect(`/listings/${id}`);
        }

        if (!review.author.equals(req.user._id)) {
            req.flash("error", "You are not the author of this review");
            return res.redirect(`/listings/${id}`);
        }

        next();
    } catch (err) {
        next(err); // Pass errors to the error handler
    }
};
