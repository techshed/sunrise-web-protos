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

    .constant('hdProWeb.Partials', '/static/core/app/shared/components/partials')

    .directive('hdSearchField', ['$state', '$timeout', 'autosuggest', 'hdProWeb.Partials', 'searchQuery',
        function($state, $timeout, autosuggest, Partials, searchQuery) {
            return {
                scope: {
                    placeholder: '@',
                    'class': '@'
                },
                link: function(scope, element, attrs) {

                    var timer = null,
                        previousQuery = '';

                    scope.selectedIndex = 0;
                    scope.suggestions = [];
                    scope.query = searchQuery.get();

                    scope.autosuggest = function(keyCode) {
                        switch (keyCode) {
                            case 40: // DOWNARROW
                                scope.selectedIndex++;
                                break;
                            case 38: // UPARROW
                                scope.selectedIndex--;
                                if (scope.selectedIndex < 0) {
                                    scope.selectedIndex = scope.suggestions.length - 1;
                                }
                                break;
                            case 13: // RETURN
                                if($('.Suggestion--selected').text()) {
                                    scope.selectSuggestion(
                                        // we might need jQuery after all
                                        $('.Suggestion--selected').text().replace(/^\s+|\s+$/g, '')
                                    );
                                }
                                break;
                            case 27: // ESC
                                scope.closeSuggestions();
                                break;
                            default: // Any Other Key
                                // debouncing
                                $timeout.cancel(timer);
                                timer = $timeout(function() {
                                    if (scope.query !== previousQuery) {
                                        if (scope.query) {
                                            scope.suggestions = autosuggest.fetch({
                                                q: scope.query
                                            });
                                            previousQuery = scope.query;
                                        } else {
                                            scope.suggestions = [];
                                        }
                                    }
                                }, 300);
                        }
                    };

                    scope.closeSuggestions = function() {
                        // wait a little so use can click
                        // on suggestion without suggestion
                        // getting closed
                        $timeout(function() {
                            scope.$apply(function() {
                                scope.suggestions = [];
                                scope.selectedIndex = 0;
                            });
                        }, 200);
                    };

                    scope.selectSuggestion = function(suggestion) {
                        scope.suggestions = [];
                        scope.selectedIndex = 0;
                        scope.query = suggestion;
                        scope.submit();
                    };

                    // Search submit
                    scope.submit = function() {
                        $state.transitionTo('search', {q: this.query});
                    };
                },
                templateUrl: Partials + '/search-field.html'
            };
        }
    ]);
