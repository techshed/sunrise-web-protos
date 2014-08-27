/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Serkan Yersen
 */
angular.module('hdProWeb.lists', ['ui.router'])

    .constant('hdProWeb.lists.Partials', '/static/core/app/lists/partials')

    .config(['$stateProvider', 'hdProWeb.lists.Partials',
        function($stateProvider, Partials) {

            $stateProvider.state('lists', {
                url: '/lists',
                controller: 'ListsController',
                templateUrl: Partials + '/lists.html',
                data: {
                    showCloseButton: false
                }
            });

            $stateProvider.state('lists.list', {
                url: '/:id',
                controller: 'ListController',
                templateUrl: Partials + '/list.html',
                data: {
                    showCloseButton: false
                }
            });

        }
    ]);
