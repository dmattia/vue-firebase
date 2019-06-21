/**
 * Ensures a value of type (Object | Array[String]) is converted to an Object.
 * If the value is already an object, it is returned unmutated. If the value
 * is an array, it is converted to an object where the keys are the values from
 * the array, with values hardcoded to true.
 *
 * Examples)
 *
 * > const a = { foo: "bar" };
 * > assert a === arrayToObject(a);
 * 
 * > const obj = { a: true, b: true, c: true };
 * > const array = ["a", "b", "c"];
 * > assert obj = arrayToObject(array);
 */
const arrayToObject = options => {
  if (!Array.isArray(options)) return options;

  optionsObj = {};
  options.forEach(opt => {
    optionsObj[opt] = true;
  });

  return optionsObj;
};

export {
  arrayToObject
};
