const mongoose = require('mongoose');
const Listing = require("../models/listing");


module.exports.index = async(req, res) => { 
    const allListings = await Listing.find({});
    res.render('listings/index', { allListings });

};

module.exports.renderNewForm =(req,res) =>{
 
    res.render("listings/new.ejs");
};

module.exports.showListing =async(req,res) =>{
    let {id} = req.params;

    const listing = await Listing.findById(id)
    .populate({
        path:"reviews",
        populate:{
            path:"author",
        },
    })
    .populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does not exit!");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{listing});
};

module.exports.createListing =async (req,res,next) =>{
  let url= req.file.path;
  let filename = req.file.filename;
 
  
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    
    newListing.image = {url,filename};
      await newListing.save();
      req.flash("success","New Listing Created");
      res.redirect("/listings");
      };

 module.exports.renderEditForm = async (req,res) =>{
        let {id} = req.params;
        const listing = await Listing.findById(id);
        if(!listing){
            req.flash("error","Listing you requested for does not exit!");
            res.redirect("/listings");
        } 
       let originalImageUrl=listing.image.url;
       originalImageUrl=originalImageUrl.replace("/upload","/upload/w_250");

        res.render("listings/edit.ejs",{listing,originalImageUrl});  
    };

    module.exports.updateListing=async(req,res) =>{
        let {id} = req.params; 
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
   
    if(typeof req.file !=="undefined"){
    let url= req.file.path;
    let filename = req.file.filename;
    listing.image = { url,filename };
    await listing.save();
    }
    req.flash("success" ,"Listing updated!");
    res.redirect(`/listings/${id}`);
    
};

// module.exports.destroyListing= async(req,res)=>{
//     let {id} = req.params; 

// let deletedListing = await Listing.findByIdAndDelete(id);
// console.log(deletedListing);
// req.flash("success","Listing Deleted");
// res.redirect("/listings");

// };

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    // Trim any extra spaces from the ID
    id = id.trim();
    // Try to find and delete the listing
    try {
        let deletedListing = await Listing.findByIdAndDelete(id);
        if (!deletedListing) {
            req.flash("error", "Listing not found");
            return res.redirect("/listings");
        }
        req.flash("success", "Listing Deleted");
        res.redirect("/listings");
    } catch (error) {
        console.error(error);
        req.flash("error", "An error occurred while deleting the listing");
        res.redirect("/listings");
    }
};


// const Listing = require("../models/listing");
// const Listing = require("../models/listing");

// module.exports.index = async (req, res) => {
//     // Fetch all listings from the database
//     // const listings = await Listing.find({});
//     // res.render("listings/index", { listings });

//     try {
//         const allListings = await Listing.find({});
//         res.render('listings/index', { allListings });
//     } catch (e) {
//         console.error(e);
//         req.flash('error', 'Something went wrong.');
//         res.redirect('/');
//     }
// };

// module.exports.renderNewForm = (req, res) => {
//     // Render the form to create a new listing
//     res.render("listings/new");
// };

// module.exports.createListing = async (req, res, next) => {
//     // Create a new listing
//     let url = req.file.path;
//     let filename = req.file.filename;

//     try {
//         const newListing = new Listing(req.body.listing);
//         newListing.owner = req.user._id;
//         newListing.image = { url, filename };
//         newListing.location = req.body.listing.location;

//         await newListing.save();
//         req.flash("success", "New Listing Created");
//         res.redirect("/listings");
//     } catch (err) {
//         console.error(err);
//         req.flash("error", "Failed to create listing. Please try again.");
//         res.redirect("/listings/new");
//     }
// };

// module.exports.showListing = async (req, res) => {
//     const { id } = req.params;
//     const listing = await Listing.findById(id).populate("owner");
//     if (!listing) {
//         req.flash("error", "Listing not found");
//         return res.redirect("/listings");
//     }
//     res.render("listings/show", { listing });
// };

// module.exports.renderEditForm = async (req, res) => {
//     const { id } = req.params;
//     const listing = await Listing.findById(id);
//     if (!listing) {
//         req.flash("error", "Listing not found");
//         return res.redirect("/listings");
//     }
//     res.render("listings/edit", { listing });
// };

// module.exports.updateListing = async (req, res) => {
//     const { id } = req.params;
//     const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//     if (req.file) {
//         listing.image.url = req.file.path;
//         listing.image.filename = req.file.filename;
//     }
//     await listing.save();
//     req.flash("success", "Listing updated successfully");
//     res.redirect(`/listings/${listing._id}`);
// };

// module.exports.destroyListing = async (req, res) => {
//     const { id } = req.params;
//     await Listing.findByIdAndDelete(id);
//     req.flash("success", "Listing deleted successfully");
//     res.redirect("/listings");
// };


