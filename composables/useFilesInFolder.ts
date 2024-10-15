export default async function(driveItemId: string){
  const files = useState('files-in-folder', () => []);
  const folderId = useState('selected-folder-id', () => '');

  const data: any = await $fetch(`/api/sites/files-in-folder`, {
    method: 'post',
    body: {
      driveItemId: driveItemId,
    },
  });

  files.value = data.files;
  folderId.value = data.driveItemId;
};