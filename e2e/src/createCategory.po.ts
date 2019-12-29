import {by, element, browser, protractor} from 'protractor';

var createCategoryPage = function() {

  this.get = function() {
    browser.get('http://snirps.ddns.net/SE-Project/DEV/Inventarverwaltung');
  };

  this.getSubmitButton = function() {
    return element(by.cssContainingText('button', 'Fertig'));
  };

  this.getAddDetailButton = function() {
    return element(by.cssContainingText('button', 'Detail hinzufügen!'));
  }

};
module.exports = new createCategoryPage();
