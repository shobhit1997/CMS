const express = require('express');
const R = require('ramda');
const Work = require('../models/work');

const router = express.Router();

router.route('/')
    .post(function(req, res) {

        var work = new Work(req.body);
        work.save().then(function() {
            res.send(work);
        }).catch(function(e) {
            console.log(e);
            res.status(400).send({ code: 400, message: e });
        });
    })
    .patch(function(req, res) {
        var _id = req.query.id;
        Work.findOneAndUpdate({ _id }, req.body, { new: true }).then(function(work) {
            res.send(work);
        }).catch(function(e) {
            console.log(e);
            res.status(400).send({ code: 400, message: e });
        });
    })
    .get(function(req, res) {
        var _id = req.query.id;
        if (_id) {
            Work.findById(_id).then(work => {
                res.send(work);
            }).catch(e => {
                console.log(e);
                res.status(400).send({ code: 400, message: e });
            })
        } else {
            Work.find().then(works => {
                res.send(works);
            }).catch(e => {
                console.log(e);
                res.status(400).send({ code: 400, message: e });
            })
        }
    })
    .delete(function(req, res) {
        var _id = req.query.id;
        if (_id) {
            Work.findByIdAndRemove(_id).then(work => {
                res.send(work);
            }).catch(e => {
                console.log(e);
                res.status(400).send({ code: 400, message: e });
            })
        } else {
            res.status(400).send({ code: 400, message: "No work Id" });
        }
    });

module.exports = router;