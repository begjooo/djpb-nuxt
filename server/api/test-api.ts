import { getGraphClient } from "../services/graph-credential";

const { defaultSiteId, defaultDriveId, defaultListId } = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  // const { graphClient } = await readBody(event);
  const graphClient = await getGraphClient();
  const driveItems = await graphClient.api(`/sites/${defaultSiteId}/drive/root/children?expand=listItem`).get();
  return driveItems;
});