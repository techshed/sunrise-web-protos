
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
    .factory('occupations', ['$resource', 'ApiRoot', 'occupationParser',
        function($resource, ApiRoot, occupationParser) {

            var api = $resource(ApiRoot + '/occupations/');

            return {
                fetch: function() {
                    var occupations = [];

                    api.get().$promise.then(function(data) {
                        occupationParser(data, occupations);
                    });

                    return occupations;
                }
            };
    }]);
