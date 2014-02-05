'use strict';

describe('Directive: formAutofillFix', function () {

  // load the directive's module
  beforeEach(module('reposApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<form-autofill-fix></form-autofill-fix>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the formAutofillFix directive');
  }));
});
