const puppeteer = require('puppeteer');
const fs = require('fs')
const axios = require('axios')
const path = require('path')
const { isCrawled, checkPage, insertImage } = require('./history')
const imageUpload = require('./uploader')
const FormData = require('form-data');

const CRAWL_PATH = path.join(__dirname, 'image_crawl')

const getRandomInt = (min, max) => { //min ~ max 사이의 임의의 정수 반환
    return Math.floor(Math.random() * (max - min)) + min;
}

async function downloadFile(response, wStream){ //다운로드 완료될때까지 대기
    return new Promise(resolve => {
        const pipe = response.data.pipe(wStream)
        pipe.on("finish", resolve)
    })
}


const getImage = async (id, pageNum, recommend=true) => {

    fs.mkdir(CRAWL_PATH, {recursive: true}, (err) => {
        if(err) {
            console.log(err)
        } else {
            console.log("New directory successfully created")
        }
    })

    const browser = await puppeteer.launch({headless: true, args: ['--no-sandbox']})
    const page = await browser.newPage()
    // await page.goto('https://gall.dcinside.com/board/lists?id=ohmygirl&exception_mode=recommend')
    // await page.goto('https://gall.dcinside.com/board/lists?id=ohmygirl')
    const addr = `https://gall.dcinside.com/board/lists/?id=${id}&page=${pageNum}`
    if(recommend) {
        await page.goto(addr+'&exception_mode=recommend')        
    } else {
        await page.goto(addr)
    }

    const gallNumList = await page.$$eval(
        '.ub-content > .gall_num',
        elements => elements.map(element => element.textContent)
    )

    for(let i = 0; i < gallNumList.length; i++){
        // for(let i = 0; i < 8; i++){
        const num = parseInt(gallNumList[i])

        if( isNaN(num) || num === 0){
            continue
        }

        if(await isCrawled(id, num)){
            console.log('this page is already checked : ' + id + num)
            continue
        }

        let imageCount = 0

        const linkAddr = await page.$eval(`tbody > tr:nth-child(${i+1}) > .gall_tit.ub-word > a`, el => el.getAttribute('href'))
        console.log(`============================================`)
        console.log(`Num : ${num} Addr : ${linkAddr}`)

        await page.click(`tbody > tr:nth-child(${i+1}) > .gall_tit.ub-word > a`)
        await page.waitFor(getRandomInt(5000, 10000))

        if (await page.$("span#zzbang_img") !== null) {
            console.log("no image")
            await checkPage(id, num, imageCount)
            continue
        }

        const imageList = await page.$$eval(
            "div.writing_view_box img", 
            elements => elements.map((el) => el.getAttribute('src'))
        )


        for(let j = 0; j < imageList.length; j++){
            let response = undefined

            try{
                response = await axios({
                    method: 'get',
                    url: imageList[j],
                    headers: {
                        "Referer": "https://gall.dcinside.com/",
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4182.0 Safari/537.36",
                    },
                    responseType: 'stream'
                })
            } catch(err) {
                console.log(err)
                continue
            }

            if(response.headers['content-disposition'] === undefined ) {
                continue
            }            

            const condi = response.headers['content-disposition'].split(".")
            const imageFileName = `${id}_${num}_${j}.${condi[condi.length-1]}`
            const imageFilePath = path.join(CRAWL_PATH, imageFileName)
            
            const wStream = fs.createWriteStream(imageFilePath)

            console.log(`============================================`)
            // const pipe = response.data.pipe(wStream)

            await downloadFile(response, wStream)
            console.log(`1. image downloaded : ${imageFilePath}`)

            // await pipe.on("finish", ()=>{
            //     console.log('file download finish')
            // })

            // await downloadFile(imageList[i], id, num, j)

            const form_data = new FormData()
            const rStream = fs.createReadStream(imageFilePath)
            form_data.append('file', rStream)
            const form_headers = form_data.getHeaders()
            let response_who = undefined

            try{
                response_who = await axios.post("http://localhost:5000/fileUpload", form_data, {
                    headers: {
                        ...form_headers
                    }
                })
            } catch (err) {
                console.log(err)
                continue
            }


            const who_list = response_who.data.who
            const who_list_filtered = who_list.filter((e) => e !== 'unknown')
            console.log('2. face recognited : ' + who_list_filtered.toString())

            if (!who_list_filtered.length) {
                console.log('no member in this image :' + imageFilePath)
                fs.unlinkSync(imageFilePath, (err) => {
                    console.log(err)
                })
                continue
            }

            const webPath = await imageUpload(imageFilePath)
            console.log(`3. image uploaded : ${webPath}`)

            await insertImage(id, num, who_list_filtered, webPath)

            fs.unlinkSync(imageFilePath, (err) => {
                console.log(err)
            })


            imageCount++

        }

        await checkPage(id, num, imageCount)

        // await page.screenshot({path: `example${i}.png`});
        await page.goBack()
        await page.waitFor(getRandomInt(5000, 10000))

    }
    
    await browser.close()
}



module.exports = getImage

