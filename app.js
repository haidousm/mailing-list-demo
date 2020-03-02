const express = require("express");
const bodyParser = require("body-parser");

const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('public'))

app.get("/", (req, res) => {

    res.sendFile(process.env.PWD + "/index.html");

})

app.post("/", (req, res) => {

    const endpoint = "https://usX.api.mailchimp.com/3.0/lists/{LIST_ID}/"

    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;

    var options = {

        url: endpoint,
        method: "POST",
        auth: {

            username: "haidousm",
            password: "API_KEY"

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


                res.sendFile(process.env.PWD + "/success.html")


    })

})

app.post("/failure", (req, res) => {

    res.redirect("/");

})
app.listen(process.env.PORT || 3000, () => {

    console.log("App is running on port 3000.");

})
