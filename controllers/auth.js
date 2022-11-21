// https://www.makeuseof.com/nodejs-bcrypt-hash-verify-salt-password/ (validate pass)
// https://github.com/zestgeek/Auth-using-ReactJs-express-jwt-nodejs/blob/master/api/server.js (jwt)

const conn = require('../connect')

var CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken')

// const auth_reuse = require("../components/auth_reuse")

const jwt_secret = process.env.JWT_SECRET;
const pass_key = process.env.PASS_KEY;

exports.signUp = async (req, res) => {

    // {
    //     "nama": "Fahmi",
    //     "email": "f@g.com",
    //     "password": "fahmi123",
    //     "alamat": "bekasi timur",
    //     "role_id": 2,
    //     "created_at": "1664862720",
    //     "update_at": "1664862720"
    // }

    const role_id = req.body.role_id;

    if (parseInt(role_id) != 1 && parseInt(role_id) != 2 && parseInt(role_id) != 3) {
        // tdk ditemukan rolenya
        res.status(200).send({
            message: "Error",
            data: `Tidak ada role ke ${role_id}`
        });
    } else {
        let role_name = ""

        if (parseInt(role_id) === 1) {
            // admin
            role_name = "admin"
        } else if (parseInt(role_id) === 2) {
            // penjual
            role_name = "penjual"
        } else if (parseInt(role_id) === 3) {
            // pembeli
            role_name = "pembeli"
        }

        const table_active = role_name

        const email = req.body.email;

        conn.query(`SELECT * FROM ${table_active} WHERE email = "${email}"`, async function (error, rows, fields) {

            if (error) {
                connection.log(error)

                res.status(200).send({
                    message: "Error",
                    data: error
                });

            } else {

                if (rows.length !== 0) {
                    // console.log("User sudah terdaftar");

                    res.status(200).send({
                        message: "User sudah terdaftar"
                    });
                } else {
                    const nama = req.body.nama;
                    const password = req.body.password;
                    const alamat = req.body.alamat;
                    const role_id = req.body.role_id;

                    const d = new Date();
                    const created_at = d.getTime();
                    const update_at = d.getTime();

                    // const hash = await bcrypt.hash(password, 10);
                    
                    // Encrypt
                    var ciphertext = CryptoJS.AES.encrypt(password, pass_key).toString();
                    console.log(ciphertext);

                    await conn.query(`INSERT INTO ${table_active} (nama, email, password, alamat, role_id, created_at, update_at) VALUES("${nama}", "${email}", "${ciphertext}", "${alamat}", ${role_id}, "${created_at}", "${update_at}")`, function (error, rows, fields) {
                        if (error) {
                            console.log(error)

                            res.status(200).send({
                                message: "Ada Error",
                                data: error
                            });
                        } else {

                            res.status(200).send({
                                message: "Berhasil sign up !"
                            });
                        }
                    })
                }

            }
        })

        // susah buat reuse
        // const auth_reuse_signup = await auth_reuse.signUpHandle(req.body, role_name)
        // console.log(auth_reuse_signup);
        // res.status(200).send(auth_reuse_signup);
    }

};

exports.login = async (req, res) => {

    // {
    //     "email": "d@g.com",
    //     "password": "daud123",
    //     "role_id": 3
    // }

    const role_id = req.body.role_id;

    if (parseInt(role_id) != 1 && parseInt(role_id) != 2 && parseInt(role_id) != 3) {
        // tdk ditemukan rolenya
        res.status(200).send({
            message: "Error",
            data: `Tidak ada role ke ${role_id}`
        });
    } else {
        let role_name = ""

        if (parseInt(role_id) === 1) {
            // admin
            role_name = "admin"
        } else if (parseInt(role_id) === 2) {
            // penjual
            role_name = "penjual"
        } else if (parseInt(role_id) === 3) {
            // pembeli
            role_name = "pembeli"
        }

        const table_active = role_name

        const email = req.body.email;

        await conn.query(`SELECT * FROM ${table_active} WHERE email = "${email}"`, async function (error, rows, fields) {

            if (error) {
                connection.log(error)
                res.status(200).send({
                    message: "Error"
                });
            } else {

                if (rows.length !== 0) {

                    let password = req.body.password;
                    // const result = await bcrypt.compare(password, rows[0].password);

                    var bytes = CryptoJS.AES.decrypt(rows[0].password, pass_key);
                    var originalText = bytes.toString(CryptoJS.enc.Utf8);
                    // console.log(originalText);

                    if (password === originalText) {

                        const payload = {
                            email: email
                        };

                        // console.log(jwt_secret);
                        const token = jwt.sign(payload, jwt_secret);

                        res.status(200).send({
                            message: "Success!",
                            isRegistered: true,
                            token: token,
                            data: {
                                "id": rows[0].id,
                                "email": rows[0].email,
                                "nama": rows[0].nama,
                                "alamat": rows[0].alamat,
                                "role_id": rows[0].role_id
                            }
                        });
                    } else {
                        res.status(200).send({
                            message: "Gagal!",
                            isRegistered: true
                        });
                    }

                } else {
                    res.status(200).send({
                        message: "User belum terdaftar",
                        isRegistered: false
                    });
                }

            }
        })



    }

};