const pool = require('../dbconfig/databaseconnection');

module.exports = {
    createUser: (data, callBack) => {
        pool.query(
            'INSERT INTO users (firstName,lastName,email,mobNum,password,address,city,state,country) values (?,?,?,?,?,?,?,?,?)', [
                data.firstName,
                data.lastName,
                data.email,
                data.mobNum,
                data.password,
                data.confirmPassword,
                data.address,
                data.city,
                data.state,
                data.country
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUserByID: (id, callBack) => {
        pool.query(
            `select firstName,lastName,email,mobNum,address,city,state,country from users where id = ?`, [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUserByEmailID: (email, callBack) => {
        pool.query(
            `select * from users where email = ?`, [email],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    Updateuser: (id, data, callBack) => {
        pool.query(
            'ALTER TABLE users ADD profile varchar(255);',
            'update users set firstName=?,lastName=?,email=?,mobNum=?,password=?,address=?,city=?,state=?,country=? where id= ?', [
                data.firstName,
                data.lastName,
                data.email,
                data.mobNum,
                data.password,
                data.address,
                data.city,
                data.state,
                data.country,
                data.profile,
                id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }

        );

    }
};