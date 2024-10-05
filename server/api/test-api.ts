import { graphClient} from "../init-graph";

const { defaultSiteId, defaultDriveId, defaultListId } = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const driveItems = await graphClient.api(`/sites/${defaultSiteId}`).get();
  return driveItems;
});