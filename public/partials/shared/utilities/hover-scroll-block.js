/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Ben Clark
 */

angular.module('hdProWeb')

    .directive('hdHoverScrollBlock', [function() {
        return {
            link: function(scope, element, attrs){
                var body$ = $('body');
                $(element).mouseenter(function() {
                    body$.addClass('u-scrollBlock');
                }).mouseleave(function() {
                    body$.removeClass('u-scrollBlock');
                });
            }
        };
    }]);
