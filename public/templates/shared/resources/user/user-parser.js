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
    .factory('userParser', ['UserModel', function(UserModel) {


        return function (data, model) {
            var result = {};

            model = model || new UserModel();

            result.email = data.profile.email_id;
            result.firstName = data.profile.name.first_name;
            result.lastName = data.profile.name.last_name;
            result.fullName = [result.firstName, result.lastName].join(' ');
            result.zipCode = data.profile.zip_code;
            result.isContractor = data.profile.is_contractor;
            result.isTradesman = data.profile.is_tradesman;

            model.update(result);
            return model;
        };
    }]);
