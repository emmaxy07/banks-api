const fs = require("fs");
const express = require("express");

const app = express();

app.use(express.json());

const banks = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/banks-list.json`));

const getAllBanks = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: banks.length,
        data: {
            banks: banks
        }
    })
}

const getBank = (req, res) => {
    const id = +req.params.id;

    const bank = banks.find((el) => el.id === id)

    if(id > banks.length){
        return res.status(404).json({
            status: "fail",
            message: 'Invalid id'
        })
    }

    res.status(200).json({
        status: 'success',
        data: {
            banks: bank
        }
    })
}

const createBank = (req, res) => {
    // console.log(req.body);
    const newId = banks[banks.length - 1].id + 1;
    const newBank = Object.assign({id: newId}, req.body);
    banks.push(newBank);
    fs.writeFile(`${__dirname}/dev-data/data/banks-list.json`, JSON.stringify(banks), err => {
        res.status(201).json({
            status: "success",
            data: {
                bank: newBank
            }
        })
    })
}

const updateBank =  (req, res) => {
    if(+req.params.id > banks.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    res.status(200).json({
        status: "success",
        data: {
            banks: '<p>updated tour</p>'
        }
    })
}

const deleteBank =  (req, res) => {
    if(+req.params.id > banks.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    res.status(200).json({
        status: "success",
        data: {
            banks: '<p>updated tour</p>'
        }
    })
}

// app.get('/api/v1/banks', getAllBanks);
// app.get('/api/v1/banks/:id', getBank);
// app.post("/api/v1/banks", createBank);
// app.patch("/api/v1/banks/:id", updateBank);
// app.delete("/api/v1/banks/:id", deleteBank);


app.route("/api/v1/banks").get(getAllBanks).post(createBank);

app.route("/api/v1/banks/:id").get(getBank).patch(updateBank).delete(deleteBank);


const port = 8000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
})