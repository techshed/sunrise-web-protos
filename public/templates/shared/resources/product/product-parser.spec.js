/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Serkan Yersen
 */

describe('Product Parser', function() {

    var parser,
        model,
        rawProduct = {
            "description": "Help entertain on pleasant summer evenings...",
            "success": true,
            "title": "40 LED Outdoor Umbrella Light",
            "media": [{
                "media_type": "IMAGE",
                "sizes": [{
                    "url": "http://placehold.it/10/img-1-65",
                    "width": 65,
                    "height": 65
                }, {
                    "url": "http://placehold.it/10/img-1-100",
                    "width": 100,
                    "height": 100
                }, {
                    "url": "http://placehold.it/10/img-1-145",
                    "width": 145,
                    "height": 145
                }, {
                    "url": "http://placehold.it/10/img-1-300",
                    "width": 300,
                    "height": 300
                }, {
                    "url": "http://placehold.it/10/img-1-400",
                    "width": 400,
                    "height": 400
                }, {
                    "url": "http://placehold.it/10/img-1-600",
                    "width": 600,
                    "height": 600
                }, {
                    "url": "http://placehold.it/10/img-1-1000",
                    "width": 1000,
                    "height": 1000
                }]
            }, {
                "media_type": "IMAGE_LEFT_VIEW",
                "sizes": [{
                    "url": "http://placehold.it/10/img-1-65",
                    "width": 65,
                    "height": 65
                }, {
                    "url": "http://placehold.it/10/img-1-100",
                    "width": 100,
                    "height": 100
                }, {
                    "url": "http://placehold.it/10/img-1-145",
                    "width": 145,
                    "height": 145
                }, {
                    "url": "http://placehold.it/10/img-1-300",
                    "width": 300,
                    "height": 300
                }, {
                    "url": "http://placehold.it/10/img-1-400",
                    "width": 400,
                    "height": 400
                }, {
                    "url": "http://placehold.it/10/img-1-600",
                    "width": 600,
                    "height": 600
                }, {
                    "url": "http://placehold.it/10/img-1-1000",
                    "width": 1000,
                    "height": 1000
                }]
            }, {
                "media_type": "IMAGE_TOP_VIEW",
                "sizes": [{
                    "url": "http://placehold.it/10/img-1-65",
                    "width": 65,
                    "height": 65
                }, {
                    "url": "http://placehold.it/10/img-1-100",
                    "width": 100,
                    "height": 100
                }, {
                    "url": "http://placehold.it/10/img-1-145",
                    "width": 145,
                    "height": 145
                }, {
                    "url": "http://placehold.it/10/img-1-300",
                    "width": 300,
                    "height": 300
                }, {
                    "url": "http://placehold.it/10/img-1-400",
                    "width": 400,
                    "height": 400
                }, {
                    "url": "http://placehold.it/10/img-1-600",
                    "width": 600,
                    "height": 600
                }, {
                    "url": "http://placehold.it/10/img-1-1000",
                    "width": 1000,
                    "height": 1000
                }]
            }],
            "price": "",
            "attribute_groups": {
                "pdf_documents": [],
                "overview": [{
                    "name": "Bullet01",
                    "value": "Bronze finish for a classic style"
                }, {
                    "name": "Bullet02",
                    "value": "Amber light reduces the attraction of insects and white light illuminates property"
                }, {
                    "name": "Bullet03",
                    "value": "Designed to let you choose to point uplight or downlight"
                }, {
                    "name": "Bullet04",
                    "value": "Clamps easily to umbrella stands and detaches with quick release button"
                }, {
                    "name": "Bullet05",
                    "value": "Super bright LED lights with selectable dimmer for convenience"
                }, {
                    "name": "Bullet06",
                    "value": "Requires batteries"
                }],
                "specifications": [{
                    "name": "Assembled Depth (in.)",
                    "value": "7 in"
                }, {
                    "name": "Assembled Height (in.)",
                    "value": "2.75 in"
                }, {
                    "name": "Assembled Width (in.)",
                    "value": "7 in"
                }, {
                    "name": "Exterior Lighting Product Type",
                    "value": "Specialty Light"
                }, {
                    "name": "Light Source",
                    "value": "LED"
                }, {
                    "name": "MFG Brand Name",
                    "value": "Rite Lite"
                }, {
                    "name": "MFG Model #",
                    "value": "LPL1040BX"
                }, {
                    "name": "MFG Part #",
                    "value": "LPL1040BX"
                }, {
                    "name": "Manufacturer Warranty",
                    "value": "2 year limited"
                }, {
                    "name": "Product Height (in.)",
                    "value": "2.75 in"
                }, {
                    "name": "Product Length (in.)",
                    "value": "7 in"
                }, {
                    "name": "Product Weight (lb.)",
                    "value": "1 lb"
                }, {
                    "name": "Product Width (in.)",
                    "value": "7 in"
                }, {
                    "name": "Returnable",
                    "value": "30-Day"
                }, {
                    "name": "Weather Resistant",
                    "value": "No"
                }]
            },
            "brand_name": "Rite Lite",
            "special_price": "",
            "availability": "Online",
            "thumbnail_url": "http://placehold.it/10/img-1-65",
            "inventory_count": null,
            "fulfillment_options": ["ShipToHome"],
            "rating_reviews": {
                "average_rating": 3.5,
                "total_reviews": 85
            },
            "id": 202218469
        },
        preParsed = {
            "title": "40 LED Outdoor Umbrella Light",
            "description": "Help entertain on pleasant summer evenings...",
            "brandName": "Rite Lite",
            "price": "",
            "inventoryCount": null,
            "images": [{
                "xsmall": "http://placehold.it/10/img-1-65",
                "small": "http://placehold.it/10/img-1-100",
                "medium": "http://placehold.it/10/img-1-145",
                "large": "http://placehold.it/10/img-1-300",
                "xlarge": "http://placehold.it/10/img-1-400",
                "xxlarge": "http://placehold.it/10/img-1-600",
                "poster": "http://placehold.it/10/img-1-1000",
                "type": "IMAGE"
            }, {
                "xsmall": "http://placehold.it/10/img-1-65",
                "small": "http://placehold.it/10/img-1-100",
                "medium": "http://placehold.it/10/img-1-145",
                "large": "http://placehold.it/10/img-1-300",
                "xlarge": "http://placehold.it/10/img-1-400",
                "xxlarge": "http://placehold.it/10/img-1-600",
                "poster": "http://placehold.it/10/img-1-1000",
                "type": "IMAGE_LEFT_VIEW"
            }, {
                "xsmall": "http://placehold.it/10/img-1-65",
                "small": "http://placehold.it/10/img-1-100",
                "medium": "http://placehold.it/10/img-1-145",
                "large": "http://placehold.it/10/img-1-300",
                "xlarge": "http://placehold.it/10/img-1-400",
                "xxlarge": "http://placehold.it/10/img-1-600",
                "poster": "http://placehold.it/10/img-1-1000",
                "type": "IMAGE_TOP_VIEW"
            }],
            "originalPrice": "",
            "discount": null,
            "thumbnailUrl": "http://placehold.it/10/img-1-65",
            "fulfillmentOptions": {
                "ShipToHome": "Ship to Home"
            },
            "defaultFulfillment": "ShipToHome",
            "availability": "Online",
            "pdfDocuments": [],
            "averageRating": 3.5,
            "totalReviews": 85,
            "empty": true,
            "id": 202218469,
            "attributeGroups": {
                "pdf_documents": [],
                "overview": [{
                    "name": "Bullet01",
                    "value": "Bronze finish for a classic style"
                }, {
                    "name": "Bullet02",
                    "value": "Amber light reduces the attraction of insects and white light illuminates property"
                }, {
                    "name": "Bullet03",
                    "value": "Designed to let you choose to point uplight or downlight"
                }, {
                    "name": "Bullet04",
                    "value": "Clamps easily to umbrella stands and detaches with quick release button"
                }, {
                    "name": "Bullet05",
                    "value": "Super bright LED lights with selectable dimmer for convenience"
                }, {
                    "name": "Bullet06",
                    "value": "Requires batteries"
                }],
                "specifications": [{
                    "name": "Assembled Depth (in.)",
                    "value": "7 in"
                }, {
                    "name": "Assembled Height (in.)",
                    "value": "2.75 in"
                }, {
                    "name": "Assembled Width (in.)",
                    "value": "7 in"
                }, {
                    "name": "Exterior Lighting Product Type",
                    "value": "Specialty Light"
                }, {
                    "name": "Light Source",
                    "value": "LED"
                }, {
                    "name": "MFG Brand Name",
                    "value": "Rite Lite"
                }, {
                    "name": "MFG Model #",
                    "value": "LPL1040BX"
                }, {
                    "name": "MFG Part #",
                    "value": "LPL1040BX"
                }, {
                    "name": "Manufacturer Warranty",
                    "value": "2 year limited"
                }, {
                    "name": "Product Height (in.)",
                    "value": "2.75 in"
                }, {
                    "name": "Product Length (in.)",
                    "value": "7 in"
                }, {
                    "name": "Product Weight (lb.)",
                    "value": "1 lb"
                }, {
                    "name": "Product Width (in.)",
                    "value": "7 in"
                }, {
                    "name": "Returnable",
                    "value": "30-Day"
                }, {
                    "name": "Weather Resistant",
                    "value": "No"
                }]
            },
            "specifications": [{
                "name": "Assembled Depth (in.)",
                "value": "7 in"
            }, {
                "name": "Assembled Height (in.)",
                "value": "2.75 in"
            }, {
                "name": "Assembled Width (in.)",
                "value": "7 in"
            }, {
                "name": "Exterior Lighting Product Type",
                "value": "Specialty Light"
            }, {
                "name": "Light Source",
                "value": "LED"
            }, {
                "name": "MFG Brand Name",
                "value": "Rite Lite"
            }, {
                "name": "MFG Model #",
                "value": "LPL1040BX"
            }, {
                "name": "MFG Part #",
                "value": "LPL1040BX"
            }, {
                "name": "Manufacturer Warranty",
                "value": "2 year limited"
            }, {
                "name": "Product Height (in.)",
                "value": "2.75 in"
            }, {
                "name": "Product Length (in.)",
                "value": "7 in"
            }, {
                "name": "Product Weight (lb.)",
                "value": "1 lb"
            }, {
                "name": "Product Width (in.)",
                "value": "7 in"
            }, {
                "name": "Returnable",
                "value": "30-Day"
            }, {
                "name": "Weather Resistant",
                "value": "No"
            }],
            "overview": [{
                "name": "Bullet01",
                "value": "Bronze finish for a classic style"
            }, {
                "name": "Bullet02",
                "value": "Amber light reduces the attraction of insects and white light illuminates property"
            }, {
                "name": "Bullet03",
                "value": "Designed to let you choose to point uplight or downlight"
            }, {
                "name": "Bullet04",
                "value": "Clamps easily to umbrella stands and detaches with quick release button"
            }, {
                "name": "Bullet05",
                "value": "Super bright LED lights with selectable dimmer for convenience"
            }, {
                "name": "Bullet06",
                "value": "Requires batteries"
            }]
        };

    beforeEach(module('hdProWeb'));

    beforeEach(inject(function(productParser, Product) {

        parser = productParser;
        model = new Product();
    }));

    it('should parse the product correctly', function() {

        var parsed = parser(rawProduct, model);
        expect(JSON.stringify(parsed)).toEqual(JSON.stringify(preParsed));
    });

    it('should use thumbnail as image when there are no images', function() {
        rawProduct.media = [];
        preParsed.images = [{
            "xsmall": "http://placehold.it/10/img-1-65",
            "small": "http://placehold.it/10/img-1-65",
            "medium": "http://placehold.it/10/img-1-65",
            "large": "http://placehold.it/10/img-1-65",
            "xlarge": "http://placehold.it/10/img-1-65",
            "xxlarge": "http://placehold.it/10/img-1-65",
            "poster": "http://placehold.it/10/img-1-65"
        }];
        var parsed = parser(rawProduct, model);

        expect(JSON.stringify(parsed)).toEqual(JSON.stringify(preParsed));
    });

});
