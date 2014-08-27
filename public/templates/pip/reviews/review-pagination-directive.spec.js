/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Serkan Yersen
 */

describe('Review Pagination Directive', function() {

    beforeEach(module('templates'));
    beforeEach(module('hdProWeb'));

    describe('hd-review-pagination', function() {

        var el, scope;

        beforeEach(inject(function($compile, $rootScope) {
            scope = $rootScope;

            scope.reviewPage = 1;
            scope.totalPages = 3;

            el = angular.element('<div hd-review-pagination></div>');
            el = $compile(el)(scope);
            scope.$digest();
        }));

        describe('First page', function() {
            it('should disable previous button on first page and enable next button', function() {
                // button states
                expect($(el).find('.Reviews-prevButton').is(':disabled')).toBe(true);
                expect($(el).find('.Reviews-nextButton').is(':disabled')).not.toBe(true);
            });

            it('should have correct summary for first page', function() {
                expect($(el).find('.Reviews-pageSummary').text()).toMatch('page 1 of 3');
            });
        });

        describe('Second page', function() {
            it('should enable previous button and next button', function() {
                // click next page
                el.scope().nextPage();
                scope.$digest();

                // button states
                expect($(el).find('.Reviews-prevButton').is(':disabled')).not.toBe(true);
                expect($(el).find('.Reviews-nextButton').is(':disabled')).not.toBe(true);
            });

            it('should have correct summary for first page', function() {
                // click next page
                el.scope().nextPage();
                scope.$digest();

                // updated text
                expect($(el).find('.Reviews-pageSummary').text()).toMatch('page 2 of 3');
            });
        });

        describe('Third and last page', function() {
            it('should enable previous button but disable next button', function() {
                // click next page
                el.scope().nextPage(); // second page
                el.scope().nextPage(); // third page
                scope.$digest();

                // button states
                expect($(el).find('.Reviews-prevButton').is(':disabled')).not.toBe(true);
                expect($(el).find('.Reviews-nextButton').is(':disabled')).toBe(true);
            });

            it('should have correct summary for first page', function() {
                // click next page
                el.scope().nextPage(); // second page
                el.scope().nextPage(); // third page
                scope.$digest();

                // updated text
                expect($(el).find('.Reviews-pageSummary').text()).toMatch('page 3 of 3');
            });
        });

        describe('Turn back to first page by clicking back', function() {

            it('should be able to go back, page by page', function() {
                // click next page
                el.scope().nextPage(); // second page
                el.scope().nextPage(); // third page
                scope.$digest();
                expect($(el).find('.Reviews-pageSummary').text()).toMatch('page 3 of 3');

                // now make sure it goes back
                el.scope().prevPage(); // second page
                scope.$digest();
                expect($(el).find('.Reviews-pageSummary').text()).toMatch('page 2 of 3');

                el.scope().prevPage(); // first page
                scope.$digest();
                expect($(el).find('.Reviews-pageSummary').text()).toMatch('page 1 of 3');
            });
        });
    });

});
