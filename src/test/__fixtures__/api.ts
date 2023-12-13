export const responseWrapper = (
  data: object | null,
  status: 'success' | 'error' = 'success',
  message: string = '',
  pagination: boolean = false
) => ({
  data: {
    ...data,
    ...(pagination && {
      pagination: {
        page: 1,
        totalPages: 2,
      },
    }),
  },
  status,
  message,
});
