const { data } = require('jquery');
const pupeeteer = require('puppeteer');

async function fetchKeyboard() {
    const browser = await pupeeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto('https://www.topachat.com/pages/produits_cat_est_gaming_puis_rubrique_est_wg_pccla.html')
    await page.waitForSelector('#app > div > div.product-list > div.product-list__main-wrapper > main > div.vue-recycle-scroller.product-list__products.ready.page-mode.direction-vertical > div.vue-recycle-scroller__item-wrapper > div:nth-child(1) > div > a > div', {
        visible: true
    });
    const data = await page.evaluate(() => {
        let data = [];
        const elements = document.querySelectorAll('#app > div > div.product-list > div.product-list__main-wrapper > main > div.vue-recycle-scroller.product-list__products.ready.page-mode.direction-vertical > div.vue-recycle-scroller__item-wrapper > div');
        for (const element of elements){
            data.push({
                name: element.querySelector('div.pl-product__content > h3').innerText,
                price: element.querySelector('div.offer-price.pl-product__price > span').innerText,
                img : element.querySelector(' div.pl-product__image-wrapper > picture > img').src,
            });
        }
        return data;
    })
    console.log(data);
    await browser.close();
    return data;

}

exports.fetchKeyboard = fetchKeyboard;