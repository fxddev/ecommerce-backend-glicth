const conn = require('../connect')

const jwt = require('jsonwebtoken')

exports.rating = async (req, res) => {

    // {
    //     "id_product": 1
    // }
    const id_product = req.body.id_product;

    conn.query(`
    SELECT
        rating.id_product,
        products.nama,
        pembeli.nama,
        rating.ulasan,
        rating.star,
        rating.created_at,
        rating.update_at
    FROM rating
    INNER JOIN products
        ON rating.id_product = products.id
    INNER JOIN pembeli
        ON rating.id_pembeli = pembeli.id
    WHERE
    rating.id_product = ${id_product}`, async function (error, rows, fields) {

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
                    message: "Tidak ada rating product sama sekali"
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