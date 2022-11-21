const conn = require('../connect')

const jwt = require('jsonwebtoken')

exports.keranjang = async (req, res) => {

    const id_pembeli = req.body.id_pembeli;

    conn.query(`SELECT
    keranjang.id AS id_keranjang,
    penjual.nama AS nama_penjual,
    penjual.alamat AS alamat_penjual,
    keranjang.id_product,
    products.nama AS nama_product,
    products.img,
    products.harga,
    products.minimum_pembelian,
    keranjang.jumlah,
    products.stok,
    products.berat,
    products.status,
    keranjang.is_selected
  FROM keranjang
    INNER JOIN products
      ON keranjang.id_product = products.id
    INNER JOIN penjual
      ON products.id_penjual = penjual.id
    WHERE
      keranjang.id_pembeli = ${id_pembeli}`, async function (error, rows, fields) {

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

exports.tambahKeranjang = async (req, res) => {

    // {
    //     "id_product": ,
    //     "id_pembeli": ,
    //     "jumlah": "1",
    //     "created_at": "24165137578475",
    //     "update_at": "24165137578475"
    // }

    const id_product = req.body.id_product;
    const id_pembeli = req.body.id_pembeli;
    const jumlah = req.body.jumlah;

    const d = new Date();
    const created_at = d.getTime();
    const update_at = d.getTime();

    conn.query(`SELECT * FROM keranjang WHERE id_pembeli = ${id_pembeli} AND id_product = ${id_product}`, function (error, rows, fields) {
        if (error) {
            console.log(error)

            res.status(200).send({
                message: "Ada Error",
                data: error
            });
        } else {

            if (parseInt(rows.length) === 0) {
                conn.query(`INSERT INTO keranjang (id_product, id_pembeli, jumlah, created_at, update_at) VALUES(${id_product}, ${id_pembeli}, "${jumlah}", "${created_at}", "${update_at}")`, function (error, rows, fields) {
                    if (error) {
                        console.log(error)

                        res.status(200).send({
                            message: "Ada Error",
                            data: error
                        });
                    } else {

                        res.status(200).send({
                            message: "Berhasil tambah keranjang !"
                        });
                    }
                })
            } else {

                // res.status(200).send({
                //     message: "Update ygsudah ada !",
                //     data: rows
                // });

                const jumlah_calc = parseInt(rows[0].jumlah) + parseInt(jumlah)
                const jumlah_new = jumlah_calc.toString()

                // "UPDATE mahasiswa SET nim=?, nama=?, jurusan=? WHERE id_mahasiswa=?"
                // UPDATE `keranjang` SET `jumlah` = '2' WHERE `keranjang`.`id` = 1;
                conn.query(`UPDATE keranjang 
                SET 
                id_product=${rows[0].id_product}, id_pembeli=${rows[0].id_pembeli}, jumlah="${jumlah_new}", created_at="${rows[0].created_at}", update_at="${update_at}" 
                WHERE 
                id = ${rows[0].id}`, function (error, rows, fields) {
                    if (error) {
                        console.log(error)

                        res.status(200).send({
                            message: "Ada Error",
                            data: error
                        });
                    } else {

                        res.status(200).send({
                            message: "Berhasil update keranjang !"
                        });
                    }
                })
            }
        }
    })

};

exports.updateKeranjang = async (req, res) => {

    // {
    //     "id_product": ,
    //     "id_pembeli": ,
    //     "jumlah": "-1",
    //     "created_at": "24165137578475",
    //     "update_at": "24165137578475"
    // }

    // is_selected 1 = selected
    // {
    //     "id_product": ,
    //     "id_pembeli": ,
    //     "is_selected": 0
    // }

    const id_product = req.body.id_product;
    const id_pembeli = req.body.id_pembeli;

    conn.query(`SELECT * FROM keranjang WHERE id_pembeli = ${id_pembeli} AND id_product = ${id_product}`, function (error, rows, fields) {
        if (error) {
            console.log(error)

            res.status(200).send({
                message: "Ada Error",
                data: error
            });
        } else {

            if (parseInt(rows.length) === 0) {
                res.status(200).send({
                    message: `Tidak ada id produk ${id_product} / id_pembeli ${id_pembeli} di keranjang !`
                });
            } else {

                // res.status(200).send({
                //     message: "Update ygsudah ada !",
                //     data: rows
                // });

                const d = new Date();
                const update_at = d.getTime();

                let msg = ""
                if (req.body.jumlah != undefined) {
                    const jumlah = req.body.jumlah;

                    let jumlah_calc, jumlah_new
                    if (parseInt(jumlah) === -1) {
                        jumlah_calc = parseInt(rows[0].jumlah) - 1

                        if (parseInt(jumlah_calc) < 1) {
                            jumlah_new = 1
                        } else {
                            jumlah_new = jumlah_calc.toString()
                        }
                        msg = "Berhasil update jumlah keranjang !"
                    } else if (parseInt(jumlah) === 0) {
                        jumlah_new = rows[0].jumlah
                        msg = "Gagal update ga bisa 0 !"
                    }else {
                        jumlah_new = jumlah.toString()
                        msg = "Berhasil update jumlah keranjang !"
                    }

                    // "UPDATE mahasiswa SET nim=?, nama=?, jurusan=? WHERE id_mahasiswa=?"
                    // UPDATE `keranjang` SET `jumlah` = '2' WHERE `keranjang`.`id` = 1;
                    conn.query(`
                    UPDATE keranjang 
                    SET jumlah="${jumlah_new}", update_at="${update_at}" 
                    WHERE id = ${rows[0].id}`, function (error, rows, fields) {
                        if (error) {
                            console.log(error)

                            res.status(200).send({
                                message: "Ada Error",
                                data: error
                            });
                        } else {

                            res.status(200).send({
                                message: msg
                            });
                        }
                    })
                } else {
                    const is_selected = req.body.is_selected;

                    conn.query(`
                    UPDATE keranjang 
                    SET is_selected=${is_selected}, update_at="${update_at}" 
                    WHERE id = ${rows[0].id}`, function (error, rows, fields) {
                        if (error) {
                            console.log(error)

                            res.status(200).send({
                                message: "Ada Error",
                                data: error
                            });
                        } else {

                            res.status(200).send({
                                message: "Berhasil update select keranjang !"
                            });
                        }
                    })
                }

            }
        }
    })

};

exports.deletesKeranjang = async (req, res) => {

    // [
    //     {
    //         "id":  
    //     },
    //     {
    //         "id": 
    //     }
    // ]

    const array = req.body;

    // res.status(200).send({
    //     message: "tes",
    //     data: array
    // });

    let condition = "WHERE id IN "
    let clause = ""
    for (let i = 0; i < array.length; i++) {

        let id_each
        if (parseInt(i) === 0) {
            id_each = `${array[i].id}`
        } else {
            id_each = `,${array[i].id}`
        }
        // console.log(clause);
        clause += id_each;
        // console.log(condition);
    }

    condition += "("
    condition += clause
    condition += ")"
    // console.log(condition);

    // res.status(200).send({
    //     message: "tesCond",
    //     data: condition
    // });

    // DELETE from `keranjang` WHERE id IN (5,6)
    conn.query(`DELETE FROM keranjang ${condition}`, function (error, rows, fields) {
        if (error) {
            console.log(error)

            res.status(200).send({
                message: "Ada Error",
                data: error
            });
        } else {
            res.status(200).send({
                message: `Berhasil hapus ${condition}`,
            });
        }
    })

};