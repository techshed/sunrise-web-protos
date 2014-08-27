/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Serkan Yersen
 */

describe("User Resource", function() {
    var resource,
        backend,
        success = {
            "profile": {
                "email_id": "user@redbeacon.com",
                "is_tradesman": false,
                "is_contractor": false,
                "name": {
                    "first_name": "John",
                    "last_name": "Doe"
                },
                "zip_code": "94404"
            },
            "subscriptions": {
                "subscription": [{
                    "is_subscribed": false,
                    "code": "HOW_TO_NEWSLETTER"
                }, {
                    "is_subscribed": false,
                    "code": "PROMOTIONS"
                }, {
                    "is_subscribed": false,
                    "code": "PRO"
                }, {
                    "is_subscribed": false,
                    "code": "LOCAL_AD"
                }, {
                    "is_subscribed": false,
                    "code": "SPECIAL_BUY_OF_THE_DAY"
                }, {
                    "is_subscribed": false,
                    "code": "GARDEN_CLUB_NEWSLETTER"
                }]
            },
            "success": true
        },
        error = {
            "errors": [{
                "message": "You are not authorized to perform this operation.",
                "code": "AUTH_ERR_107"
            }],
            "success": false,
            "auth_required": ["dotcom"]
        };

    beforeEach(module('hdProWeb'));
    beforeEach(inject(function($httpBackend, UserResource) {
        backend = $httpBackend;
        resource = UserResource;
    }));

    it("should create user model when info is requested and successful", function() {
        backend.expectGET('/api/v1/account/dotcom/').respond(success);
        resource.getInfo();
        backend.flush();
        expect(resource.user).toBeDefined();
        expect(resource.user).not.toBeNull();
        // should set isDotcom to true when
        // logged in to dotcom account
        expect(resource.user.isDotcom).toBe(true);
    });

    it("should have user as null on not loggedin", function() {
        backend.expectGET('/api/v1/account/dotcom/').respond(401, error);
        resource.getInfo();
        backend.flush();
        expect(resource.user).toBeDefined();
        expect(resource.user).toBeNull();
    });

    it("should create user model when login is successful", function() {
        backend.expectPOST('/api/v1/auth/dotcom/').respond({success:true});
        backend.expectGET('/api/v1/account/dotcom/').respond(success);
        resource.login();
        backend.flush();
        expect(resource.user).toBeDefined();
        expect(resource.user).not.toBeNull();
    });

    it("should create user model when register is successful", function() {
        backend.expectPOST('/api/v1/account/dotcom/').respond({success:true});
        backend.expectGET('/api/v1/account/dotcom/').respond(success);
        resource.register();
        backend.flush();
        expect(resource.user).toBeDefined();
        expect(resource.user).not.toBeNull();
    });
});
