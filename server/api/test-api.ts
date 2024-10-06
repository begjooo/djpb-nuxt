import { graphHandler } from "../utils/graphHandler";

const { defaultSiteId, defaultDriveId, defaultListId } = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const driveItems = await graphHandler.graphClient!.api(`/sites/${defaultSiteId}`).get();
  return driveItems;
});