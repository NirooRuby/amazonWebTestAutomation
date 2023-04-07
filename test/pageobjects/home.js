const Page = require('./page');
/**
 * sub page containing specific selectors and methods for a specific page
 */
 class Home extends Page {
    get categoryDropdown(){
        return $('#nav-search-dropdown-card');
    }
    
    async openCategoryDropDown(){
        await this.categoryDropdown.click();
    }
    get selectBox(){
        return $('#searchDropdownBox');
    }

    async selectCategory() {
        await this.categoryDropdown.click();
        await $('#searchDropdownBox').selectByAttribute('value', 'search-alias=stripbooks-intl-ship');
    }

    get selectedLblCategory(){
        return $('#nav-search-label-id');
    }

    get searchBox(){
        return $('#twotabsearchtextbox');
    }
    get searchIcon(){
        return $('#nav-search-submit-button');
    }

    async searchByTextAndNavigate(value){
        await this.searchBox.addValue(value);
        await this.searchIcon.click();
    }
    

}

module.exports = new Home();

