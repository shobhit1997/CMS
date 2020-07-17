const express = require('express');
const R = require('ramda');
const Worker = require('../models/worker');
const Attendance = require('../models/attendence');

const router = express.Router();

router.route('/')
    .post(function(req, res) {

        var body = R.pick(['name', 'type', 'dailyWage'], req.body);
        var worker = new Worker(body);
        worker.save().then(function() {
            res.send(worker);
        }).catch(function(e) {
            console.log(e);
            res.status(400).send({ code: 400, message: e });
        });
    })
    .patch(function(req, res) {
        var _id = req.query.id;
        var body = R.pick(['name', 'type', 'dailyWage'], req.body);
        Worker.findOneAndUpdate({ _id }, body, { new: true }).then(function(worker) {
            res.send(worker);
        }).catch(function(e) {
            console.log(e);
            res.status(400).send({ code: 400, message: e });
        });
    })
    .get(function(req, res) {
        var _id = req.query.id;
        if (_id) {
            Worker.findById(_id).then(worker => {
                res.send(worker);
            }).catch(e => {
                console.log(e);
                res.status(400).send({ code: 400, message: e });
            })
        } else {
            Worker.find().then(workers => {
                res.send(workers);
            }).catch(e => {
                console.log(e);
                res.status(400).send({ code: 400, message: e });
            })
        }
    })
    .delete(function(req, res) {
        var _id = req.query.id;
        if (_id) {
            Worker.findByIdAndRemove(_id).then(worker => {
                res.send(worker);
            }).catch(e => {
                console.log(e);
                res.status(400).send({ code: 400, message: e });
            })
        } else {
            res.status(400).send({ code: 400, message: "No worker Id" });
        }
    });


router.route('/attendance')
    .post(async function(req, res) {
        Attendance.insertMany(req.body).then(result => {
            res.send(result);
        }).catch(e => {
            console.log(e);
            res.status(400).send({ code: 400, message: e });
        })
    })
    .get(async function(req, res) {

        if (!R.isEmpty(req.query)) {
            Attendance.find(req.query).populate('worker').sort("date").then(result => {
                res.send(result);
            }).catch(e => {
                res.status(400).send({ code: 400, message: e });
            })
        } else {
            Attendance.find().sort("date").distinct("date").then(result => {
                res.send(result);
            }).catch(e => {
                res.status(400).send({ code: 400, message: e });
            })
        }

    }).patch(async function(req, res) {
        console.log(req.body)
        Promise.all(req.body.map(body => {
            return Attendance.findOneAndUpdate({ worker: body.worker, date: body.date }, R.pick(['amountPayed', 'present', 'remarks'], body), { new: true, upsert: true });
        })).then(result => {
            res.send(result);
        }).catch(e => {
            res.status(400).send({ code: 400, message: e });
        })
    }).delete(async function(req, res) {
        Attendance.deleteMany(req.query).then(result => {
            res.send(result);
        }).catch(e => {
            res.status(400).send({ code: 400, message: e });
        })
    });


module.exports = router;