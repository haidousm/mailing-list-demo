const express = require("express");
const bodyParser = require("body-parser");

const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('public'))

app.get("/", (req, res) => {

    res.sendFile(__dirname + "/index.html");

})

app.post("/", (req, res) => {

    const endpoint = "https://us4.api.mailchimp.com/3.0/lists/9425f3855a/"

    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;

    var options = {

        url: endpoint,
        method: "POST",
        auth: {

            username: "haidousm",
            password: "4cfa9bc5349b078dc2e5ea341a809bb6-us4"

        },

        body: JSON.stringify({
            members: [{

                "email_address": email,
                "status": "subscribed",
                "merge_fields": {
                    "FNAME": firstName,
                    "LNAME": lastName
                }

            }]
        })

    }

    request(options, (error, response, body) => {

        if (error) {

            console.log("error");

        } else {

            console.log(response.statusCode);

        }

    })

})

app.listen(3000, () => {

    console.log("App is running on port 3000.");

})

// 4cfa9bc5349b078dc2e5ea341a809bb6-us4