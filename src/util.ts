/**
 * waitAndReturn provides a typed promise return to assist with mocks
 */
export const waitAndReturn = <T>(inputVal: T): Promise<T> =>
  new Promise((res) => res(inputVal));
