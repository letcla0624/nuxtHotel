export function useThousands(num: number) {
  let comma = /\B(?=(\d{3})+(?!\d))/g;
  return num?.toString().replace(comma, ",").replace(/ /g, "\u00a0");
}
