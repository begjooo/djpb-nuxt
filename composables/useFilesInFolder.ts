export default async function(driveItemId: string){
  // const files = useState('files-in-folder', () => []);
  // const folderId = useState('selected-folder-id', () => '');
  const folderId = useState('current-folder-id');
  const files = useState('files-in-current-folder');
  console.log(folderId.value, files.value);

  const data: any = await $fetch(`/api/sites/files-in-folder`, {
    method: 'post',
    body: {
      driveItemId: driveItemId,
    },
  });

  files.value = data.files;
  folderId.value = data.driveItemId;
  console.log(folderId.value, files.value);
};