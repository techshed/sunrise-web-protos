/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Serkan Yersen
 */

 /**
  * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
  *
  * This code, and all derivative work, is the exclusive property of
  * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
  * authorization.
  *
  * Author: Serkan Yersen
  */

 describe('Cart Item Parser', function() {

     var parser,
         model,
         rawProduct = {
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
         },
         preParsed = {"id":410847073,"store_id":null,"product":{"title":"Heavy-Duty Deck Scrub Brush","description":"","brandName":"","price":"$13.98","inventoryCount":9,"images":[{"xsmall":"TODO","small":"TODO","medium":"TODO","large":"TODO","xlarge":"TODO","xxlarge":"TODO","poster":"TODO"}],"originalPrice": "$13.98","discount": null,"thumbnailUrl":"TODO","fulfillmentOptions":false,"defaultFulfillment":false,"availability":"","pdfDocuments":[],"averageRating":0,"totalReviews":0,"empty":true,"id":202523589},"fulfillment":"BOPIS","quantity":1,"storeId":"0628"};

     beforeEach(module('hdProWeb'));

     beforeEach(inject(function(cartItemParser, CartItemModel) {

         parser = cartItemParser;
         model = new CartItemModel();
     }));

     it('should parse the product correctly', function() {

         var parsed = parser(rawProduct, model);

         expect(JSON.stringify(parsed)).toEqual(JSON.stringify(preParsed));
     });

 });
