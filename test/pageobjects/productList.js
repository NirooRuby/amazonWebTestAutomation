const Page = require('./page');
/**
 * sub page containing specific selectors and methods for a specific page
 */
 class ProductList extends Page {
 
    get customerReview4AndUp(){
        return $('//li[@id="p_72/1250221011"]//a');
    }
    
    async selectCustomerReview(){
        await this.customerReview4AndUp.waitForDisplayed({ timeout: 5000 });
        await this.customerReview4AndUp.click();
    }

    get languageSelection(){
        return $('//li[@id="p_n_feature_nine_browse-bin/3291437011"]//i');
    }
    
    async selectlanguageSelection(){
        await this.languageSelection.waitForDisplayed({ timeout: 5000 });
        await this.languageSelection.click();
    }

    
    async getProductAndGetName(index){
        const string = '//div[@data-index="' + index + '"]//span[@class="a-size-medium a-color-base a-text-normal"]'
        await $(string).waitForDisplayed({ timeout: 5000 });
        return await $(string).getText();
        
    }

    async clickProductName(index){
        const string = '//div[@data-index="' + index + '"]//span[@class="a-size-medium a-color-base a-text-normal"]'
        return await $(string).click();

    }

    async clickOnProduct(index){
        const string = '//div[@data-index="' + index + '"]//h2';
        await $(string).waitForClickable({ timeout: 8000 });
        await $(string).click();
    }

}

module.exports = new ProductList();

