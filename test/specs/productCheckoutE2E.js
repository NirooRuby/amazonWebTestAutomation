const { assert } = require('chai');
const home = require('../pageobjects/home');
const productList = require('../pageobjects/productList');
const productDetails = require('../pageobjects/productDetails');
const shoppingCart = require('../pageobjects/shoppingCart');

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
    it('Select a product with filters and go to cart',  async () => {
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
        const txtProductName = await shoppingCart.getProductName();
        //
        assert.ok(txtForSelectedProduct, txtProductName);
        const txtPrice = await shoppingCart.getProductPrice();
        assert.ok( txtUnitPrice, txtPrice);


        const txtTotalPrice = await shoppingCart.getTotalPrice();
        console.log('txtTotlPrice =' + txtTotalPrice);
        let totalCalculate = 0;
        let txtPriceWithout = txtPrice.split('$');
        totalCalculate = parseFloat(txtPriceWithout[1])*2;
        console.log('txtTotlPriceCalculate =' + txtPriceWithout + 'slited' + txtPriceWithout[1]);
        assert.equal( txtTotalPrice, '$'+totalCalculate);
    })

    it('Clear the cart and verify the qty',  async () => {
        await shoppingCart.deleteItem();
        const txtTotalPrice = await shoppingCart.getTotalPrice();
        assert.equal( txtTotalPrice, '$0.00');
    })
    
})
