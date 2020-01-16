import {by, element, browser, protractor} from 'protractor';

var createCategoryPage = require('./createCategory.po.ts');
var createObjectPage = require('./createObject.po.ts');
var searchPage = require('./search.po.ts');

let catName = 'Testkategorie' + Date.now();
let objName = 'Testobjekt' + Date.now();

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
		element.all(by.css('select[formcontrolname=detailType]')).last().element(by.cssContainingText('option', 'Textfeld')).click();
		element.all(by.css('select[formcontrolname=optionalOrMandatory]')).last().sendKeys('P');

		createCategoryPage.getAddDetailButton().click();
		element.all(by.css('input[formcontrolname=detailName')).last().sendKeys('Testdetail2');
		element.all(by.css('select[formcontrolname=detailType]')).last().element(by.cssContainingText('option', 'Zahl')).click();

		createCategoryPage.getAddDetailButton().click();
		element.all(by.css('input[formcontrolname=detailName')).last().sendKeys('Testdetail3');
		element.all(by.css('select[formcontrolname=detailType]')).last().element(by.cssContainingText('option', 'Datum')).click();

		expect(createCategoryPage.getSubmitButton().isEnabled()).toBe(true);
		createCategoryPage.getAddDetailButton().click();
		expect(createCategoryPage.getSubmitButton().isEnabled()).toBe(false);
		element.all(by.css('button.delete')).last().click();
		expect(createCategoryPage.getSubmitButton().isEnabled()).toBe(true);

		// submit
		createCategoryPage.getSubmitButton().click();

		// wait for alert message
		browser.wait(protractor.ExpectedConditions.alertIsPresent(), 10000);
		var alertDialog = browser.switchTo().alert();
		expect(alertDialog.getText()).toEqual('Kategorie erfolgreich erstellt');
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
		browser.wait(protractor.ExpectedConditions.alertIsPresent(), 10000);
		var alertDialog = browser.switchTo().alert();
		expect(alertDialog.getText()).not.toEqual('Kategorie wurde angelegt!');
		alertDialog.accept();

	});


});

describe('HAWCAM feature createObject', function() {

	it('should create a new object based on the recently created category', function() {

		// go to homepage
		createObjectPage.get();

		// select createObject
		element(by.id('bttnCreateObject')).click();

		// select category
		expect(createObjectPage.getCategoryButton(catName).isPresent()).toBe(true);
		createObjectPage.getCategoryButton(catName).click()

		expect(createObjectPage.getSubmitButton().isEnabled()).toBe(false);
		createObjectPage.getObjectNameInput().sendKeys(objName);
		expect(createObjectPage.getSubmitButton().isEnabled()).toBe(false);
		createObjectPage.getAttributeInputs().get(0).sendKeys('Testwert für Attribut 1');
		expect(createObjectPage.getSubmitButton().isEnabled()).toBe(true);
		createObjectPage.getAttributeInputs().get(1).sendKeys('1');
		createObjectPage.getAttributeInputs().get(2).sendKeys('15.01.2020');
		createObjectPage.getSubmitButton().click();

		// wait for alert message
		browser.wait(protractor.ExpectedConditions.alertIsPresent(), 10000);
		var alertDialog = browser.switchTo().alert();
		expect(alertDialog.getText()).toEqual('Objekt erfolgreich erstellt');
		alertDialog.accept();
		
	});
	
	it('should not be able to create a new object with the same name', function() {

		// go to homepage
		createObjectPage.get();

		// select createObject
		element(by.id('bttnCreateObject')).click();

		// select category
		expect(createObjectPage.getCategoryButton(catName).isPresent()).toBe(true);
		createObjectPage.getCategoryButton(catName).click()

		expect(createObjectPage.getSubmitButton().isEnabled()).toBe(false);
		createObjectPage.getObjectNameInput().sendKeys(objName);
		expect(createObjectPage.getSubmitButton().isEnabled()).toBe(false);
		createObjectPage.getAttributeInputs().get(0).sendKeys('Testwert für Attribut 1');
		expect(createObjectPage.getSubmitButton().isEnabled()).toBe(true);
		createObjectPage.getAttributeInputs().get(1).sendKeys('1');
		createObjectPage.getAttributeInputs().get(2).sendKeys('15.01.2020');

		// on second submit expect failure
		createObjectPage.getSubmitButton().click();
		browser.wait(protractor.ExpectedConditions.alertIsPresent(), 10000);
		var alertDialog = browser.switchTo().alert();
		expect(alertDialog.getText()).toEqual('Objekt konnte nicht gespeichert werden');
		alertDialog.accept();


		
	});
});

describe('HAWCAM feature search', function() {
	it('should find the recently created category', function() {
		
		// go to homepage
		searchPage.get();

		// select search
		element(by.id('bttnSearch')).click();

		// type name of category
		searchPage.getSearchInput().sendKeys(catName);

		// press search button
		searchPage.getSearchButton().click();

		expect(element(by.cssContainingText('div.catnameAsResult', catName)).isPresent()).toBe(true);

	});

	it('should find the recently created object', function() {
		
		// go to homepage
		searchPage.get();

		// select search
		element(by.id('bttnSearch')).click();

		// type name of category
		searchPage.getSearchInput().sendKeys(objName);

		// press search button
		searchPage.getSearchButton().click();

		expect(element(by.cssContainingText('div.objname', objName)).isPresent()).toBe(true);
		expect(element(by.cssContainingText('div.catname', catName)).isPresent()).toBe(true);

	});
});
