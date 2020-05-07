const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');

// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })

  .then(() => {
    // Run your code here, after you have insured that the connection was made
    console.log('Cleaned MongoDB');

    //Adding a new recipe document to the database by calling the Model.create static
    return Recipe.create({
      title: 'Veggie Pasta',
      level: 'Easy Peasy',
      ingredients: [
        'wholegrain pasta',
        'broccoli',
        'basil',
        'cherry tomatoes',
        'olive oil',
        'salt',
        'pepper',
      ],
      cuisine: 'Italian',
      dishType: 'main_course',
      duration: 25,
      creator: 'Jamie Oliver',
    });
  })
  .then((recipe) => {
    //console.log('Recipe was created', recipe);

    return Recipe.insertMany(data);
  })

  .then((recipesArray) => {
    //console.log('Adding all recipes from array: ', recipesArray);

    return Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 }
    );
  })

  .then((update) => {
    console.log('Rigatoni recipe was successfully updated: ', update);

    Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then(() => {
    console.log('The Carrot Cake recipe was successfully deleted');

    return mongoose.disconnect();
  })
  .then(() => {
    console.log('Disconnected from MongoDB');
  })

  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
