const { createUser, getUserByEmailID, Updateuser, getUserByID } = require('./usermodel');
const { mailer } = require('../auth/nodemail');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        mailer(body.email, (err, results) => {
            console.log("****" + err);
            if (err) {
                console.log(err);
                return res.json({
                    success: 0,
                    message: "Invalida email"
                });
            } else {
                // const body = req.body;
                console.log("next");
                const salt = genSaltSync(10);
                body.password = hashSync(body.password, salt);
                createUser(body, (err, results) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            success: 0,
                            message: "Database Connection error"
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        data: results
                    });
                });
            }
        });
    },
    getUserByID: (req, res) => {
        const id = req.params.id;
        getUserByID(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not Found"
                });
            }
            results.password = undefined;
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    login: (req, res) => {
        const body = req.body;
        getUserByEmailID(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsontoken = sign({ result: results }, process.env.JWT_KEY, {
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    message: "login successfully",
                    token: jsontoken
                });
            } else {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
        });
    },
    Updateuser: (req, res) => {
        const id = req.params.id;
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        Updateuser(id, body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Failed to Update"
                });
            }
            return res.json({
                success: 1,
                message: "Updated Successfully"
            });
        })

    }

};