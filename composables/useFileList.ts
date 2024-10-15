import type { SharepointFile } from "#imports";

export async function useFileList() {
  const NuxtApp = useNuxtApp();
  const fileList = useState<SharepointFile[]>(
    "map-files-and-folders",
    () => []
  );
  const nama = useState("map-files-and-folders", () => "evan");
  const isFetchingFileList= useState("fetching-file-list", () => false);

  async function getFileList() {
    isFetchingFileList.value = true;
    console.log(document, import.meta.client, process.server);
    const res = await $fetch(`/api/sites/map-files-and-folders`);
    fileList.value = res;
    isFetchingFileList.value = false;
  }
  await callOnce(getFileList);

  // NuxtApp.runWithContext(()=>{
  // })

  return { fileList, getFileList, isFetchingFileList};
}
