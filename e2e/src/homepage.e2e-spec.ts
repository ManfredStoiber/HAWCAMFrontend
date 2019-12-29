import {by, element, browser} from 'protractor';
describe('HAWCAM homepage', function () {
	it('should show the HAWCAM homepage', function() {
		
		browser.get('http://snirps.ddns.net/SE-Project/DEV/Inventarverwaltung');

		expect(element(by.id('app-message')).getText()).toMatch('Hallo.*, was möchten Sie tun?');
	});
});
