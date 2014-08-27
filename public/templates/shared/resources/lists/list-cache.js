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
    .factory('listCache', ['$cacheFactory',
        function($cacheFactory) {
            var listCache = $cacheFactory('listCache');
            return listCache;
        }
    ]);
