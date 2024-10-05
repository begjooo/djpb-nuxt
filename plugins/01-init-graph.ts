import { ClientSecretCredential } from "@azure/identity";
import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";

export default defineNuxtPlugin(async (nuxtApp) => {
  console.log(`plugins: initiate graph credential`);

  // const { azureClientId, azureTenantId, azureClientSecret } = useRuntimeConfig();
  // const credential = new ClientSecretCredential(
  //   azureTenantId,
  //   azureClientId,
  //   azureClientSecret,
  // );

  // const authProvider = new TokenCredentialAuthenticationProvider(credential, {
  //   scopes: ['https://graph.microsoft.com/.default'],
  // });
  
  // const graphClient = Client.initWithMiddleware({ authProvider: authProvider });
  
  return {
    provide: {
      graphClient: 'graphClient',
    },
  };
});