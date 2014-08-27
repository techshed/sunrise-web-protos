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
    .factory('lists', ['$resource', 'ApiRoot', function($resource, ApiRoot) {

        var api = $resource(ApiRoot + '/lists/', {}, {
            createList: {
                url: ApiRoot + '/lists/',
                method: 'POST'
            },
            updateList: {
                url: ApiRoot + '/lists/:id',
                method: 'POST'
            },
            deleteList: {
                url: ApiRoot + '/lists/:id',
                method: 'DELETE'
            }
        });

        return api;
    }]);

    // .factory('serkan', ['lists', function(lists){
    //     lists.name;
    // }]);
