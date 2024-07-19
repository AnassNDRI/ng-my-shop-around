const Article = require("../models/article_model");


exports.create = (req, res, next) => {
    const article = req.body;

    Article.create(article)
    .then(([article, fields]) => {
        if (!article){
            return res.status(401).json({error: 'Article non crée dans la DB'});
        }else{
            return res.status(200).json(article);
        }
    })
    .catch(error => {
        if (error){
            return res.status(500).json({error});
        }
    });
};

exports.update = (req, res, next) => {
    const article = req.body;

    Article.update(article)
    .then(([article, fields]) => {
        if(!article){
            return res.status(401).json({error: 'Article non trouvé dans la DB'});
        }else{
            return res.status(200).json(article);
        }
    })
    .catch (error => {
        if (error){
            return res.status(500).json({error});
        }
    });
};

exports.delete = (req, res, next) => {
    const articleId = req.params.id;

    Article.delete(articleId)
    .then(([article, fields])=> {
        if (!article){
            return res.status(401).json({error: 'Article non trouvé dans la DB'});
        }else{
            return res.status(200).json(article);
        }
    })
    .catch(error => {
        if (error){
            return res.status(500).json({error});
        }
    });
};

exports.findById = (req, res, next) => {
    const id = req.params.id;
    console.log(req.params);

    Article.findById(id)
    .then(([article, fields]) => {
        if(article.length === 0){
            console.log(article);
            return res.status(401).json({error: 'Article non trouvé dans la DB'});
        }else{
            return res.status(200).json(article[0]);
        }
    })
    .catch(error => {
        return res.status(500).json({error});
    });
};

exports.fetchAll = (req, res, next) => {
    Article.fetchAll()
    .then(([articles, fields]) => {
        if (!articles[0]){
            return res.status(401).json({error: 'Article(s) non trouvé(s) dans la DB'});
        }else{
            return res.status(200).json(articles);
        }
    })
    .catch(error => {
        return res.status(500).json({error});
    });
};

