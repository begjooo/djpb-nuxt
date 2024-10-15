export const useArrowX = () => useState<string> ('arrow-x', () => 'useState: arrow x');

export async function useInputFetch(input: string){
  const data = await $fetch(`/api/test-input`, {
    query: {
      isiData: input,
    },
  });
  return data;
};