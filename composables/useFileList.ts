// export const fileList=useState('fileList',$fetch)

export default async function(driveItemId: string){
  const folderId = useState('selected-folder-id', () => '');
  const files = useState('files-in-folder', () => []);
  const data = await $fetch(`/api/files`, {
    method: 'post',
    body: {
      driveItemId: driveItemId,
    },
  });
  files.value = data.files;
  folderId.value = data.driveItemId;
};