import { getGraphClient } from "../services/graph-credential";
import { updateSiteColumns } from "../services/sites";

export default defineEventHandler(async (event) => {
  const { itemId, columnName } = await readBody(event);
  const graphClient = await getGraphClient();
  await updateSiteColumns(graphClient, itemId, {
    [columnName]: null,
  });
  console.log(`delete ${columnName} column value done`)
  return `delete ${columnName} column value done`;
});