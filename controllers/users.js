const conn = require('../connect')

const jwt = require('jsonwebtoken')

exports.user = async (req, res) => {

    // {
    //     "id": 2,
    //     "role_id": 3
    // }
    const role_id = req.body.role_id;

    let table = ""
    if (parseInt(role_id) === 2) {
        table = "penjual"
    } else if (parseInt(role_id) === 3) {
        table = "pembeli"
    }

    const id = req.body.id;
    conn.query(`
    SELECT * FROM ${table}
    WHERE
    id = ${id}`, async function (error, rows, fields) {

        if (error) {
            res.status(200).send({
                message: "Error",
                data: error
            });

        } else {

            if (rows.length !== 0) {
                res.status(200).send({
                    message: "Sukses",
                    data: rows
                });
            } else {
                res.status(200).send({
                    message: "Tidak ada users"
                });
            }

        }
    })
};

exports.create = async (req, res) => {

    // {
    //     "id_product": 1,
    //     "id_pembeli": 1,
    //     "ulasan": "Mantap",
    //     "star": 4,
    //     "created_at": "26473463",
    //     "update_at": "26473463"
    // }
    const id_product = req.body.id_product;

    const role_id = req.body.role_id;

    let table = ""
    if (parseInt(role_id) === 2) {
        table = "penjual"
    } else if (parseInt(role_id) === 3) {
        table = "pembeli"
    }

    conn.query(`INSERT INTO rating (id_product, id_pembeli, ulasan, star, created_at, update_at) VALUES(${id_product}, ${id_pembeli}, "${ulasan}", ${star}, "${created_at}", "${update_at}")`, async function (error, rows, fields) {

        if (error) {
            res.status(200).send({
                message: "Error",
                data: error
            });

        } else {

            res.status(200).send({
                message: "Sukses"
            });

        }
    })
};

exports.update = async (req, res) => {

    // {
    //     "id": 2,
    //     "role_id": 3,
    //     "nama": "Fahmi App",
    //     "email": "fahmia@g.c",
    //     "alamat": []
    // }

    const role_id = req.body.role_id;

    let table = ""
    if (parseInt(role_id) === 2) {
        table = "penjual"
    } else if (parseInt(role_id) === 3) {
        table = "pembeli"
    }

    const id = req.body.id;
    const nama = req.body.nama;
    const email = req.body.email;
    const alamat_string = req.body.alamat;
    const alamat = JSON.stringify(alamat_string)
    console.log(alamat)

    const d = new Date();
    const update_at = d.getTime();

    conn.query(`UPDATE ${table} SET nama = "${nama}", email = "${email}", alamat = '${alamat}', update_at = "${update_at}" WHERE id = ${id}`, async function (error, rows, fields) {

        if (error) {
            res.status(200).send({
                message: "Error",
                data: error
            });

        } else {

            res.status(200).send({
                message: "Update sukses"
            });

        }
    })
};