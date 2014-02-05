'use strict';

angular.module('reposApp')
  .directive('formAutofillFix2', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the formAutofillFix directive');
      }
    };
  });
