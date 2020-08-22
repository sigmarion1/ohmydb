const mongoose = require('mongoose')
const Page = require('./models/page')
const Pic = require('./models/pic')

const db_host = process.env.DB_HOST || 'localhost'
const db_user = process.env.DB_USER || 'admin'
const db_pw = process.env.DB_PW || 'admin'
const db_name = process.env.DB_NAME || 'page'

mongoose.connect(`mongodb+srv://${db_user}:${db_pw}@${db_host}/${db_name}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('db connected!'))

// db.once('open', function() {
//   // we're connected!
//   console.log('connected')
//   const kittySchema = new mongoose.Schema({
//     name: String
//   });
//   const Kitten = mongoose.model('Kitten', kittySchema);
//   const silence = new Kitten({ name: 'Silence' });
//     console.log(silence.name); // 'Silence'

//     silence.save().then(() => {
//         console.log(silence)
//     }).catch((e) => {
//         console.log(e)
//     })

// });

const isCrawled = async (group, no) => {
    if (await Page.countDocuments({group:group, no:no}).exec() > 0) {
        return true
    }
    return false
}

const checkPage = async (group, no, images) => {
    const newPage = new Page({ group, no, images, checked:Date.now() })
    try {
        const savedUser = await newPage.save()
        // console.log(savedUser)
    } catch(err) {
        console.log(err)
    }
}

const insertImage = async (group, no, who, path_ori) => {
    const newPic = new Pic({ group, no, who, path_ori})

    if (who.length > 1) {
        newPic["isGroup"] = true
    } else {
        newPic["isGroup"] = false
    }

    try {
        const savedPic = await newPic.save()
        // console.log(savedUser)
    } catch(err) {
        console.log(err)
    }
}



// checkPage('ohmygirl', 235238, 4)

module.exports = {
    isCrawled,
    checkPage,
    insertImage
}