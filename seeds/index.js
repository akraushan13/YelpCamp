const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() *20) +10;
    const camp = new Campground({
      author: "6286a8c5a7af6418182f2642",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium natus, deleniti architecto debitis consectetur nobis! Unde neque incidunt, libero id itaque beatae in culpa delectus, sapiente animi odio officia ex.",
      price,
      images: [
        {
          url: 'https://res.cloudinary.com/ddzwyd7ik/image/upload/v1653138735/YelpCamp/v56u5eikdsiegrfmlwbi.jpg',
          filename: 'YelpCamp/v56u5eikdsiegrfmlwbi'
        },
        {
          url: 'https://res.cloudinary.com/ddzwyd7ik/image/upload/v1653138734/YelpCamp/smizr3nv3kyxmf1au0vl.jpg',
          filename: 'YelpCamp/smizr3nv3kyxmf1au0vl'
        },        
      ]
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
});


