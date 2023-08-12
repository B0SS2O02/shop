const { validationResult } = require('express-validator')
const fs = require('fs')
const path = require('path')
const models = require('../../models')

module.exports.view = async (req, res) => {
    let data = await models.products.findAll()
    data = JSON.parse(JSON.stringify(data))
    res.json(data)
}

module.exports.create = async (req, res) => {
    const error = validationResult(req)
    if (error.isEmpty()) {
        await models.products.create({
            title: req.body.title,
            image: req.file.filename
        })
        res.send('ok')
    } else {
        if (!!req.file) {
            fs.unlinkSync(path.join(__dirname, '../../public/image', req.file.filename), (err) => {
                console.error(err)
            })
        }
        res.status(400).send(error.array())
    }
}
module.exports.delete = async (req, res) => {
    const error = validationResult(req)
    if (error.isEmpty()) {
        let data = await models.products.findOne({
            where: {
                id: req.body.id
            }
        })
        let del = await models.products.destroy({
            where: {
                id: req.body.id
            }
        })
        if (!!del) {
            fs.unlinkSync(path.join(__dirname, '../../public/image', data.image), (err) => {
                console.error(err)
            })
            res.send(`Element by id:${req.body.id} is deleted`)
        } else {
            res.status(404).send(`Element by id:${req.body.id} is not deleted`)
        }

    } else {
        res.status(400).send(error.array())
    }
}

module.exports.edit = async (req, res) => {
    const error = validationResult(req)
    if (error.isEmpty()) {
        let body = {}
        if (!!req.body) {
            if (!!req.body.title) {
                body.title = req.body.title
            }
        }
        if (!!req.file) {
            body.image = req.file.filename
        }
        let data = await models.products.findOne({
            where: {
                id: req.body.id
            }
        })
        let edit = await models.products.update(body, {
            where: {
                id: req.body.id
            }
        })
        if (edit) {
            fs.unlinkSync(path.join(__dirname, '../../public/image', data.image), (err) => {
                console.error(err)
            })
            res.send(`Element by id:${req.body.id} is edited`)
        } else {
            res.status(404).send(`Element by id:${req.body.id} is not edited`)
        }
    } else {
        res.status(400).send(error.array())
    }
}