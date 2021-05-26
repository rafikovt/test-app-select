export const flatten = (arr) => {
    let flattened = []
    for (let item of arr) {
      if (Array.isArray(item)) {
        console.log(item)
        flatten(item);
      } else {
        flattened.push(item);
      }
    }
    return flattened;
 }