/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Serkan Yersen
 */
angular.module('hdProWeb')
    .filter('fixImgUrl', function() {
        return function(input) {
            return (input || "").replace('hd-qa71.homedepotdev.com', 'homedepot.com');
        };
    });
