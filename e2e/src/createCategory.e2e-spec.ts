import {by, element, browser, protractor} from 'protractor';

var createCategoryPage = require('./createCategory.po.ts');
describe('HAWCAM feature createCategory', function () {
	it('should create a new Category', function() {
		debugger;
		
		// go to homepage
		createCategoryPage.get();

		// select createCategory
		element(by.id('bttnCreateCategory')).click();

		// type name of category
		let catName = 'Testkategorie' + Date.now();
		element(by.css('input[formcontrolname=objCatName]')).sendKeys(catName);

		// add details
		createCategoryPage.getAddDetailButton().click();
		element.all(by.css('input[formcontrolname=detailName')).last().sendKeys('Testdetail1');
		createCategoryPage.getAddDetailButton().click();
		element.all(by.css('input[formcontrolname=detailName')).last().sendKeys('Testdetail2');

		// submit
		console.log('davor')
		createCategoryPage.getSubmitButton().click();
		console.log('danach')
		
		browser.wait(protractor.ExpectedConditions.alertIsPresent(), 5000);
		var alertDialog = browser.switchTo().alert();
		alertDialog.accept();

		// check if category exists
		browser.get('http://snirps.ddns.net/SE-Project/DEV/Inventarverwaltung');
		element(by.id('bttnListCategories')).click();
		expect(element(by.cssContainingText('div', catName)).isPresent()).toBe(true);

		browser.pause(10000);

	});
});
