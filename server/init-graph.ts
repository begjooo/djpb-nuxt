import { ClientSecretCredential } from "@azure/identity";
import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";
// import { graphClient } from "./services/graph-credential-2";

const { azureClientId, azureTenantId, azureClientSecret } = useRuntimeConfig();

export let graphClient: Client;

export default async () => {
  console.log(`nitro plugins: initiate graph credential`);
  try {
    const credential = new ClientSecretCredential(
      azureTenantId,
      azureClientId,
      azureClientSecret,
    );

    const authProvider = new TokenCredentialAuthenticationProvider(credential, {
      scopes: ['https://graph.microsoft.com/.default'],
    });
    
    graphClient = Client.initWithMiddleware({ authProvider: authProvider });
  } catch (error) {
    console.log(error);
  };
};
