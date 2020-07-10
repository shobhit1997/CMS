const express = require('express');
const R = require('ramda');
const Bill = require('../models/bill');
const imageUploadUtils = require('../utils/imageUploadUtils');
const router = express.Router();

router.route('/')
    .post(function(req, res) {

        var bill = new Bill(req.body);
        bill.save().then(function() {
            res.send(bill);
        }).catch(function(e) {
            console.log(e);
            res.status(400).send({ code: 400, message: e });
        });
    })
    .patch(function(req, res) {
        var _id = req.query.id;
        Bill.findOneAndUpdate({ _id }, req.body, { new: true }).then(function(bill) {
            res.send(bill);
        }).catch(function(e) {
            console.log(e);
            res.status(400).send({ code: 400, message: e });
        });
    })
    .get(function(req, res) {
        var _id = req.query.id;
        if (_id) {
            Bill.findById(_id).then(bill => {
                res.send(bill);
            }).catch(e => {
                console.log(e);
                res.status(400).send({ code: 400, message: e });
            })
        } else {
            Bill.find().then(bills => {
                res.send(bills);
            }).catch(e => {
                console.log(e);
                res.status(400).send({ code: 400, message: e });
            })
        }
    })
    .delete(function(req, res) {
        var _id = req.query.id;
        if (_id) {
            Bill.findByIdAndRemove(_id).then(bill => {
                res.send(bill);
            }).catch(e => {
                console.log(e);
                res.status(400).send({ code: 400, message: e });
            })
        } else {
            res.status(400).send({ code: 400, message: "No bill Id" });
        }
    });

router
    .route("/images")
    .post(
        imageUploadUtils.multer.single("image"),
        imageUploadUtils.sendUploadToGCS,
        async function(req, res) {
            if (req.file && req.file.cloudStoragePublicUrl) {
                return res.send({ imageUrl: req.file.cloudStoragePublicUrl });
            }
            return res.status(400).send({ message: "Invalid Image" });
        }
    )
module.exports = router;