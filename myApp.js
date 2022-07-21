require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);//, { useNewUrlParser: true, useUnifiedTopology: true });

//create schema
const personSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
})
//create model
const Person = mongoose.model("Person", personSchema);



const createAndSavePerson = (done) => {
    let janeFonda = new Person({name: "Jane Fonda", age: 84, favoriteFoods: ["eggs", "fish", "fresh fruit"]});

  janeFonda.save(function(err,data){
    if(err) return console.error(err);
    done(null , data);
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, people){
if (err) return console.log(err);
    done(null , people);
    
  })
};

const findPeopleByName = (personName, done) => {Person.find({name: personName}, function(err, personFound){
  if(err) return console.log(err);
  console.log(personFound);
  done(null , personFound);
}) 
};

const findOneByFood = (food, done) => { Person.findOne({favoriteFoods:food}, function(err,personFound){
  if (err) return console.log(err);
  console.log(personFound);
  done(null , personFound);
})};

const findPersonById = (personId, done) => { Person.findById({_id:personId}, function(err, personFound){
  if (err) return console.log(err);
  console.log(personFound);
  done(null , personFound);
})};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  
 // .findById() method to find a person by _id with the parameter personId as search key. 
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
    console.log(person);
  
// Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    person.save((err,updatedPerson) => {
      if (err) return console.log(err);
      console.log(updatedPerson);
      done(null , updatedPerson);
    })
})
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err,person) => {
    if (err) return console.log(err);
    console.log(person);
    console.log(Person);
    done(null , person);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
Person.remove({name:nameToRemove}, (err,response)=>{
  if (err) console.log(err);
  console.log(response);
  done(null , response);
})
};
//does not execute without exec fn
const queryChain = (done) => {
  
  const foodToSearch = "burrito";
  
Person.find({favoriteFoods: foodToSearch})
  .sort({name: 1})
  .limit(2)
  .select({age:0})
  .exec(function (err,data){
  if (err) return console.log(err);
  console.log(data);
    done(null , data);
})

};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
