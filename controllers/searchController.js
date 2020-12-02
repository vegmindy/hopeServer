const express = require('express');
const router = express.Router();

const validateSession = require('../middleware/validateSession');
const fetch = require('node-fetch');

router.get("/", (req, res) => {
    const urlReq = {
        key: process.env.RAWG_APIKEY,
        page: 1,
        page_size: 20
    }

    fetch("https://api.rawg.io/api/games?" + new URLSearchParams(urlReq).toString(), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(res => res.json())
        .then(data => res.send(data))
        .catch(error => console.log(error));
});

router.post("/", (req, res) => { //page,searchQuery
    const urlReq = {
        key: process.env.RAWG_APIKEY,
        page: req.body.page,
        page_size: 20,
        search: req.body.searchQuery
    }

    fetch("https://api.rawg.io/api/games?" + new URLSearchParams(urlReq).toString(), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(res => res.json())
        .then(data => res.send(data))
        .catch(error => console.log(error));
});

router.get("/page/:page", (req, res) => {
    const urlReq = {
        key: process.env.RAWG_APIKEY,
        page: req.params.page,
        page_size: 20
    }

    fetch("https://api.rawg.io/api/games?" + new URLSearchParams(urlReq).toString(), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(res => res.json())
        .then(data => res.send(data))
        .catch(error => console.log(error));
});

router.get("/game/:id", (req,res) => {
    const urlReq = {
        key: process.env.RAWG_APIKEY
    }

    fetch(`https://api.rawg.io/api/games/${req.params.id}?${new URLSearchParams(urlReq).toString()}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(res => res.json())
        .then(data => res.send(data))
        .catch(error => console.log(error));
});

module.exports = router;


