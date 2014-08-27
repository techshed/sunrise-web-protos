/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Volkan Gul
 */

angular.module('hdProWeb')

    .directive('hdNewList', ['Tracking', function(Tracking) {
        return {
            link: function(scope, element, attrs) {

                var track = function(method) {
                    Tracking.track('Lists - Create a New List', { createMethod: method });
                };

                element.bind('blur', function() {
                    scope.$apply(attrs.hdNewList);
                    track('blur');
                });

                // When enter is pressed. createList() function is called
                // with the name of the new list passed as a parameter.
                // Enter can only be hit when focus is on this particular element.
                element.bind("keydown keypress", function(event) {

                    // Number 13 corresponds to the Enter Key.
                    if (event.which === 13) {
                        scope.$apply(attrs.hdNewList);
                        event.preventDefault();
                        track('enter');
                    }
                });
            }
        };
    }]);
