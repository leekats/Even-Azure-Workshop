var app = angular.module('evenworkshop', ["ngRoute"]);
app.directive("card", () => {
    return {
        templateUrl: '/assets/directives/card.html',
        controller: 'card'
    };
});
app.controller('root', function ($scope, $http, $rootScope) {
    const getSasToken = (src) => {
        return new Promise((resolve, reject) => {
            $http({
                method: 'POST',
                url: "/azure/getDownloadSas/",
                data: {
                    container: src,
                }
            }).then((response) => {
                resolve(response.data.token);
            });
        })
    }

    const getData = async () => {
        return new Promise((resolve, reject) => {
            $http({
                method: 'GET',
                url: '/db/get/'
            }).then(async (response) => {
                resolve(response.data);
            }, (response) => {
                console.log(response);
            });
        });
    }

    const getStorageHost = async () => {
        return new Promise((resolve, reject) => {
            $http({
                method: 'GET',
                url: '/azure/getStorageHost/'
            }).then(async (response) => {
                resolve(response.data);
            }, (response) => {
                console.log(response);
            });
        });
    }

    $rootScope.cardImages = {};
    $scope.db = [];
    getSasToken("images").then((res) => { $rootScope.downSas = res });
    getStorageHost().then((res) => { $rootScope.storageHost = res });
    getData().then((res) => { $scope.db = res; $scope.$apply() });
});
