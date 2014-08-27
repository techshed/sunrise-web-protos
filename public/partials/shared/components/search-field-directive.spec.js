/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Serkan Yersen
 */

describe('Search Field Directive', function() {

    beforeEach(module('templates'));
    beforeEach(module('hdProWeb'));

    describe('hd-search-field', function() {
        var el, scope, isolateScope;

        beforeEach(inject(function($compile, $rootScope) {

            scope = $rootScope;

            el = angular.element('<div hd-search-field></div>');
            $compile(el)(scope);
            scope.$digest();
            isolateScope = el.isolateScope();
            isolateScope.suggestions = ['hammer', 'hammer drill', 'hammer tacker', 'hammer drill bits', 'hammer drill corded'];
            scope.$digest();

        }));

        it('should have get an autosuggest list when typed', function() {
            expect( $(el).find('.Suggestion').length ).toBe(5);
        });

        it('should have the first one selected', function() {
            expect( $(el).find('.Suggestion').first().is('.Suggestion--selected') ).toBe(true);
        });

        it('should move to next suggestion when down arrow clicked', function() {

            isolateScope.autosuggest(40);
            scope.$digest();

            expect( $(el).find('.Suggestion').first().next().is('.Suggestion--selected') ).toBe(true);
        });

        it('should select the last item when clicked up button, on the first item', function() {

            isolateScope.autosuggest(38);
            scope.$digest();

            expect( $(el).find('.Suggestion').last().is('.Suggestion--selected') ).toBe(true);
        });

        it('should go to the previous item when up button is clicked', function() {
            isolateScope.autosuggest(40);
            scope.$digest();

            expect( $(el).find('.Suggestion').first().next().is('.Suggestion--selected') ).toBe(true);

            isolateScope.autosuggest(38);
            scope.$digest();

            expect( $(el).find('.Suggestion').first().is('.Suggestion--selected') ).toBe(true);
        });

        it('should go back to first item when clicked up on last item', function() {
            isolateScope.autosuggest(40);
            isolateScope.autosuggest(40);
            isolateScope.autosuggest(40);
            isolateScope.autosuggest(40);
            scope.$digest();

            expect( $(el).find('.Suggestion').last().is('.Suggestion--selected') ).toBe(true);

            isolateScope.autosuggest(40);
            scope.$digest();

            expect( $(el).find('.Suggestion').first().is('.Suggestion--selected') ).toBe(true);
        });
    });

});
