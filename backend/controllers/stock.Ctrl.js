const Stock = require("../models/stock_model");


exports.create = (req, res, next) => {
    const stock = req.body;

    Stock.create(stock)
    .then(([stock, fields]) => {
        if (!stock){
            return res.status(401).json({error: 'stock non trouvé en DB'});
        }else{
            return res.status(200).json(stock);
        }
    })
    .catch(error => {
        if (error){
            return res.status(500).json({error});
        }
    });
};

exports.update = (req, res, next) => {
    const stock = req.body;

    Stock.update(stock)
    .then(([stock, fields]) => {
        if (!stock){
            return res.status(401).json({error: 'stock non trouvé en DB'});
        }else{
            return res.status(200).json(stock);
        }
    })
    .catch(error => {
        if (error){
            return res.status(500).json({error});
        }
    });
};

exports.delete = (req, res, next) => {
    const stockId = req.params.id;

    Stock.delete(stockId)
    .then(([stock, fields]) => {
        if (!stock){
            return res.status(401).json({error: 'stock non trouvé en DB'});
        }else{
            return res.status(200).json(stock);
        }
    })
    .catch(error => {
        if (error){
            return res.status(500).json({error});
        }
    });
};

exports.findById = (req, res, next) => {
    const stockId = req.params.id;

    Stock.findById(stockId)
    .then(([stock, fields]) => {
        if (stock.length === 0){
            return res.status(401).json({error: 'Stock non trouvé en DB'});
        }else{
            return res.status(200).json(stock[0]);
        }
    })
    .catch(error => {
        if (error){
            return res.status(500).json({error});
        }
    });
};

exports.fetchAll = (req, res, next) => {
    Stock.fetchAll()
    .then(([stocks, fields]) => {
        if (!stocks[0]){
            return res.status(401).json({error: 'pas de stock dans la DB'});
        }else{
            return res.status(200).json(stocks);
        }
    })
    .catch(error => {
        if (error){
            return res.status(500).json({error});
        }
    });
};
