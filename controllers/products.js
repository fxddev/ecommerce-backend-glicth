const conn = require('../connect')

const jwt = require('jsonwebtoken')

exports.products = async (req, res) => {

    conn.query(`SELECT * FROM products`, async function (error, rows, fields) {

        if (error) {
            connection.log(error)

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
                    message: "Tidak ada product sama sekali"
                });
            }

        }
    })
};

exports.product = async (req, res) => {

    // {
    //     "id_penjual": 5
    // }

    const id_penjual = req.body.id_penjual;

    conn.query(`SELECT * FROM products WHERE id_penjual = ${id_penjual}`, async function (error, rows, fields) {

        if (error) {
            connection.log(error)

            res.status(200).send({
                message: "Error",
                data: error
            });

        } else {

            res.status(200).send({
                message: "Sukses",
                data: rows
            });

        }
    })
};

exports.tambah = async (req, res) => {

    // {
    //     "nama": "baju",
    //     "img": "http",
    //     "harga": "1000",
    //     "deskripsi": "baju tes",
    //     "kondisi": "baru",
    //     "minimum_pembelian": 1,
    //     "status": "active",
    //     "stok": "10",
    //     "berat": "500",
    //     "id_penjual": 5
    // }

    const nama = req.body.nama;
    const img = req.body.img;
    const harga = req.body.harga;
    const deskripsi = req.body.deskripsi;
    const kondisi = req.body.kondisi;
    const minimum_pembelian = req.body.minimum_pembelian;
    const status = req.body.status;
    const stok = req.body.stok;
    const berat = req.body.berat;
    const id_penjual = req.body.id_penjual;

    const d = new Date();
    const created_at = d.getTime();
    const update_at = d.getTime();

    await conn.query(`INSERT INTO products (nama, img, harga, deskripsi, kondisi, minimum_pembelian, status, stok,  berat, id_penjual, created_at, update_at) VALUES("${nama}", "${img}", "${harga}", "${deskripsi}", "${kondisi}", ${minimum_pembelian}, "${status}", "${stok}", "${berat}", ${id_penjual}, "${created_at}", "${update_at}")`, function (error, rows, fields) {
        if (error) {
            console.log(error)

            res.status(200).send({
                message: "Ada Error",
                data: error
            });
        } else {

            res.status(200).send({
                message: "Berhasil tambah product !"
            });
        }
    })

};