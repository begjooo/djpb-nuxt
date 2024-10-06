import { graphHandler} from "../utils/graphHandler";

const { defaultSiteId, defaultDriveId, defaultListId } = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const sites = await graphHandler.graphClient!.api(`/sites/${defaultSiteId}/drive/root/children?expand=listItem`).get();
  return sites;
});