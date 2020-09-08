const axios = require('axios')
const FormData = require('form-data')
const path = require('path');
const fs = require('fs');

(async () => {

const imageFile = path.join(__dirname, 'image_crawl', 'ori', 'ohmygirl_1842769_0.jpg')

const form_data = new FormData()
form_data.append('file', fs.createReadStream(imageFile))
const form_headers = form_data.getHeaders()

console.log(await axios.post("http://localhost:5000/fileUpload", form_data, {
    headers: {
        ...form_headers
    }
}))

})();