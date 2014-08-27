/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Serkan Yersen
 */

describe('Validation Helpers', function() {

    var scope, testFunc;

    // create new scope with helpers for each test
    beforeEach(function() {
        var $injector = angular.injector(['hdProWeb']);
        var helpers = $injector.get('validationHelpers');
        testFunc = jasmine.createSpy();
        scope = {
            form: {
                '$invalid': false
            },
            submit: function(){
                testFunc();
            }
        };
        helpers.applyTo(scope, ['submit']);
    });

    describe("submit wrappers", function() {

        it("should set submitted to true when submitted", function() {

            expect(scope.submitted).toBe(false);
            scope.submit();
            expect(scope.submitted).toBe(true);

            expect(testFunc).toHaveBeenCalled();
        });

        it("should submit if form is valid", function() {
            scope.form.$invalid = false;
            scope.submit();
            expect(testFunc).toHaveBeenCalled();
        });

        it("should not submit if form is invalid", function() {
            scope.form.$invalid = true;
            scope.submit();
            expect(testFunc).not.toHaveBeenCalled();
        });
    });


    describe('hasRequiredError', function() {

        it('should return true if field is empty', function() {
            var field = {
                '$error': {
                    'required': true
                }
            };
            scope.submit();
            var result = scope.hasRequiredError(field);
            expect(result).toBe(true);
        });

        it('should return false if field is filled', function() {
            var field = {
                '$error': {
                    'required': false
                }
            };
            scope.submit();
            var result = scope.hasRequiredError(field);
            expect(result).toBe(false);
        });
    });

    describe('hasError', function() {

        it('should return true if field is invalid and does not have required error', function() {
            var field = {
                '$invalid': true,
                '$error': {
                    'required': false
                }
            };
            scope.submit();
            var result = scope.hasError(field);
            expect(result).toBe(true);
        });

        it('should return false if field is invalid and has required error', function() {
            var field = {
                '$invalid': true,
                '$error': {
                    'required': true
                }
            };
            scope.submit();
            var result = scope.hasError(field);
            expect(result).toBe(false);
        });

        it('should return false if field is not invalid', function() {
            var field = {
                '$invalid': false
            };
            scope.submit();
            var result = scope.hasError(field);
            expect(result).toBe(false);
        });
    });

    describe('hasPasswordError', function() {

        it('should return true if password is invalid', function() {
            var field = {
                '$error': {
                    'password': true
                }
            };
            scope.submit();
            var result = scope.hasPasswordError(field);
            expect(result).toBe(true);
        });

        it('should return false if password is valid', function() {
            var field = {
                '$error': {
                    'password': false
                }
            };
            scope.submit();
            var result = scope.hasPasswordError(field);
            expect(result).toBe(false);
        });
    });

    describe('hasSuccess', function() {

        it('should return true if field is not invalid', function() {
            var field = {
                '$invalid': false
            };
            scope.submit();
            var result = scope.hasSuccess(field);
            expect(result).toBe(true);
        });

        it('should return false if field is invalid', function() {
            var field = {
                '$invalid': true
            };
            scope.submit();
            var result = scope.hasSuccess(field);
            expect(result).toBe(false);
        });
    });

    describe('getSuccessClass', function() {

        it('should have has-feedback class when field is dirty', function() {
            var field = {
                '$invalid': false,
                '$dirty': true,
                '$error': {
                    'required': false
                }
            };
            scope.submit();
            var classes = scope.getSuccessClass(field);
            expect(classes['has-feedback']).toBe(true);
        });

        it('should not have has-feedback class when field is not dirty', function() {
            var field = {
                '$invalid': false,
                '$dirty': false,
                '$error': {
                    'required': false
                }
            };
            scope.submit();
            var classes = scope.getSuccessClass(field);
            expect(classes['has-feedback']).toBe(false);
        });

        it('should have has-success class when field is valid', function() {
            var field = {
                '$invalid': false,
                '$dirty': true,
                '$error': {
                    'required': false
                }
            };
            scope.submit();
            var classes = scope.getSuccessClass(field);
            expect(classes['has-success']).toBe(true);
            expect(classes['has-error']).toBe(false);
        });

        it('should have has-error class when field is not valid and does not have required error', function() {
            var field = {
                '$invalid': true,
                '$dirty': true,
                '$error': {
                    'required': false
                }
            };
            scope.submit();
            var classes = scope.getSuccessClass(field);
            expect(classes['has-error']).toBe(true);
            expect(classes['has-success']).toBe(false);
        });

        it('should have has-error class when field is not valid because of required error', function() {
            var field = {
                '$invalid': true,
                '$dirty': true,
                '$error': {
                    'required': true
                }
            };
            scope.submit();
            var classes = scope.getSuccessClass(field);
            expect(classes['has-error']).toBe(true);
            expect(classes['has-success']).toBe(false);
        });
    });

    describe('getIconClass', function() {

        it('should have OK icon when valid', function() {
            var field = {
                '$invalid': false,
                '$dirty': true,
                '$error': {
                    'required': false
                }
            };
            scope.submit();
            var classes = scope.getIconClass(field);
            expect(classes['glyphicon-ok']).toBe(true);
            expect(classes['glyphicon-remove']).toBe(false);
        });

        it('should have REMOVE icon when not valid and does not have required error', function() {
            var field = {
                '$invalid': true,
                '$dirty': true,
                '$error': {
                    'required': false
                }
            };
            scope.submit();
            var classes = scope.getIconClass(field);
            expect(classes['glyphicon-remove']).toBe(true);
            expect(classes['glyphicon-ok']).toBe(false);
        });

        it('should have REMOVE icon when not valid because of required error', function() {
            var field = {
                '$invalid': true,
                '$dirty': true,
                '$error': {
                    'required': true
                }
            };
            scope.submit();
            var classes = scope.getIconClass(field);
            expect(classes['glyphicon-remove']).toBe(true);
            expect(classes['glyphicon-ok']).toBe(false);
        });
    });

});
