/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc."s
 * authorization.
 *
 * Author: Serkan Yersen
 */


describe("User Account", function() {


    var scope;

    beforeEach(module('hdProWeb'));

    beforeEach(function() {
        // this test won't work because PhantomJS hangs when window object is altered
        window.alert = jasmine.createSpy("alert");

        scope  = {
            "email": "email",
            "password": "password",
            "confirmPassword": "password",
            "form": {
                "$setPristine": jasmine.createSpy("$setPristine")
            }
        };
    });

    describe("login success factory", function() {

        it("should clean scope and alert on success", inject(function(loginSuccess) {
            var response = {
                success: true
            };

            loginSuccess(response, scope);

            expect(scope.email).toBe("");
            expect(scope.password).toBe("");
        }));
    });


    describe("login error factory", function() {
        it("should display error when response is error", inject(function(loginError) {

            var response = {
                data: {
                    success: false,
                    errors: [{
                        message: "login failed"
                    }]
                }
            };

            loginError(response, scope);

            // expect(alert).toHaveBeenCalledWith("login failed");
        }));
    });

    describe("register response factory", function() {

        it("should clear password from scope on success", inject(function(registerResponseHandler) {
            var response = {
                success: true
            };

            registerResponseHandler(response, scope);

            expect(scope.email).not.toBe("");
            expect(scope.password).toBe("");
            expect(scope.confirmPassword).toBe("");
        }));

        it("should not clear password from scope on fail", inject(function(registerResponseHandler) {
            var response = {
                success: false,
                errors:[{
                    message: "register failed"
                }]
            };

            registerResponseHandler(response, scope);

            expect(scope.email).not.toBe("");
            expect(scope.password).not.toBe("");
            expect(scope.confirmPassword).not.toBe("");

            // expect(alert).toHaveBeenCalledWith("register failed");
        }));
    });

});
