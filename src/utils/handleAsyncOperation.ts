import _ from 'lodash';

type InputHelpersType = {
  onSuccess: (result: any) => void;
  onError: (error: string) => void;
  fallbackErrorMsg?: string;
  expectEmptyResponse?: boolean;
};

/**
 * Wrapper for handling async operations in cases where it's too complicated to handle with RTK-Query helpers.
 * It's a simple wrapper around try/catch block which provides { onSuccess, onError } callbacks for side-effects handling.
 *
 * @param submitFn - async function to be executed
 * @param onSuccess - callback to be executed in case of success.
 * @param onError - callback to be executed in case of error.
 * @param expectEmptyResponse - optional param to handle DELETE -> 204 requests
 */
export default async function handleAsyncOperation(
  submitFn: () => Promise<any>,
  {
    onSuccess,
    onError,
    fallbackErrorMsg = 'Unknown error happened.',
    expectEmptyResponse = false,
  }: InputHelpersType
) {
  try {
    const result = await submitFn();
    if (
      !expectEmptyResponse &&
      _.get(result, ['data', 'status'], 'error') === 'error'
    ) {
      const error = _.get(
        result,
        ['error', 'data', 'message'],
        _.get(result, 'message', fallbackErrorMsg)
      );
      onError(error);
      return;
    }
    onSuccess(result);
  } catch (error: any) {
    const errorMsg = _.get(error, 'message', fallbackErrorMsg);
    onError(errorMsg);
  }
}
