require('./mongoose')
const Pic = require('../models/pic')
const path = require('path')


const img1 = new Pic({
    name: 'Test Image',
    group: 'ohmygirl',
    who: ['아린', '유아', '비니'],
    path_original: '/images/ori/1.jpg',
    path_thumbnail: '/images/thu/1.jpg'
})



// console.log(img1.path)
// console.log(path.join(__dirname,'../../../images/1.jpg'))

img1.save().then(() => {
    console.log(img1)
}).catch((e) => {
    console.log(e)
})
const findall = async () => {

    try{
        const pics = await Pic.find({})
        console.log(pics)
    } catch(e) {
        console.log(e)
    }
}

findall()