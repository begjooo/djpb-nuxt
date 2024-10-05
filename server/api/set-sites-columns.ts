import { setMandatorySiteColumns } from "../services/sites";

export default defineEventHandler(async (event) => {
  await setMandatorySiteColumns();
  return 'set mandatory column success';
});