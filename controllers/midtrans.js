const midtransClient = require('midtrans-client');

var coreApi = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: process.env.serverKeyMidtrans,
    clientKey: process.env.clientKeyMidtrans
});

exports.bayar = async (req, res) => {

    // example reqBody
    // {
    //     "payment_type": "bank_transfer",
    //     "bank_transfer": {
    //       "bank": "permata"
    //     },
    //     "transaction_details": {
    //       "order_id": "C17550",
    //       "gross_amount": 145000
    //     },
    //     "custom_field1": "custom field 1 content",
    //     "custom_field2": "custom field 2 content",
    //     "custom_field3": "custom field 3 content"
    //   }

    // {
    //     "payment_type": "cstore",
    //     "transaction_details": {
    //       "gross_amount": 162500,
    //       "order_id": "order04"
    //     },
    //     "cstore": {
    //       "store": "Indomaret",
    //       "message": "Tiket1 transaction"
    //     },
    //     "customer_details": {
    //       "first_name": "Budi",
    //       "last_name": "Utomo",
    //       "email": "budi.utomo@midtrans.com",
    //       "phone": "0811223344"
    //     },
    //     "item_details": [
    //       {
    //         "id": "id1",
    //         "price": 162500,
    //         "quantity": 1,
    //         "name": "tiket1"
    //       }
    //     ],
    //   }

    // {
    //     "payment_type": "bank_transfer",
    //     "transaction_details": {
    //         "gross_amount": 10000,
    //         "order_id": "INV/4102022/IDP/3"
    //     },
    //     "customer_details": {
    //         "email": "fahmia@g.c",
    //         "first_name": "Fahmi",
    //         "last_name": "App",
    //         "phone": "628515679355"
    //     },
    //     "item_details": [
    //         {
    //             "id": "2",
    //             "price": 5000,
    //             "quantity": 1,
    //             "name": "Buku"
    //         },
    //         {
    //             "code": "jne",
    //             "price": 5000,
    //             "quantity": 1,
    //             "name": "YES"
    //         }
    //     ],
    //     "bank_transfer": {
    //         "bank": "bri",
    //         "va_number": "111111"
    //     }
    // }
    // "Nama": "Fahmi App",
    // "Telepon": "628515679355",
    // "Email": "fahmia@g.c",
    // "Alamat": "Perum wali barokah"

    coreApi.charge(req.body)
        .then((chargeResponse) => {
            console.log('chargeResponse:', JSON.stringify(chargeResponse));

            res.status(200).send({
                message: "Sukses !",
                data: chargeResponse
            });
        })
        .catch((e) => {
            console.log('Error occured:', e.message);

            res.status(200).send({
                message: `Error`,
                data: e.message
            });
        });

    // {
    //     "message": "Sukses !",
    //     "data": "{\"status_code\":\"201\",\"status_message\":\"Success, PERMATA VA transaction is successful\",\"transaction_id\":\"f840c6bf-36dd-4485-adf1-7795b34d0207\",\"order_id\":\"C17550\",\"gross_amount\":\"145000.00\",\"currency\":\"IDR\",\"payment_type\":\"bank_transfer\",\"transaction_time\":\"2022-10-03 13:00:51\",\"transaction_status\":\"pending\",\"fraud_status\":\"accept\",\"permata_va_number\":\"166004063669828\",\"merchant_id\":\"G564316636\"}"
    // }
};

exports.status = async (req, res) => {

    // apiClient.transaction.status('YOUR_ORDER_ID OR TRANSACTION_ID')
    // .then((response)=>{
    //     // do something to `response` object
    // });

    // example reqBody
    // {
    //     "transaction_id": "f840c6bf-36dd-4485-adf1-7795b34d0207"
    //   }

    const transaction_id = req.body.transaction_id

    coreApi.transaction.status(transaction_id)
        .then((chargeResponse) => {

            res.status(200).send({
                message: "Sukses !",
                data: chargeResponse,
                // items: JSON.stringify(chargeResponse)
            });
        })
        .catch((e) => {

            res.status(200).send({
                message: `Error`,
                data: e.message
            });
        });
};

exports.statusb2b = async (req, res) => {
    // cuma buat VA

    // apiClient.transaction.statusb2b('YOUR_ORDER_ID OR TRANSACTION_ID')
    // .then((response)=>{
    //     // do something to `response` object
    // });

    // example reqBody
    // {
    //     "transaction_id": "f840c6bf-36dd-4485-adf1-7795b34d0207"
    //   }

    const transaction_id = req.body.transaction_id

    coreApi.transaction.statusb2b(transaction_id)
        .then((chargeResponse) => {

            res.status(200).send({
                message: "Sukses !",
                data: JSON.stringify(chargeResponse),
                items: chargeResponse
            });
        })
        .catch((e) => {

            res.status(200).send({
                message: `Error`,
                data: e.message
            });
        });
};

exports.expire = async (req, res) => {
    // untuk membatalkan pembayaran

    // apiClient.transaction.expire('YOUR_ORDER_ID OR TRANSACTION_ID')
    // .then((response)=>{
    //     // do something to `response` object
    // });

    const transaction_id = req.body.transaction_id

    coreApi.transaction.expire(transaction_id)
        .then((chargeResponse) => {

            res.status(200).send({
                message: "Sukses !",
                data: chargeResponse
            });
        })
        .catch((e) => {

            res.status(200).send({
                message: `Error`,
                data: e.message
            });
        });
};

exports.cancel = async (req, res) => {

    // apiClient.transaction.cancel('YOUR_ORDER_ID OR TRANSACTION_ID')
    // .then((response)=>{
    //     // do something to `response` object
    // });

    // example reqBody
    // {
    //     "transaction_id": "f840c6bf-36dd-4485-adf1-7795b34d0207"
    //   }

    const transaction_id = req.body.transaction_id

    coreApi.transaction.cancel(transaction_id)
        .then((chargeResponse) => {

            res.status(200).send({
                message: "Sukses !",
                data: chargeResponse
            });
        })
        .catch((e) => {

            res.status(200).send({
                message: `Error`,
                data: e.message
            });
        });
};