interface IObject {
  [key: string]: any;
}

export const clearUndefinedValues = (object: IObject) => {
  Object.keys(object).map(key => {
    if (object[key] === undefined) {
      delete object[key];
    }
  });

  return object;
};
