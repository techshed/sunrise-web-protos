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
    .factory('reviewParser', function() {
        return function(data) {
            var distributionDefaults = {1:0, 2:0, 3:0, 4:0, 5:0},
                distribution = angular.extend({}, distributionDefaults, data.review_distribution),
                parsed = {};

            // We unpack the dictionary here, so that it can be ordered easily
            parsed.distribution = [];
            Object.keys(distribution).map(function(value){
                return distribution[value];
            }).forEach(function(val, key) {
                parsed.distribution.push({
                    'stars': key + 1,
                    'value': val
                });
            });

            parsed.totalReviewCount = data.total_review_count;
            parsed.reviews = data.reviews;

            return parsed;
        };
    });
