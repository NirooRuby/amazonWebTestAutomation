const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
 class ProductDetails extends Page {
    get productTitle(){
        return $('//div[@id="titleblock_feature_div"]//span[@id="productTitle"]');
    }

    async getProductTitle(){
        await this.productTitle.waitForDisplayed({ timeout: 8000 });
        return await this.productTitle.getText();
    }

    get unitPrice(){
        return $('//div[@id="booksHeaderSection"]//span[@id="price"]');
    }

    async getUnitPrice(){
        await this.unitPrice.waitForDisplayed({ timeout: 8000 });
        return await this.unitPrice.getText();
    }

    get untiPriceDropDown(){
        return $('//div[@id="selectQuantity"]//span[@class="a-dropdown-container"]');
    }
    
    async selectQty(index){
        return await $('//div[@class="a-popover-wrapper"]//li[' + index + ']');
    }

    get addToCart(){
        return $('//input[@id="add-to-cart-button"]');
    }

    async selectQtyAndAddToCart(index){
        await this.untiPriceDropDown.waitForDisplayed({ timeout: 8000 });
        await this.untiPriceDropDown.click();
        const string = '//div[@class="a-popover-wrapper"]//li[' + index + ']';
        await $(string).waitForDisplayed({ timeout: 8000 });
        await $(string).click();
        await this.addToCart.click();
    }
    get goToCart(){
        return $('//span[@id="sw-gtc"]//a');
    }

    async clickGoToCart(){
        await this.goToCart.click();
    }

    get productName(){
        return $('//form[@id="activeCartViewForm"]//span[@class="a-truncate-cut"]');
    }

    async getProductName(){
        await this.productName.waitForDisplayed({ timeout: 5000 });
        return await this.productName.getText()
    }

    get productPrice(){
        return $('//form[@id="activeCartViewForm"]//p[@class="a-spacing-mini"]//span');
    }

    async getProductPrice(){
        await this.productPrice.waitForDisplayed({ timeout: 5000 });
        return await this.productPrice.getText()
    }

    get totalPrice(){
        return $('//form[@id="activeCartViewForm"]//span[@id="sc-subtotal-amount-activecart"]/span');
    }
    async getTotalPrice(){
        await this.totalPrice.waitForDisplayed({ timeout: 5000 });
        return await this.totalPrice.getText()
    }
}

module.exports = new ProductDetails();

