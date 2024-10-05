import { graphClient} from "../init-graph";

const { defaultSiteId, defaultDriveId, defaultListId } = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const sites = await graphClient.api(`/sites/${defaultSiteId}/drive/root/children?expand=listItem`).get();
  return sites;
});