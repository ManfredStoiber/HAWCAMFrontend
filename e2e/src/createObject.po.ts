import {by, element, browser, protractor} from 'protractor';

var createObjectPage = function() {

  this.get = function() {
    browser.get('http://snirps.ddns.net/SE-Project/DEV/Inventarverwaltung');
  };

  this.getSubmitButton = function() {
    return element(by.cssContainingText('button', 'Fertig'));
  };

  this.getCategoryButton = function(catName: string) {
    return element(by.cssContainingText('button', catName));
  };

  this.getObjectNameInput = function() {
    return element(by.css('input[formcontrolname=objObjName]'));
  }

  this.getAttributeInputs = function() {
    return element.all(by.css('input[name=attribute]'));
  }

};
module.exports = new createObjectPage();
