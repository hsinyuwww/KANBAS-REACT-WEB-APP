function AddingAndRemovingDataToFromArrays() {
  let numberArray1 = [1, 2, 3, 4, 5];
  numberArray1.push(6);
  numberArray1.splice(2, 1);

  let stringArray1 = ["string1", "string2"];
  stringArray1.push("string3");
  stringArray1.splice(1, 1);

  return (
    <>
      <h3>Add and remove data to arrays</h3>
      numberArray1 = {numberArray1};
      <br />
      stringArray1 = {stringArray1};
      <br />
    </>
  );
}
export default AddingAndRemovingDataToFromArrays;
