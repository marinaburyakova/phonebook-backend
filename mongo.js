import mongoose from 'mongoose'

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

if (!password) {
  console.log('give password as argument')
  process.exit(1)
}

const url = `mongodb://marinaburyakova07z_db_user:${password}@cluster0-shard-00-00.74qewf5.mongodb.net:27017,cluster0-shard-00-01.74qewf5.mongodb.net:27017,cluster0-shard-00-02.74qewf5.mongodb.net:27017/phonebookApp?ssl=true&replicaSet=atlas-13p5c7-shard-0&authSource=admin&retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)


const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length > 3) {
  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  }).catch(err => {
    console.error(err)
    mongoose.connection.close()
  })
}
