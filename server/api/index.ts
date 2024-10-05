import { getGraphClient } from "../services/graph-credential";

const { defaultSiteId, defaultDriveId, defaultListId } = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const graphClient = await getGraphClient();
  const sites = await graphClient.api(`/sites/${defaultSiteId}/drive/root/children?expand=listItem`).get();
  return sites;
});