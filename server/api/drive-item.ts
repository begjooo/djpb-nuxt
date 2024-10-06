import { graphHandler } from "../utils/graphHandler";

export default defineEventHandler(async (event) => {
  const { driveItemId } = getQuery(event);
  const file = await graphHandler.getDriveItem(driveItemId);
  console.log('jalan teros');
  return file;
});