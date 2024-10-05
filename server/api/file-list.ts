import { mapFilesAndFolders } from "../services/sites";

export default defineEventHandler(async (event) => {
  const filesAndFolder = await mapFilesAndFolders('01KXXEPH4UOPPMFVEGGBDJI7QC2MX3CYFU');
  return filesAndFolder;
});