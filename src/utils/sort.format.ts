export const sortFormat = (sorts: { [key: string]: string }[]) =>
  sorts.reduce((result, item) => {
    return { ...result, ...item };
  }, {});
