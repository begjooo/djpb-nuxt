import { getGraphClient } from "../services/graph-credential";
import { setMandatorySiteColumns, getDriveItem, fillMandatoryColumnContent } from "../services/sites";

export default defineEventHandler(async (event) => {
  const { driveItemId } = getQuery(event);
  const graphClient = await getGraphClient();

  // await setMandatorySiteColumns(graphClient);
  let file = await getDriveItem(graphClient, driveItemId);
  // await fillMandatoryColumnContent(graphClient, file);
  
  return file;
});