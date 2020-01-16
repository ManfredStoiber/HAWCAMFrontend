import {by, element, browser} from 'protractor';
describe('HAWCAM homepage', function () {
	it('should show the HAWCAM homepage', function() {
		
		// go to homepage
		browser.get('http://snirps.ddns.net/SE-Project/DEV/Inventarverwaltung');

		// check if all buttons are present
		expect(element(by.id('app-message')).getText()).toMatch('Hallo.*, was möchten Sie tun?');
		expect(element(by.id('bttnCreateObject').isPresent()).toBe(true);
		expect(element(by.id('bttnSearch').isPresent()).toBe(true);
		expect(element(by.id('bttnCreateCategory').isPresent()).toBe(true);
		expect(element(by.id('bttnListCategories').isPresent()).toBe(true);

	});
});
