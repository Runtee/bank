const database = require("../config/database_connection");

exports.deposite = async (req, res) => {
    try{
    let user = await database("users")
        .where({ email: req.body.email })
        .first();
    const deposite = await database("users")
        .where({ email: req.body.email })
        .first()
        .update({ balance: user.balance + req.body.amount })
    res.status(200).json('done, number of rows affected : '+deposite);
    }
    catch(err){
        res.status(500).json(err)
    }
};
exports.withdraw = async (req, res) => {
    try{
        let user = await database("users")
            .where({ email: req.body.email })
            .first();
        if (req.body.amount > user.balance){
            return res.status(401).json('not enough funds in wallet')
        }
        const withdraw = await database("users")
            .where({ email: req.body.email })
            .first()
            .update({ balance: user.balance - req.body.amount })
        res.status(200).json('done, number of rows affected : '+withdraw);
        }
        catch(err){
            res.status(500).json(err)
        }
};
exports.transfer = async (req, res) => {
    try{
        let user = await database("users")
            .where({ email: req.body.email })
            .first();
        if (req.body.amount > user.balance){
            return res.status(401).json('not enough funds in wallet')
        } 
        const transfer = await database("users")
            .where({ account_number: req.body.peer_account_number })
            .first()
            .update({ balance: user.balance + req.body.amount })
        res.status(200).json('done, number of rows affected : '+transfer);
        }
        catch(err){
            res.status(500).json(err)
        }
};
