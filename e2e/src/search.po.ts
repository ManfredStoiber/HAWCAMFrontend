import {by, element, browser, protractor} from 'protractor';

var searchPage = function() {

  this.get = function() {
    browser.get('http://snirps.ddns.net/SE-Project/DEV/Inventarverwaltung');
  };

  this.getSearchButton = function() {
    return element(by.cssContainingText('button', 'Suchen'));
  };

  this.getSearchInput = function() {
    return element(by.css('input[formcontrolname=search]'));
  }

};
module.exports = new searchPage();
