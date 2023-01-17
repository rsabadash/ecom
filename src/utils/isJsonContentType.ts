export const isJsonContentType = (response: Response): boolean => {
  const contentType = response.headers.get('content-type');

  return !contentType || !contentType.includes('application/json');
};
