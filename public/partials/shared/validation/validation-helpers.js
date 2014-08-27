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
    .factory('validationHelpers', ['Tracking', function(Tracking){

        return {

            applyTo: function(scope, submitters, options) {
                options = options || {};
                scope.submitted = false;

                scope.hasRequiredError = function (field) {
                    return scope.submitted && field.$error.required;
                };

                scope.hasError = function(field) {
                    return scope.submitted && field.$invalid && !field.$error.required;
                };

                scope.hasPasswordError = function(field) {
                    return scope.submitted && field.$error.password;
                };

                scope.hasSuccess = function(field) {
                    return scope.submitted && !field.$invalid;
                };

                scope.getSuccessClass = function(field) {
                    return {
                        'has-feedback': scope.submitted && field.$dirty,
                        'has-success': scope.hasSuccess(field),
                        'has-error': scope.hasError(field) || scope.hasRequiredError(field)
                    };
                };

                scope.getIconClass = function(field) {
                    return {
                        'glyphicon-ok': scope.hasSuccess(field),
                        'glyphicon-remove': scope.hasError(field) || scope.hasRequiredError(field)
                    };
                };

                if (submitters) {
                    _(submitters).each(function(name) {
                        scope[name] = _.wrap(scope[name], function(func) {
                            var rest,
                                errors = { totalErrors: 0 };

                            // Mark form as submitted
                            scope.submitted = true;

                            // don't submit if the form is invalid
                            // track front end validation errors
                            if (scope.form.$invalid) {
                                if (options.trackingNamespace !== undefined) {
                                    _.each(scope.form.$error, function(value, key) {
                                        _.each(value, function(value, key) {
                                            errors['error-' + value.$name] = value.$viewValue;
                                            errors.totalErrors++;
                                        });
                                    });
                                    Tracking.track(options.trackingNamespace + ' - Front End Validation Error', errors);
                                }
                                return;
                            }
                            if (options.trackingNamespace !== undefined) {
                                Tracking.track(options.trackingNamespace + ' - Front End Validation Success');
                            }
                            // apply rest of the arguments to the function
                            rest = Array.prototype.slice.call(arguments, 1);

                            // call and return the result
                            return func.apply(this, rest);
                        });
                    });
                } else {
                    throw ('You have to provide at least one submit method for your forms');
                }

                return scope;
            }
        };
    }]);


