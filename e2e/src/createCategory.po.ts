import {by, element, browser, protractor} from 'protractor';

var createCategoryPage = function() {
  var submit = element(by.cssContainingText('button', 'Fertig'));

  this.get = function() {
    browser.get('http://www.angularjs.org');
  };

  this.getSubmitButton = function() {
    return submit;
  };

};
module.exports = new createCategoryPage();
