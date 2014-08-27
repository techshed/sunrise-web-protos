/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Serkan Yersen
 */

describe('Cart Parser', function() {

    var parser,
        model,
        rawProduct = {
            "line_items": [{
                "store_id": "0628",
                "product": {
                    "title": "Heavy-Duty Deck Scrub Brush",
                    "price": "$13.98",
                    "thumbnail_url": "TODO",
                    "id": 202523589,
                    "inventory_count": 9
                },
                "line_item_id": 410847073,
                "fulfillment": "BOPIS",
                "quantity": 1
            }],
            "store_id": 628,
            "success": true,
            "cart_subtotal": "$13.98",
            "last_modified_date": "2014-07-15T16:58:25.281",
            "item_count": 1,
            "in_store_item_count": 1,
            "sections": [{
                "line_items": [{
                    "store_id": "0628",
                    "product": {
                        "title": "Heavy-Duty Deck Scrub Brush",
                        "price": "$13.98",
                        "thumbnail_url": "TODO",
                        "id": 202523589,
                        "inventory_count": 9
                    },
                    "line_item_id": 410847073,
                    "fulfillment": "BOPIS",
                    "quantity": 1
                }],
                "fulfillment_option": "BOPIS",
                "title": "Pick up today"
            }],
            "cart_id": 201743537
        },
        preParsed = {
            "items": [{
                "id": 410847073,
                "store_id": null,
                "product": {
                    "title": "Heavy-Duty Deck Scrub Brush",
                    "description": "",
                    "brandName": "",
                    "price": "$13.98",
                    "inventoryCount": 9,
                    "images": [{
                        "xsmall": "TODO",
                        "small": "TODO",
                        "medium": "TODO",
                        "large": "TODO",
                        "xlarge": "TODO",
                        "xxlarge": "TODO",
                        "poster": "TODO"
                    }],
                    "originalPrice": "$13.98",
                    "discount": null,
                    "thumbnailUrl": "TODO",
                    "fulfillmentOptions": false,
                    "defaultFulfillment": false,
                    "availability": "",
                    "pdfDocuments": [],
                    "averageRating": 0,
                    "totalReviews": 0,
                    "empty": true,
                    "id": 202523589
                },
                "fulfillment": "BOPIS",
                "quantity": 1,
                "storeId": "0628"
            }],
            "storeId": 628,
            "success": true,
            "cartSubtotal": "$0.00",
            "lastModifiedDate": "2014-07-15T16:58:25.281",
            "itemCount": 1,
            "inStoreItemCount": 1,
            "sections": [{
                "title": "Pick up today",
                "fulfillment": "BOPIS",
                "cartItems": [{
                    "id": 410847073,
                    "store_id": null,
                    "product": {
                        "title": "Heavy-Duty Deck Scrub Brush",
                        "description": "",
                        "brandName": "",
                        "price": "$13.98",
                        "inventoryCount": 9,
                        "images": [{
                            "xsmall": "TODO",
                            "small": "TODO",
                            "medium": "TODO",
                            "large": "TODO",
                            "xlarge": "TODO",
                            "xxlarge": "TODO",
                            "poster": "TODO"
                        }],
                        "originalPrice": "$13.98",
                        "discount": null,
                        "thumbnailUrl": "TODO",
                        "fulfillmentOptions": false,
                        "defaultFulfillment": false,
                        "availability": "",
                        "pdfDocuments": [],
                        "averageRating": 0,
                        "totalReviews": 0,
                        "empty": true,
                        "id": 202523589
                    },
                    "fulfillment": "BOPIS",
                    "quantity": 1,
                    "storeId": "0628"
                }]
            }],
            "id": 201743537,
            "subtotal": "$13.98"
        };

    beforeEach(module('hdProWeb'));

    beforeEach(inject(function(cartParser, CartModel) {

        parser = cartParser;
        model = new CartModel();
    }));

    it('should parse the product correctly', function() {

        var parsed = parser(rawProduct, model);

        expect(JSON.stringify(parsed)).toEqual(JSON.stringify(preParsed));
    });

});
