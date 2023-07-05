const mongoose = require('mongoose');
const cities = require('./cities');
const {places,descriptors}= require('./seedHelpers');
const Campground = require('../models/campground');

//connecting mongoose
mongoose.set('strictQuery', true);
main().catch(err => {
    console.log(err);
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
  console.log("Database Connected");
}

const sample = (array) => array[Math.floor(Math.random() * array.length)]; //we passa ny array and then a random element is selected form it

const seedDB = async ()=>{
    await Campground.deleteMany({});
    for(let i=0;i<300;i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //Your User Id
            author: '6467102627c76b3b8f60e943',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, repellendus doloribus. Voluptates laboriosam eveniet sit iure accusamus iusto fugiat nisi corporis rerum. Eveniet enim laboriosam culpa dolorum veritatis architecto consectetur.',
            price,
            geometry: { 
                type: 'Point', 
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ] 
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dk8h5rpgt/image/upload/v1688419062/YelpCamp/b6kle5bo7h4bgselorj4.jpg',
                  filename: 'YelpCamp/b6kle5bo7h4bgselorj4',
                },
                {
                  url: 'https://res.cloudinary.com/dk8h5rpgt/image/upload/v1688419072/YelpCamp/n5c7hmxvui3h27dwxbp7.jpg',
                  filename: 'YelpCamp/n5c7hmxvui3h27dwxbp7',
                }
              ]
        })  
        await camp.save();
    }
}

seedDB().then(() =>{
    mongoose.connection.close();
})