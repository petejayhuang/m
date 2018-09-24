export const buildQueryStringFromObject = object =>
  Object.keys(object).reduce((queryString, objectKey) => {
    return `${queryString}&${objectKey}=${object[objectKey]}`
  }, '')
