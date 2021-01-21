/** filters null values out of objects */
function filter(object: { [key: string]: any }) {
  Object.entries(object).forEach((entry: [string, any]) => {
    const [key, value] = entry;
    if (typeof value == "object") {
      return filter(value);
    }
    if (value == "" || value == null) {
      delete object[key];
    }
  });
  return object;
}

export default filter;
