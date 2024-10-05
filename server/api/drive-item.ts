import { getDriveItem } from "../services/sites";

export default defineEventHandler(async (event) => {
  const { driveItemId } = getQuery(event);
  const file = await getDriveItem(driveItemId);
  console.log('jalan teros');
  return file;
});