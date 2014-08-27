/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Serkan Yersen
 */

angular.module('hdProWeb.search')

    .factory('searchQuery', [function(){
        var query = "";
        return {
            get: function() {
                return query;
            },
            set: function(value) {
                query = value;
                return query;
            }
        };
    }]);

