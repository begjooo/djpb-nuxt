export default async function(input: string){
  console.log(`[useWatcher()] ${new Date()} ${input}`);
  const data = await $fetch(`/api/check-update`);
  return data;
};