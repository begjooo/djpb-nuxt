import { graphHandler } from "../utils/graphHandler";

export default defineEventHandler(async (event) => {
  await graphHandler.setMandatorySiteColumns();
  return 'set mandatory column success';
});