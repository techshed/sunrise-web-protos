/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Serkan Yersen
 */

describe('Pip Directives', function() {

    beforeEach(module('templates'));
    beforeEach(module('hdProWeb'));

    describe('hd-thumbnails', function() {

        var el, scope;

        beforeEach(inject(function($compile, $rootScope) {

            scope = $rootScope;

            scope.product = {
                images: [{
                    type: 'type',
                    xsmall: 'http://placehold.it/10x10/img1small',
                    large: 'http://placehold.it/10x10/img1large'
                }, {
                    type: 'type',
                    xsmall: 'http://placehold.it/10x10/img2small',
                    large: 'http://placehold.it/10x10/img2large'
                }]
            };

            el = angular.element('<div hd-thumbnails></div>');
            el = $compile(el)(scope);
            scope.$digest();

        }));

        it('should default to the first image as selected image', function() {
            expect(scope.selectedImage.large).toMatch('img1large');
        });

        it('should render 2 thumbnails', function() {
            expect($(el).find('.Thumbnail-image').length).toBe(2);
        });

        it('should have active class on the first image', function() {
            expect($(el).find('.Thumbnail-image').first().is('.Thumbnail-image--active')).toBe(true);
        });

        it('should have thumbnail two as the selected image when clicked', function() {
            scope.setSelectedImage(scope.product.images[1]);
            expect(scope.selectedImage.large).toMatch('img2large');
        });

        it('should have thumbnail one as the selected image when clicked', function() {
            scope.setSelectedImage(scope.product.images[0]);
            expect(scope.selectedImage.large).toMatch('img1large');
        });

    });

    describe('hd-specification-table', function() {

        var el, scope;

        beforeEach(inject(function($compile, $rootScope) {

            scope = $rootScope;

            scope.product = {
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
                }, {
                    "name": "Heat Resistant",
                    "value": "No"
                }]
            };

            el = angular.element('<div hd-specification-table data-visible="3" data-specifications="product.specifications"></div>');
            el = $compile(el)(scope);
            scope.$digest();
        }));

        it('should have 16 spec slots on the page', function() {
            expect($(el).find('.Specification-value').length).toBe(16);
        });

        it('should have 10 hidden spec slots on the page', function() {
            expect($(el).find('.ng-hide .Specification-value').length).toBe(10);
        });

        it('should say 9 more on show more button', function() {
            expect($(el).find('.Specification-showMore').text()).toMatch('10 more');
        });

        it('should show all specs when show more is clicked', function() {
            el.isolateScope().showAllSpecs();
            scope.$digest();
            expect($(el).find('.ng-hide .Specification-value').length).toBe(0);
        });

        it('should hide show more button when clicked', function() {
            el.isolateScope().showAllSpecs();
            scope.$digest();
            expect($(el).find('.Specification-showMore').is('.ng-hide')).toBe(true);
        });
    });

});
