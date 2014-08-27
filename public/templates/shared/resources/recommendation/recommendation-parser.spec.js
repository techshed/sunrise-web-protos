/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Serkan Yersen
 */

describe('Recommendation Parser', function() {

    var parser,
        rawData = {
            "products": [{
                "rating": 0.0,
                "price": 178.75,
                "thumbnail_url": "http://placehold.it/300",
                "id": 202040154,
                "title": "1800 PSI 1.4 GPM Electric Pressure Washer with Maintenance Free Pump"
            }, {
                "rating": 0.0,
                "price": 90.72,
                "thumbnail_url": "http://placehold.it/300",
                "id": 100655787,
                "title": "Commercial Grade Decorative Wire 6-Shelf Chrome finish Shelving Storage Unit"
            }],
            "success": true
        },
        preParsed = [{
            "title": "1800 PSI 1.4 GPM Electric Pressure Washer with Maintenance Free Pump",
            "description": "",
            "brandName": "",
            "price": 178.75,
            "inventoryCount": 0,
            "images": [{
                "xsmall": "http://placehold.it/300",
                "small": "http://placehold.it/300",
                "medium": "http://placehold.it/300",
                "large": "http://placehold.it/300",
                "xlarge": "http://placehold.it/300",
                "xxlarge": "http://placehold.it/300",
                "poster": "http://placehold.it/300"
            }],
            "originalPrice": 178.75,
            "discount": null,
            "thumbnailUrl": "http://placehold.it/300",
            "fulfillmentOptions": false,
            "defaultFulfillment": false,
            "availability": "",
            "pdfDocuments": [],
            "averageRating": 0,
            "totalReviews": 0,
            "empty": true,
            "id": 202040154
        }, {
            "title": "Commercial Grade Decorative Wire 6-Shelf Chrome finish Shelving Storage Unit",
            "description": "",
            "brandName": "",
            "price": 90.72,
            "inventoryCount": 0,
            "images": [{
                "xsmall": "http://placehold.it/300",
                "small": "http://placehold.it/300",
                "medium": "http://placehold.it/300",
                "large": "http://placehold.it/300",
                "xlarge": "http://placehold.it/300",
                "xxlarge": "http://placehold.it/300",
                "poster": "http://placehold.it/300"
            }],
            "originalPrice": 90.72,
            "discount": null,
            "thumbnailUrl": "http://placehold.it/300",
            "fulfillmentOptions": false,
            "defaultFulfillment": false,
            "availability": "",
            "pdfDocuments": [],
            "averageRating": 0,
            "totalReviews": 0,
            "empty": true,
            "id": 100655787
        }];

    beforeEach(module('hdProWeb'));

    beforeEach(inject(function(recommendationParser, Product) {
      parser = recommendationParser;
    }));

    it('should parse the result correctly', function() {
        var res = [];
        parser(rawData, res);

        expect(JSON.stringify(res)).toEqual(JSON.stringify(preParsed));
    });

});
