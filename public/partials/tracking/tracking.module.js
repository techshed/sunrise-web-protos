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

angular.module('hdProWeb.tracking', [])

    .service('Tracking', [function() {
        // Tracks events using all available libraries
        this.track = function (ev, props) {
            // Google Analytics
            if (window._gaq) {
                window._gaq.push(['_trackEvent', 'Sunrise', ev]);
            }

            // Mixpanel
            if (window.mixpanel) {
                mixpanel.track(ev, props);
            }
        };

        this.trackLinks = function (selector, ev, props) {
            if (window.mixpanel) {
                mixpanel.track_links(selector, ev, props);
            }
        };

        this.register = function (superProps){
            if (window.mixpanel) {
                mixpanel.register(superProps);
            }
        };

        this.unregister = function (){
            if (window.mixpanel) {
                mixpanel.unregister("name");
                mixpanel.unregister("email");
            }
        };
    }]);
