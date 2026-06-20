// ## Write to a file

// Using the fs library again, try to write to the contents of a file.
// You can use the fs library to as a black box, the goal is to understand async tasks.

const fs = require("fs")

const content = "write to file assignment done"

fs.writeFile("./file/write.txt", content, err => {
    if (err) {
        console.error(err);
        return
    } else {
        console.log("file written successfully")
    }
    
}) 