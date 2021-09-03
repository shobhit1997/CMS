const express = require('express');
const R = require('ramda');
const Bill = require('../models/bill');
const Attendance = require('../models/attendence');
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
            Bill.find().sort("billDate").then(bills => {
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
router
    .route("/summary")
    .get(
        async function(req, res) {
            var workerPay = await Attendance.aggregate([{
                $group: {
                    "_id": "$date",
                    "total": { $sum: "$amountPayed" }
                }
            }])

            var materialPay = await Bill.aggregate([{
                $group: {
                    "_id": "$billDate",
                    "total": { $sum: "$billAmount" }
                }
            }])
            summary = {};
            workerTotal = 0
            materialTotal = 0
            workerPay.map(wp => {
                summary[wp._id] = { workerPay: wp.total }
                workerTotal += wp.total;
            })
            materialPay.map(mp => {
                if (summary[mp._id]) {
                    summary[mp._id]["materialPay"] = mp.total;
                } else {
                    summary[mp._id] = { materialPay: mp.total }
                }
                materialTotal += mp.total;
            })

            res.send({ summary, total: { workerTotal, materialTotal } })
        }
    )
module.exports = router;