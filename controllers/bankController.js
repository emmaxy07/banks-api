const fs = require("fs");

const banks = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/banks-list.json`));

exports.getAllBanks = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        results: banks.length,
        data: {
            banks: banks
        }
    })
}

exports.getBank = (req, res) => {
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

exports.createBank = (req, res) => {
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

exports.updateBank =  (req, res) => {
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

exports.deleteBank =  (req, res) => {
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