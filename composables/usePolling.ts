export default async function(interval: number){
  const isPolling = useState('is-polling', () => false);
  const data = useState('watcher-var');
  
  async function watchData(){
    if(isPolling.value === false){
      isPolling.value = true;
      const response = await $fetch(`/api/check-update`);
      data.value = response;
      
      console.log(`fetch is done, wait for ${interval/1000} s`);
      await new Promise((resolve) => setTimeout(resolve, interval));
      isPolling.value = false;

      watchData();
    };
  };
  
  await callOnce(watchData);
};