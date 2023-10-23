const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors} = require('./seedHelpers');


 mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp',
 { useNewUrlParser: true,
  useUnifiedTopology: true});

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Database connected')
  });
const sample = array =>  array[Math.floor(Math.random() * array.length)]

  const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const price = Math.floor(Math.random()* 30) + 10;
        const random1000 = Math.floor(Math.random() * cities.length);
        const camp = new Campground({
            author: '652ceb0de60e116600ea78be',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)}, ${sample(places)}`,
            description: 'we are here to camp',
            price: price,
            geometry: {
              type: 'Point',
              coordinates: [cities[random1000].longitude, 
              cities[random1000].latitude
             ]},
            image: [
              {
               url: 'https://res.cloudinary.com/dtvkevoxx/image/upload/v1697545825/YelpCamp/deoiyrnqdxtym2ktavtd.png',
                  filename: 'YelpCamp/deoiyrnqdxtym2ktavtd',
                  
                },
                {
                  url: 'https://res.cloudinary.com/dtvkevoxx/image/upload/v1697545825/YelpCamp/x9pwwv1qdaksmnki9wk7.png',
                  filename: 'YelpCamp/x9pwwv1qdaksmnki9wk7',
                 
                }
              ]
            })
            
        await camp.save();
    }
  }
  seedDB().then(() => {

    mongoose.connection.close();
  })