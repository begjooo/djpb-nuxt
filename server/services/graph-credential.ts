import { ClientSecretCredential } from "@azure/identity";
import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";

const { azureClientId, azureTenantId, azureClientSecret } = useRuntimeConfig();

async function graphCredential(tenantId: string, clientId: string, clientSecret: string): Promise<Client> {
  const credential = new ClientSecretCredential(
    tenantId,
    clientId,
    clientSecret,
  );

  const authProvider = new TokenCredentialAuthenticationProvider(credential, {
    scopes: ['https://graph.microsoft.com/.default'],
  });

  const graphClient = Client.initWithMiddleware({ authProvider: authProvider });
  return graphClient;
};

export async function getGraphClient(): Promise<Client> {
  // console.log('graphClientId', azureClientId);
  // console.log('graphClientId', azureTenantId);
  // console.log('graphClientId', azureClientSecret);
  const graphClient = await graphCredential(azureTenantId, azureClientId, azureClientSecret);
  return graphClient;
};