export const useArrowX = () => useState<string> ('arrow-x', () => 'useState: arrow x');

export function useFunctionX(){
  return useState<string> ('function-x', () => 'useState: function x');
};

export function useFunctionY(){
  const response = useState<string> ('function-y', () => 'useState: function y');
  return response;
};

export function useAngka100(){
  return useState<number> ('angka-100', () => {
    return 100;
  });
};

export function useRefVar2(){
  return ref(10);
};

export function useStateString(){
  console.log(`di dalam /composables/states.ts fungsi useStateString()`);
  const response = useState<string> ('string-input-1', () => '');
  console.log('response:', response);
  return response;
};

export function useRefString(){
  return ref('');
};

const dataLeak = ref('');
export function useRefString2(){
  console.log('dataLeak', dataLeak.value);
  return dataLeak;
};

export async function useInputFetch(input: string){
  const data = await $fetch(`/api/test-input`, {
    query: {
      isiData: input,
    },
  });
  return data;
};