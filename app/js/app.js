'use strict';

angular.module('axis', ['axis.filters', 'axis.services', 'axis.directives', 'axis.controllers', 'localization'])
    .config(['$routeProvider', function($routeProvider) {

    }]);

$( document ).on( "pageinit", '[data-role="page"]', function() {
    $( document ).on( "swiperight", '[data-role="page"]', function( e ) {
        if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
            $.mobile.activePage.find("#main-left-panel").panel( "open" );
        }
    });
});