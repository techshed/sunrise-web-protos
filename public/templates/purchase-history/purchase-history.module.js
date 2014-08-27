/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Caner Balci
 */
angular.module('hdProWeb.purchaseHistory', ['ui.router'])

    .constant('hdProWeb.purchaseHistory.Partials', '/static/core/app/purchase-history/partials')

    .config(['$stateProvider', 'hdProWeb.purchaseHistory.Partials', function($stateProvider, Partials) {
            $stateProvider.state('purchaseHistory', {
                url: '/purchase-history',
                templateUrl: Partials + '/purchase-history.html',
                controller: 'PurchaseHistoryController',
                data: {
                    showCloseButton: false
                }
            });
            $stateProvider.state('purchaseDetails', {
                parent: 'purchaseHistory',
                data: {
                    pageTitle: 'Purchase Details',
                    showCloseButton: true
                }
            });
        }
    ]);
