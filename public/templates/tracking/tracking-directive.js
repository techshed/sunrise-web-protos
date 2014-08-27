/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Deniz Arsan
 *
 * Details and Documentation: https://github.com/redbeacon/sunrise-web/wiki/Tracking
 */

angular.module('hdProWeb.tracking')

    .directive('hdTrackClick', ['Tracking', function (Tracking) {
        // On an html element, add following attributes:
        // * hd-track-click:                click event that you want to track (required)
        // * hd-track-click-properties:     any additional properties that you want to track (optional)
        return function (scope, el, attr) {
            var ev = [attr.hdTrackClick, 'Clicked'].join(' '),
                props;

            el.on('click', function () {
                if (attr.hdTrackClickProperties) {
                    props = JSON.parse(attr.hdTrackClickProperties);
                }
                Tracking.track(ev, props);
            });
        };
    }])

    .directive('hdTrackForm', ['Tracking', function (Tracking) {
        return function (scope, el, attr) {
            var fields, name, value,
                submitBtn = el.find('button[type=submit]'),
                formName = attr.hdTrackForm,
                trackingContext = {};

            submitBtn.on('click', function () {
                fields = el.serializeArray();
                for (var i = 0; i < fields.length; i++) {
                    name = fields[i].name;
                    value = fields[i].value;
                    trackingContext[name] =  value || null;
                }
                Tracking.track([formName, 'Form Submit'].join(' - '), trackingContext);
            });
        };
    }]);
