require ('dotenv').config();

const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');

const keyVaultUrl = `https://api-keys-give-give.vault.azure.net/`;
const credential = new DefaultAzureCredential();
const secretClient = new SecretClient(keyVaultUrl, credential);

async function initializeSecrets(){
    console.log("Fetching secrets...");

    try{
        //Fetch keys from key vault
        const blobConnectionString = await secretClient.getSecret('BlobAPIKey');
        const dbUserName = await secretClient.getSecret('DBUserName');
        const dbPassword = await secretClient.getSecret('DBPassword');
        const googleApiKey = await secretClient.getSecret('GoogleAPIKey');


        console.log(secrets.blobConnectionString)
        console.log(secrets.dbPassword)
        console.log(secrets.dbUserName)
        console.log(secrets.googleApiKey)
        //set secrets object values
        /*secrets.blobConnectionString = process.env.BLOB_CONNECTION_STRING;
        secrets.dbUserName = process.env.DB_USERNAME;
        secrets.dbPassword = process.env.DB_PASSWORD;
        secrets.googleApiKey = process.env.GOOGLE_API_KEY;*/

        console.log("Secrets succesfully fetched");
    }
    catch (error){
        console.log("Failed fetching secrets", error);
    }  
}

const secrets = {
    blobConnectionString: '',
    dbUserName: '',
    dbPassword: '',
    googleApiKey: ''
}

module.exports = { secrets, initializeSecrets };


