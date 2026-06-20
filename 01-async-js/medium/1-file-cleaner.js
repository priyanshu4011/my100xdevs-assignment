// ## File cleaner
// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was
// ```
// hello     world    my    name   is       raman
// ```

// After the program runs, the output should be

// ```
// hello world my name is raman
// ```


const fs = require("fs")
const filePath = "./file/hello.txt"

fs.readFile(filePath, "utf-8", (err, data) => {
  if (err) {
    console.error("error while reading the file", err);
    return;
  }
  //const updateContent = data.trim()
    //trim() ONLY removes spaces at the beginning and end of the file.
    
    const updateContent = data.replace(/\s+/g, " ").trim();

    //understand the regex: 
    // \s -> any white space (space ,tab , newline)
    // + -> one or more
    // g -> global (replace everywhere)

  //write the updated file
  fs.writeFile(filePath, updateContent, "utf8", (err) => {
    if (err) {
      console.error("error while writing to the file", err);
      return;
    }
    console.log("removed all the white spaces");
  });
})