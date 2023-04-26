export function debounce(callback: (...args: any[]) => any, wait: number) {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    timer = setTimeout(() => callback.apply(this, args), wait);
  };
}
