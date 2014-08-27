/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Serkan Yersen
 */

angular.module('hdProWeb')
    .factory('productParser', ['Product', function(Product) {

        // default values for each value a product model may have
        var IMAGE_SIZE_LABELS = {
                '65': 'xsmall',
                '100': 'small',
                '145': 'medium',
                '300': 'large',
                '400': 'xlarge',
                '600': 'xxlarge',
                '1000': 'poster'
            },
            PREFFERED_FULFULLMENT = 'BOPIS',
            SECONDARY_FULFULLMENT = 'ShipToHome',
            FULFILLMENT_LABELS = {
                'BOPIS': 'Buy Online Pick Up in Store',
                'SHIPTOHOME': 'Ship to Home',
                'BOSS': 'Buy Online Ship To Store'
            };

        // Fixes homedepot development urls to production
        // because development image urls are not accessible
        // through vpn
        var fixImageUrl = function(url) {
            url = url.replace('origin.hd-qa71.homedepotdev.com', 'www.homedepot.com');
            url = url.replace('hd-qp71.homedepotdev.com', 'www.homedepot.com');
            url = url.replace('hd-qa74.homedepotdev.com', 'www.homedepot.com');
            return url;
        };

        // Extract product images from media files, organize them by size
        var extractImages = function(media, thumbnail_url) {

            var images = [{}];

            // make sure images always have all keys,
            // use place holder images for development
            // will set to empty string once on production
            if (media.length === 0) {
                _.each(IMAGE_SIZE_LABELS, function(value, key) {
                    images[0][value] = thumbnail_url;
                });
            } else {
                images = [];
            }

            // loop through media item if they exist and set each
            // image to their corresponding label for easy access
            _.each(media, function(value, key) {
                // Only handling image files for now
                if (value.media_type.indexOf("IMAGE") !== -1) {
                    var image = {};
                    _.each(value.sizes, function(value, k) {
                        // This replace is required because homedepot QA boxes are only
                        // accessible through certain networks
                        value.url = fixImageUrl(value.url);

                        // Set image URL to correct label
                        image[IMAGE_SIZE_LABELS[value.width]] = value.url;
                    });
                    image.type = value.media_type;
                    images.push(image);
                }
            });
            return images;
        };

        var getFulfillmentOptions = function(options) {
            var fulfillments = {};

            // If no fulfillment is returned just
            // set it to false, this can only happen
            // in development
            if (!options) {
                return false;
            }

            _.each(options, function(value) {
                fulfillments[value] = FULFILLMENT_LABELS[value.toUpperCase()] || value;
            });
            return fulfillments;
        };

        var getDefaultFulfillment = function(options) {
            // If no fulfillment is returned just
            // set it to false, this can only happen
            // in development
            if (!options) {
                return false;
            }

            if (PREFFERED_FULFULLMENT in options) {
                return PREFFERED_FULFULLMENT;
            }
            if (SECONDARY_FULFULLMENT in options) {
                return SECONDARY_FULFULLMENT;
            }

            // If primary or secondary selections
            // cannot be found pick the first one
            // in the list
            return Object.keys(options)[0];
        };

        return function (data, model) {
            var result = {};

            model = model || new Product();

            result.id = data.id;
            result.title = data.title;
            result.description = data.description;
            result.brandName = data.brand_name;
            result.price = data.price;
            result.originalPrice = data.price;
            result.discount = data.discount;
            result.inventoryCount = data.inventory_count;
            result.attributeGroups = data.attribute_groups;
            result.availability = data.availability;
            result.quantity = data.quantity;


            // Fulfillment options
            result.fulfillmentOptions = getFulfillmentOptions(data.fulfillment_options);
            result.defaultFulfillment = getDefaultFulfillment(result.fulfillmentOptions);

            if (data.attribute_groups) {
                result.specifications = data.attribute_groups.specifications;
                result.overview = data.attribute_groups.overview;
                result.pdfDocuments = data.attribute_groups.pdf_documents;
            }

            if (data.thumbnail_url) {
                data.thumbnail_url = fixImageUrl(data.thumbnail_url);
                result.thumbnailUrl = data.thumbnail_url;
            }

            result.images = extractImages(data.media || [], result.thumbnailUrl);

            if (data.rating_reviews) {
                result.averageRating = data.rating_reviews.average_rating;
                result.totalReviews = data.rating_reviews.total_reviews;
            }

            if (data.special_price) {
                result.price = data.special_price;
            }

            model.update(result);
            return model;
        };
    }]);
