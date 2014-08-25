/**
 * Copyright 2014 Red Beacon, Inc. - All Rights Reserved
 *
 * This code, and all derivative work, is the exclusive property of
 * Red Beacon, Inc. and may not be used without Red Beacon, Inc.'s
 * authorization.
 *
 * Author: Caner Balci
 */

(function(){
'use strict';

// simple debounce
var debounce = function(fn, delay) {
    var timeoutId;
    return function() {
        var context = this,
            args = arguments;
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(function() {
            fn.apply(context, args);
        }, delay);
    };
};

angular.module('deviceDetection', ['ng'])

    // device width limits
    .constant('deviceDetection.MobileMaxWidth', 767)
    .constant('deviceDetection.TabletMaxWidth', 991)
    .constant('deviceDetection.SmallDesktopMaxWidth', 1199)

    // bootstrap snap points
    .constant('deviceDetection.ScreenXs', 'screen-xs')
    .constant('deviceDetection.ScreenSm', 'screen-sm')
    .constant('deviceDetection.ScreenMd', 'screen-md')
    .constant('deviceDetection.ScreenLg', 'screen-lg')

    // event names
    .constant('deviceDetection.DevicePropertyChanged', 'DevicePropertyChanged')
    .constant('deviceDetection.DeviceScreenSizeChanged', 'DeviceScreenSizeChanged')
    .constant('deviceDetection.DeviceOrientationChanged', 'DeviceOrientationChanged')
    .constant('deviceDetection.DeviceSnapPointChanged', 'DeviceSnapPointChanged')

    // orientation name constants
    .constant('deviceDetection.DeviceOrientationLandscape', 'DeviceOrientationLandscape')
    .constant('deviceDetection.DeviceOrientationPortrait', 'DeviceOrientationPortrait')

    .factory('device', ['$rootScope',
                        '$window',
                        'deviceDetection.MobileMaxWidth',
                        'deviceDetection.SmallDesktopMaxWidth',
                        'deviceDetection.ScreenLg',
                        'deviceDetection.ScreenMd',
                        'deviceDetection.ScreenSm',
                        'deviceDetection.ScreenXs',
                        'deviceDetection.TabletMaxWidth',
                        'deviceDetection.DevicePropertyChanged',
                        'deviceDetection.DeviceScreenSizeChanged',
                        'deviceDetection.DeviceSnapPointChanged',
                        'deviceDetection.DeviceOrientationChanged',
                        'deviceDetection.DeviceOrientationLandscape',
                        'deviceDetection.DeviceOrientationPortrait',

        function($rootScope,
                 $window,
                 MobileMaxWidth,
                 SmallDesktopMaxWidth,
                 ScreenLg,
                 ScreenMd,
                 ScreenSm,
                 ScreenXs,
                 TabletMaxWidth,
                 DevicePropertyChanged,
                 DeviceScreenSizeChanged,
                 DeviceSnapPointChanged,
                 DeviceOrientationChanged,
                 DeviceOrientationLandscape,
                 DeviceOrientationPortrait) {

            var device,
                ua;

            device = {};
            device.userAgent = ua = navigator.userAgent || navigator.vendor || $window.opera;
            device.isSmartDevice = /iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/.test(ua);
            device.viewportWidth = $window.innerWidth;
            device.viewportHeight = $window.innerHeight;

            // assuming devicePixelRatio == 1 for browsers other than webkit and ff
            device.pixelRatio = $window.devicePixelRatio || 1;
            device.orientation = DeviceOrientationPortrait;

            var onWidthChanged = function() {
                var screenWidth = $window.innerWidth,
                    originalSnapPoint = device.snapPoint;

                if (device.isSmartDevice) {
                    device.viewportWidth = screenWidth;
                    device.viewportHeight = $window.innerHeight;
                    device.isMobile = (screenWidth <= MobileMaxWidth);
                    device.isTablet = (screenWidth > MobileMaxWidth);
                    device.isDesktop = false;
                } else {
                    device.viewportWidth = screenWidth;
                    device.viewportHeight = $window.innerHeight;
                    device.isMobile = device.isTablet = false;
                    device.isDesktop = true;
                }

                // detect current bootstrap snap point
                if (screenWidth <= MobileMaxWidth) {
                    device.snapPoint = ScreenXs;
                } else if (screenWidth <= TabletMaxWidth) {
                    device.snapPoint = ScreenSm;
                } else if (screenWidth <= SmallDesktopMaxWidth) {
                    device.snapPoint = ScreenMd;
                } else {
                    device.snapPoint = ScreenLg;
                }

                if (device.snapPoint !== originalSnapPoint) {
                    onDevicePropertyChanged(DeviceSnapPointChanged);
                }

                onDevicePropertyChanged(DeviceScreenSizeChanged);
            };

            var onOrientationChanged = function() {
                switch($window.orientation){
                    case -90:
                    case 90:
                        device.orientation = DeviceOrientationLandscape;
                        onDevicePropertyChanged(DeviceOrientationChanged);
                    break;
                    default:
                        device.orientation = DeviceOrientationPortrait;
                        onDevicePropertyChanged(DeviceOrientationChanged);
                    break;
                }
            };

            var onDevicePropertyChanged = function(event){
                $rootScope.$emit(event);
                $rootScope.$emit(DevicePropertyChanged);
            };

            angular.element($window).on('resize', debounce(onWidthChanged, 200));
            angular.element($window).on('orientationchange', debounce(onOrientationChanged, 200));
            onWidthChanged();
            onOrientationChanged();

            return device;
        }
    ]);

})();
