var axios = require('axios');
var qs = require('qs');

exports.city = async (req, res) => {

    var config = {
        method: 'get',
        url: 'https://api.rajaongkir.com/starter/city',
        headers: {
            'key': process.env.keyRajaOngkir
        }
    };

    try {
        const resp = await axios(config);
        const data = await resp.data;
        // console.log(data);

        res.status(200).send({
            message: "Sukses !",
            data: data
        });
    } catch (error) {
        console.error(`Error: ${error}`);

        res.status(200).send({
            message: "Error !",
            data: error
        });
    }
};

exports.cost = async (req, res) => {

    // {
    //     "origin": "154",
    //     "destination": "54",
    //     "weight": "1700",
    //     "courier": "jne"
    //   }

    const origin = req.body.origin
    const destination = req.body.destination
    const weight = req.body.weight
    const courier = req.body.courier

    var data = qs.stringify({
        'origin': origin.toString(),
        'destination': destination.toString(),
        'weight': weight.toString(),
        'courier': courier
    });

    var config = {
        method: 'post',
        url: 'https://api.rajaongkir.com/starter/cost',
        headers: {
            'key': process.env.keyRajaOngkir,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };

    try {
        const resp = await axios(config);
        const data = await resp.data;
        // console.log(data);

        res.status(200).send({
            message: "Sukses !",
            data: data
        });
    } catch (error) {
        console.error(`Error: ${error}`);

        res.status(200).send({
            message: "Error !",
            data: error
        });
    }
};