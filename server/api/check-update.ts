let angka = 0;

export default defineEventHandler(async (event) => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  angka ++;
  return angka;
});