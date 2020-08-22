const dotenv = require('dotenv')
const path = require('path')
dotenv.config({ path: path.join(__dirname, '..', '..', '.env')})

const S3 = require('aws-sdk/clients/s3')
const fs= require('fs')
const { rejects } = require('assert')

const s3_ctl = new S3({
    accessKeyId: process.env.AWS_ACS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION
})

// const param = {
//     'Bucket':'ohmydb',
//     'Key':'image/' + 'loglo',
//     'ACL':'public-read',
//     'Body':fs.createReadStream(path.join('sample','3.gif')),
//     'ContentType':'image/gif'
// }

// s3_ctl.upload(param, (err,data) => {
//     if(err) {
//         console.log(err)
//     }
//     console.log(data)
// })

const s3_ctl_upload = (param) => { //업로드 완료될때까지 대기
    return new Promise(resolve => {
        s3_ctl.upload(param, (err,data) => {
            if(err) {
                console.log(err)
                rejects()
            }
            // console.log('image_upload_complet')
            resolve(data.Location)
        })
    })
}


const imageUpload = async (image) => {
    const image_str = image.split(".")
    const image_ext = image_str[image_str.length-1]
    const image_str2 = image_str[[image_str.length-2]].split("/")
    const image_name = image_str2[image_str2.length-1]
    const folder = new Date().toISOString().split('T')[0]

    const param = {
        'Bucket':'ohmydb',
        'Key':path.join('image', folder, image_name),
        'ACL':'public-read',
        'Body':fs.createReadStream(path.join(image)),
        'ContentType':'image/' + image_ext
    }

    try{
        return await s3_ctl_upload(param)
    } catch {
        return null
    }    

}

// (async () => {
//     console.log(await imageUpload('image_crawl/ohmygirl_1871242_0.jpg'))
// })()



module.exports = imageUpload