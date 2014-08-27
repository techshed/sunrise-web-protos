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
    .factory('UserResource', ['$resource', 'ApiRoot', 'userParser', 'UserModel',
        function($resource, ApiRoot, userParser, UserModel) {
            var api = $resource(ApiRoot + '/account/dotcom/', {}, {
                login: {
                    method: 'POST',
                    url: ApiRoot + '/auth/dotcom/'
                },
                logout: {
                    method: 'GET',
                    url: ApiRoot + '/auth/logout/'
                },
                register: {
                    method: 'POST',
                    url: ApiRoot + '/account/dotcom/'
                }
            });

            return {
                user: null,
                getInfo: function(params, success, fail) {
                    api.get(params).$promise.then(function(res) {
                        var data = userParser(res);
                        this.user = new UserModel(data);
                        this.user.isDotcom = true;
                        success && success(res, this.user);
                    }.bind(this))['catch'](function(xhr) {
                        this.user = null;
                        fail && fail(xhr.data);
                    }.bind(this));
                },
                login: function(params, success, fail) {
                    api.login(params).$promise.then(function(res){
                        this.getInfo({}, success, fail);
                    }.bind(this))['catch'](function(xhr) {
                        fail && fail(xhr.data);
                    });
                },
                logout: function(params, success, fail) {
                    api.logout(params).$promise.then(function(res){
                        this.getInfo({}, success, fail);
                    }.bind(this))['catch'](function(xhr) {
                        fail && fail(xhr.data);
                    });
                },
                register: function(params, success, fail) {
                    api.register(params).$promise.then(function(res){
                        this.getInfo({}, success, fail);
                    }.bind(this))['catch'](function(xhr) {
                        fail && fail(xhr.data);
                    });
                }
            };
        }
    ]);
