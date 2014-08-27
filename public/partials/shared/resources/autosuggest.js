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
    .factory('autosuggest', ['$resource', 'ApiRoot', function($resource, ApiRoot) {

        var api = $resource( ApiRoot + '/search/auto_suggest/mobile/', {
            q: '?'
        });

        return {
            fetch: function(params) {
                var suggestions = [];
                api.get(params).$promise.then(function(data) {
                    _.each(data.suggestions, function (suggestion) {
                        if (suggestion.type === 'refinements') {
                            suggestions.push(suggestion.name);
                        }
                    });
                });
                return suggestions;
            }
        };
    }]);
