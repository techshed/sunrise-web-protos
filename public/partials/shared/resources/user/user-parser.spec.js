/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Serkan Yersen
 */

describe('User Parser', function() {

    var parser,
        model,
        rawUser = {
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
        preParsed = {
            "email": "user@redbeacon.com",
            "firstName": "John",
            "lastName": "Doe",
            "fullName": "John Doe",
            "zipCode": "94404",
            "isDotcom": false,
            "isProXtra": false,
            "isContractor": false,
            "isTradesman": false
        };

    beforeEach(module('hdProWeb'));

    beforeEach(inject(function(userParser, UserModel) {

        parser = userParser;
        model = new UserModel();
    }));

    it('should parse the user correctly', function() {

        var parsed = parser(rawUser, model);
        expect(JSON.stringify(parsed)).toEqual(JSON.stringify(preParsed));
    });
});
