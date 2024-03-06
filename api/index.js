const fs = require("fs");
const router = require("express").Router();
const path = require("path");

router.post('/invoices', async (req, res) => {
  const body = req.body;
  const filePath = path.resolve(__dirname, "../db/invoices.csv");

  try {
    if (!body.length) {
      return res.status(400).send({
        success: false,
        message: "Data passed should be an array"
      });
    }

    const directoryPath = path.dirname(filePath);

    fs.mkdirSync(directoryPath, { recursive: true });

    fs.access(filePath, fs.constants.F_OK, err => {
      if (err) {
        fs.open(filePath, "w", (err, file) => {
          if (err) {
            throw err;
          }
          console.log("File was created: ", { file, filePath });
          // todo add the header
        });
      } else {
        console.log("File exists");
      }
    });

    for (let { productName, quantity, price, identity } of body) {
      const amount = quantity * price;
      // Append the invoice details to the file
      const newLine = `${productName},${quantity},${price},${amount},${identity}\n`;
      fs.appendFile(filePath, newLine, err => {
        if (err) {
          throw err;
        }
        console.log("invoice data was appended: ", newLine);
      });
    }

    res.status(201).send({
      success: true,
      message: "Invoice added successfully"
    });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error"
    });
  }
});

router.post("/invoices/export", (req, res) => {
  try {   
    const filePath = path.resolve(__dirname, "../db/invoices.csv");
res.download(filePath);
  } catch (error) {
    console.error("Error:", err);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error"
    });
  }
});


module.exports = router;