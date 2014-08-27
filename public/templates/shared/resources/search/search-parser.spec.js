/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Serkan Yersen
 */

describe('Search Parser', function() {

    var rawData = {
            "corrected_keyword": null,
            "total_products": 2,
            "products": [{
                "thumbnail_url": "http://placehold.it/65",
                "title": "22 oz. Milled-Face Framing Hammer",
                "fulfillment_options": ["ShipToHome"],
                "price": "$27.68",
                "inventory_count": null,
                "availability": "Shared",
                "brand_name": "Estwing",
                "special_price": "$27.68",
                "id": 100054288
            }, {
                "thumbnail_url": "http://placehold.it/65",
                "title": "20 oz. Steel Rip Hammer",
                "fulfillment_options": ["BOPIS"],
                "price": "$18.96",
                "inventory_count": 7,
                "availability": "Browse Only",
                "brand_name": "Husky",
                "special_price": "$18.96",
                "id": 202065950
            }],
            "success": true,
            "keyword": "hammer"
        },
        preParsed = {
            "products": [{
                "title": "22 oz. Milled-Face Framing Hammer",
                "description": "",
                "brandName": "Estwing",
                "price": "$27.68",
                "inventoryCount": null,
                "images": [{
                    "xsmall": "http://placehold.it/65",
                    "small": "http://placehold.it/65",
                    "medium": "http://placehold.it/65",
                    "large": "http://placehold.it/65",
                    "xlarge": "http://placehold.it/65",
                    "xxlarge": "http://placehold.it/65",
                    "poster": "http://placehold.it/65"
                }],
                "originalPrice": "$27.68",
                "discount": null,
                "thumbnailUrl": "http://placehold.it/65",
                "fulfillmentOptions": {
                    "ShipToHome": "Ship to Home"
                },
                "defaultFulfillment": "ShipToHome",
                "availability": "Shared",
                "pdfDocuments": [],
                "averageRating": 0,
                "totalReviews": 0,
                "empty": true,
                "id": 100054288
            }, {
                "title": "20 oz. Steel Rip Hammer",
                "description": "",
                "brandName": "Husky",
                "price": "$18.96",
                "inventoryCount": 7,
                "images": [{
                    "xsmall": "http://placehold.it/65",
                    "small": "http://placehold.it/65",
                    "medium": "http://placehold.it/65",
                    "large": "http://placehold.it/65",
                    "xlarge": "http://placehold.it/65",
                    "xxlarge": "http://placehold.it/65",
                    "poster": "http://placehold.it/65"
                }],
                "originalPrice": "$18.96",
                "discount": null,
                "thumbnailUrl": "http://placehold.it/65",
                "fulfillmentOptions": {
                    "BOPIS": "Buy Online Pick Up in Store"
                },
                "defaultFulfillment": "BOPIS",
                "availability": "Browse Only",
                "pdfDocuments": [],
                "averageRating": 0,
                "totalReviews": 0,
                "empty": true,
                "id": 202065950
            }],
            "success": true,
            "keyword": "hammer",
            "totalProducts": 2,
            "correctedKeyword": null
        },
        parser;

    beforeEach(module('hdProWeb'));

    beforeEach(inject(function(searchParser, Product) {
      parser = searchParser;
    }));

    it('should parse the result correctly', function() {

        var res = {};
        parser(rawData, res);

        expect(JSON.stringify(res)).toEqual(JSON.stringify(preParsed));
    });
});
