const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const exp = require("constants");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
    console.log("hello from the middlware");
    next();
})

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

const banks = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/banks-list.json`));

const getAllBanks = (req, res) => {
    console.log(req.requestTime);
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

const getAllUsers = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined"
    })
}

const getUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined"
    })
}

const createUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined"
    })
}

const updateUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined"
    })
}

const deleteUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined"
    })
}


const bankRouter = express.Router();
const userRouter = express.Router();

app.use("/api/v1/banks", bankRouter);
app.use("/api/v1/users", userRouter);


bankRouter.route("/").get(getAllBanks).post(createBank);

bankRouter.route("/:id").get(getBank).patch(updateBank).delete(deleteBank);

userRouter.route("/").get(getAllUsers).post(createUser);

userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

const port = 8000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
})