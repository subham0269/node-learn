exports.addFunction =  (a,b) => {
  return a + b;
}


exports.subFunction = (a,b) => {
  const s = (a>b) ?  a-b :  b-a;
  return s;
}