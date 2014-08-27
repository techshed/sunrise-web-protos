/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Serkan Yersen
 */

describe('Review Parser', function() {

    var rawData = {
            "reviews": [{
                "rating": 5,
                "author": "pingo",
                "text": "Fiberglass handle, curved grip and balanced weight all make for a great value. Super happy with purchase.",
                "timestamp": "2014-06-05T21:49:00-05:00",
                "title": "Easy to grip, super powerful for size"
            }, {
                "rating": 5,
                "author": "renovator",
                "text": "This hammer is extremely well designed with it's large striking surface,flat top head, and shock absorbing handle. Very comfortable to use, and durable, having taken a severe beating on a gut demo-reno job. For the price and design, well worth having.",
                "timestamp": "2014-04-12T08:53:48-05:00",
                "title": "great features, great value"
            }],
            "success": true,
            "review_distribution": {
                "5": 5,
                "4": 3
            },
            "total_review_count": 8
        },
        preParsed = {
            "distribution": [{
                "stars": 1,
                "value": 0
            }, {
                "stars": 2,
                "value": 0
            }, {
                "stars": 3,
                "value": 0
            }, {
                "stars": 4,
                "value": 3
            }, {
                "stars": 5,
                "value": 5
            }],
            "totalReviewCount": 8,
            "reviews": [{
                "rating": 5,
                "author": "pingo",
                "text": "Fiberglass handle, curved grip and balanced weight all make for a great value. Super happy with purchase.",
                "timestamp": "2014-06-05T21:49:00-05:00",
                "title": "Easy to grip, super powerful for size"
            }, {
                "rating": 5,
                "author": "renovator",
                "text": "This hammer is extremely well designed with it's large striking surface,flat top head, and shock absorbing handle. Very comfortable to use, and durable, having taken a severe beating on a gut demo-reno job. For the price and design, well worth having.",
                "timestamp": "2014-04-12T08:53:48-05:00",
                "title": "great features, great value"
            }]
        },
        parser;

    beforeEach(module('hdProWeb'));

    beforeEach(inject(function(reviewParser, Product) {
      parser = reviewParser;
    }));

    it('should parse the result correctly', function() {

        var res = parser(rawData);

        expect(JSON.stringify(res)).toEqual(JSON.stringify(preParsed));
    });
});
