app.controller('card', function ($scope, $http, $rootScope) {

    // Creates the base64 image from binary
    const _arrayBufferToBase64 = (buffer) => {
        var binary = '';
        let bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    /* On card initialize, gets the picture from the result face storage, 
       and adds it to cardImages (base64) */
    $scope.addPic = (card) => {
        const stgUrl = $rootScope.storageHost;
        const sas = $rootScope.downSas;
        let theUrl = stgUrl + "images/" + card.blobName + '?' + sas;
        $http({
            method: 'GET',
            url: theUrl,
            responseType: "arraybuffer"
        }).then((response) => {
            $rootScope.cardImages[card.blobName] = _arrayBufferToBase64(response.data);
        }, (response) => {
            console.log(response);
        });
    }, (response) => {
        console.log(response);
    };
});