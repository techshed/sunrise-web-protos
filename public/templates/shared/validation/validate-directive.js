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
    .directive('hdValidate', function () {

        var validators = {
            zipcode: function(value, scope) {
                return /^(\d{5}(-\d{4})?|[A-Z]\d[A-Z] *\d[A-Z]\d)$/.test(value);
            },
            confirmPassword: function(value, scope, attrs) {
                return value === scope[attrs.against];
            },
            password: function(value) {
                return value.length > 4 && value.length < 13;
            }
        };

        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attr, ctrl) {
                // register multiple validations at once
                var names = attr.hdValidate.split(/\s*,\s*/gim)
                                // trim all validation names
                                .map(function(name){ return name.replace(/\s+/g, ''); });

                // for each validation name
                _.each(names, function(name) {
                    var validate = function(value) {
                        // this is not required validation
                        // so empty value is always correct
                        if (!value) { return true; }

                        return validators[name](value, scope, attr);
                    };

                    ctrl.$parsers.unshift(function(value) {
                        var valid = validate(value);
                        ctrl.$setValidity(name, valid);
                        return valid ? value : false;
                    });

                    // add a formatter that will process each time the value
                    // is updated on the DOM element.
                    ctrl.$formatters.unshift(function(value) {
                        // validate.
                        ctrl.$setValidity(name, validate(value));
                        // return the value or nothing will be written to the DOM.
                        return value;
                    });
                });
            }
        };
    });
