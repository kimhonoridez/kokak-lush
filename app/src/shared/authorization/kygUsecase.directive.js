/**
 * @author Kim Honoridez
 * @version 0.0.1
 */
(function () {
    'use strict';

    angular.module('authorization')
        .directive('kygUsecase', ['$kygAuthSvc', function ($kygAuthSvc) {
            // ELEMENT LEVEL AUTHORIZATION
            // if not authorized, remove DOM
            // if authorized but not supported in env mode, disable element
            return {
                restrict: 'A',
                link: function (scope, elem, attrs) {
                    // Remove DOM Element
                    if (!$kygAuthSvc.isAuthorized(attrs.kygUsecase)) {
                        elem.remove();
                    }

                    // Disable Element
                    // TO DO: Disable element if user is authorized but feature is not supported in a particular environment
                }
            }
        }]);
})();