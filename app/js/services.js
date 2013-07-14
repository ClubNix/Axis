'use strict';

var API_URL = 'http://192.168.1.8/dimension-api/public/api.php';

angular.module('axis.services', [])
    .value('version', '0.1')
    .factory('dimensionApi', function() {
        return new DimensionApi(API_URL);
    });
