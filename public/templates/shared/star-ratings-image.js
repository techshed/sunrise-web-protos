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
    .factory('starRatingsImage', [function() {
        return {
            get: function(value) {
                value = value || 0;

                // get rid of the floating point and turn it into string
                if (typeof value === 'number') {
                    value = value.toFixed(1).toString();
                }

                value = value.replace('.', '_');

                return '//homedepot.ugc.bazaarvoice.com/1999m/' + value + '/5/rating.gif';
            }
        };
    }]);
