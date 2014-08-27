/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Ben Clark
 */

angular.module('hdProWeb.category')

    .service('CategoryStack', ['$q',
                               'categories',
                               'Category',

        function($q, categories, Category) {

            this.stack = [];
            this.current = new Category();

            this.hasEntries = function() {
                return stack.length > 0;
            };

            this.browseTo = function(categoryId) {
                // If the current stack contains the requested Id, fetch the model from the stack
                // This occurs when the browser's back button is pressed.
                if (this.contains(categoryId)) {
                    this.popTo(categoryId);
                }

                // If the current data model has a child category with the requested Id,
                // push the new Id. This occurs when the browser's forward button is pressed.
                else if (this.current.containsChildCategory(categoryId)) {
                    this.push(categoryId);
                }

                // Otherwise the user is requesting a new category, so wipe the stack.
                // This occurs on a fresh landing or when a category is selected from the drop down menu.
                else {
                    this.clear();
                    this.push(categoryId);
                }
            };

            this.contains = function(categoryId) {
                var result;

                result = _.find(this.stack, function(element) {
                    return element.id === categoryId;
                });

                return result;
            };

            this.push = function(categoryId) {
                categories.fetch({ id: categoryId }).then(function(data) {
                    this.current = data;
                    this.stack.push(data);
                }.bind(this));
            };

            this.popTo = function(id) {
                var category = false;

                this.stack.some(function(element, index, array) {
                    if (element.id === id) {
                        this.current = element;
                        array.splice(index + 1, array.length);
                        return this.current;
                    }
                }.bind(this));

                return category;
            };

            this.clear = function() {
                this.stack.length = 0;
                this.current = new Category();
            };
        }
    ]);
