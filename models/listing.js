  const  mongoose = require("mongoose");
  const Schema = mongoose.Schema;
  const Review = require("./review.js");

  const imageSchema = new Schema({
    filename: String,
    url: String
  });

  const listingSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description : String,
    image: {
        url:String,
        filename:String,
    },
    price: Number,
    location: String,
    country: String,
    coordinates: { // Add this field to store coordinates
      lat: Number,
      lng: Number
  },
    reviews:[
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
       ref: "User",
    },
  //  category:{
  //   type:String,
  //   enum:["mountains","arctic"..]
  //  }

  });
// Remove invalid review references from listings

listingSchema.post("findOneAndDelete",async(listing) =>{
if(listing){
  await Review.deleteMany({_id:{$in:listing.reviews}});
}
});

  const Listing = mongoose.model("Listing",listingSchema);
  module.exports = Listing;






// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const ListingSchema = new Schema({
//     title: {
//         type: String,
//         required: true,
//     },
//     price: {
//         type: Number,
//         required: true,
//     },
//     description: {
//         type: String,
//         required: true,
//     },
//     location: {
//         type: String,
//         required: true,
//     },
//     image: {
//         url: String,
//         filename: String,
//     },
//     owner: {
//         type: Schema.Types.ObjectId,
//         ref: "User",
//     },
// });

// module.exports = mongoose.model("Listing", ListingSchema);

