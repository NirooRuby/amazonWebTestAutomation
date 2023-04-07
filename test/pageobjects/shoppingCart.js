//span[@data-action="delete"]//input

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
 class ShopingCart extends Page {
    get delete(){
        return $('//span[@data-action="delete"]//input');
    }

    async deleteItem(){
        await this.delete.waitForDisplayed({ timeout: 5000 });
        await this.delete.click();
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

module.exports = new ShopingCart();

