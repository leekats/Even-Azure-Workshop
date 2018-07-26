// An HTTP trigger Azure Function that returns a SAS token for Azure Storage for the specified container. 
// You can also optionally specify a particular blob name and access permissions. 
// To learn more, see https://github.com/Azure-Samples/functions-dotnet-sas-token/blob/master/README.md

var azure = require('azure-storage');
var config = require('../config');

module.exports.getDownloadSas = (req, res) => {
    if (req.body.container) {
        // The following values can be used for permissions: 
        // "a" (Add), "r" (Read), "w" (Write), "d" (Delete), "l" (List)
        // Concatenate multiple permissions, such as "rwa" = Read, Write, Add
        var result = generateSasToken(req, req.body.container, req.body.blobName, "r");
    } else {
        res.send({
            status: 400,
            body: "Specify a value for 'container'"
        });
    }
    res.send(result);
};

let generateSasToken = (context, container, blobName, permissions) => {
    const connString = config.connString;
    const blobService = azure.createBlobService(connString);

    // Create a SAS token that expires in an hour
    // Set start time to five minutes ago to avoid clock skew.
    let startDate = new Date();
    startDate.setMinutes(startDate.getMinutes() - 5);
    let expiryDate = new Date(startDate);
    expiryDate.setMinutes(startDate.getMinutes() + 60);

    permissions = permissions || azure.BlobUtilities.SharedAccessPermissions.READ;

    let sharedAccessPolicy = {
        AccessPolicy: {
            Permissions: permissions,
            Start: startDate,
            Expiry: expiryDate
        }
    };

    var sasToken = blobService.generateSharedAccessSignature(container, blobName, sharedAccessPolicy);

    return {
        token: sasToken,
        uri: blobService.getUrl(container, blobName, sasToken, true)
    };
}

module.exports.getStorageHost = (req, res) => {
    res.send(config.storagehost);
};