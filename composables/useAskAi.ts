export default async function(input: string, fileId: string[]){
  const response = await $fetch(`/api/ask-ai/lintas-dokumen`, {
    method: 'post',
    body: {
      query: input,
      sources: fileId,
    },
  });
  return response;
};