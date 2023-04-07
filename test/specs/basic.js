const { assert } = require('chai');
const home = require('../pageobjects/home');
const productList = require('../pageobjects/productList');
const productDetails = require('../pageobjects/productDetails');

describe('Amazon product seach and add to cart', () => {
    before('Navigate to official Amazon site',  () => {
        home.open('');
        expect(browser).toHaveTitle('Amazon.com. Spend less. Smile more.')
    })
   it('Select a category  from the Category list and search',  async () => {
        const searchText = 'Automation';

        await browser.setTimeout({ 'pageLoad': 10000 })
        await home.selectCategory();
        await home.searchByTextAndNavigate(searchText);
        expect(browser).toHaveTitle('Amazon.com : ' + searchText)

    })
    it('Select a product with filters and go to check out',  async () => {
        const index = 2;
        const qty = 2;
        await productList.selectCustomerReview();
        await productList.selectlanguageSelection();
        const txtForSelectedProduct = await productList.getProductAndGetName(index);
        console.log('txtForSelectedProduct ' + txtForSelectedProduct)
        await productList.clickOnProduct(index);
        const txtProdTitle =  await productDetails.getProductTitle();
        assert.ok(txtProdTitle, txtForSelectedProduct);
 
        const txtUnitPrice =  await productDetails.getUnitPrice();
        console.log('txtUnitPrice =' + txtUnitPrice);
        await productDetails.selectQtyAndAddToCart(qty);
        await productDetails.clickGoToCart();
        const txtProductName = await productDetails.getProductName();
        assert.ok(txtForSelectedProduct, txtProductName);
        const txtPrice = await productDetails.getProductPrice();
        assert.ok( txtUnitPrice, txtPrice);


        const txtTotalPrice = await productDetails.getTotalPrice();
        console.log('txtTotlPrice =' + txtTotalPrice);
        let totalCalculate = 0;
        let txtPriceWithout = txtPrice.split('$');
        totalCalculate = parseFloat(txtPriceWithout[1])*2;
        console.log('txtTotlPriceCalculate =' + txtPriceWithout + 'slited' + txtPriceWithout[1]);
        assert.equal( txtTotalPrice, '$'+totalCalculate);
    })


     /* 
    it('Product List page and navigate to the Product Detail page', async () => {
        const selectedProduct = await $('//div[@data-index="2"]//span[@class="a-size-medium a-color-base a-text-normal"]')
        await selectedProduct.waitForDisplayed({ timeout: 3000 })
        const txtForSelectedProduct = await selectedProduct.getText()
        const secondElementSelect = await $('//div[@data-index="2"]//h2');
        await secondElementSelect.waitForDisplayed({ timeout: 3000 })
        await secondElementSelect.click();
        const productTitle = await $('//div[@id="titleblock_feature_div"]//span[@id="productTitle"]'); 
        await productTitle.waitForDisplayed({ timeout: 5000 })
        const txtProdTitle = await productTitle.getText()
        assert.strictEqual(txtProdTitle, txtForSelectedProduct)


        const eleUnitPrice = await $('//div[@class="a-box-group"]//span[@id="price"]');
        await eleUnitPrice.waitForDisplayed({ timeout: 3000 })
        const txtUnitPrice = await eleUnitPrice.getText()
        console.log('PRICE :'+ txtUnitPrice);
        await $('//div[@id="selectQuantity"]//span[@class="a-dropdown-container"]').click();
        await $('//div[@class="a-popover-wrapper"]//li[2]').click();
        await $('//input[@id="add-to-cart-button"]').click();
        await $('aria/Go to Cart').click();
        const eleProductName = await $('//form[@id="activeCartViewForm"]//span[@class="a-truncate-cut"]')
        await eleProductName.waitForDisplayed({ timeout: 3000 })
        const txtProductName = await eleProductName.getText();
        console.log('txtProdName =' + txtProductName);
        console.log('Expected result' + txtForSelectedProduct)
        await assert.ok(txtForSelectedProduct, txtProductName) 
        const txtPrice = await $('//form[@id="activeCartViewForm"]//p[@class="a-spacing-mini"]//span').getText();
        console.log('txtProdPrice =' + txtPrice);
        assert.strictEqual( txtUnitPrice, txtPrice);
        
        
        const txtTotalPrice = await $('//form[@id="activeCartViewForm"]//span[@id="sc-subtotal-amount-activecart"]/span').getText();
        console.log('txtTotlPrice =' + txtTotalPrice);
        let totalCalculate = 0;
        let txtPriceWithout = txtPrice.split('$');
        totalCalculate = parseFloat(txtPriceWithout[1])*2;
        console.log('txtTotlPriceCalculate =' + txtPriceWithout + 'slited' + txtPriceWithout[1]);
        assert.strictEqual( txtTotalPrice, '$'+totalCalculate);
    }) */
   
})
