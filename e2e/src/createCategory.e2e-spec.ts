import {by, element, browser, protractor} from 'protractor';

var createCategoryPage = require('./createCategory.po.ts');

let catName = 'Testkategorie' + Date.now();

describe('HAWCAM feature createCategory', function () {
	it('should create a new Category', function() {

		// go to homepage
		createCategoryPage.get();

		// select createCategory
		element(by.id('bttnCreateCategory')).click();

		expect(createCategoryPage.getSubmitButton().isEnabled()).toBe(false);

		// type name of category
		element(by.css('input[formcontrolname=objCatName]')).sendKeys(catName);

		expect(createCategoryPage.getSubmitButton().isEnabled()).toBe(true);

		// add details
		createCategoryPage.getAddDetailButton().click();
		element.all(by.css('input[formcontrolname=detailName')).last().sendKeys('Testdetail1');
		createCategoryPage.getAddDetailButton().click();
		element.all(by.css('input[formcontrolname=detailName')).last().sendKeys('Testdetail2');

		expect(createCategoryPage.getSubmitButton().isEnabled()).toBe(true);
		createCategoryPage.getAddDetailButton().click();
		expect(createCategoryPage.getSubmitButton().isEnabled()).toBe(false);
		element.all(by.css('button.delete')).last().click();
		expect(createCategoryPage.getSubmitButton().isEnabled()).toBe(true);

		// submit
		createCategoryPage.getSubmitButton().click();

		// wait for alert message
		browser.wait(protractor.ExpectedConditions.alertIsPresent(), 5000);
		var alertDialog = browser.switchTo().alert();
		expect(alertDialog.getText()).toEqual('Kategorie wurde angelegt!');
		alertDialog.accept();

		browser.pause(1000);

		// check if category exists
		browser.get('http://snirps.ddns.net/SE-Project/DEV/Inventarverwaltung');
		element(by.id('bttnListCategories')).click();
		expect(element(by.cssContainingText('div', catName)).isPresent()).toBe(true);

	});

	it('should not be able to create a new Category with existing name', function() {
		// go to homepage
		createCategoryPage.get();

		// select createCategory
		element(by.id('bttnCreateCategory')).click();

		// type name of existing category
		element(by.css('input[formcontrolname=objCatName]')).sendKeys(catName);

		// add details
		createCategoryPage.getAddDetailButton().click();
		element.all(by.css('input[formcontrolname=detailName')).last().sendKeys('Testdetail1');
		createCategoryPage.getAddDetailButton().click();
		element.all(by.css('input[formcontrolname=detailName')).last().sendKeys('Testdetail2');

		// submit
		createCategoryPage.getSubmitButton().click();

		// wait for alert message
		browser.wait(protractor.ExpectedConditions.alertIsPresent(), 5000);
		var alertDialog = browser.switchTo().alert();
		expect(alertDialog.getText()).not.toEqual('Kategorie wurde angelegt!');
		alertDialog.accept();

	});
});
