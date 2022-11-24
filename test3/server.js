var express = require("express");
const { engine } = require("express-handlebars");
const hbs = require("hbs");
var testFunctions = require("./test2_moduleB.js");

const app = express();
app.engine(
    "handlebars",
    engine({
        extname: ".hbs",
        defaultLayout: "main",
        partialsDir: "views/partials",
    })
);
app.set("view engine", "hbs");
hbs.registerPartials("views/partials");

var HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

app.get("/", function(req, res) {
    let resText =
        '<h1 style="margin-left: 20px;">Results will be displayed here</h1>';
    resText += '<h2 style="margin-left: 20px;">Have fun in test3!</h2>';
    res.render("main", { result: resText });
    // let resText = "<h2>Declaration</h2>";
    // resText +=
    //     "<p>I acknowledge the Colleg's academic integrity policy - and my own integrity - remain in effect whether my work is</p>";
    // resText +=
    //     "<p>done remotly or onsite. Any test or assignment is an act of trust between me and my instructor, and expecially with</p>";
    // resText +=
    //     "<p>my classmates... even when no one is watching. I declare I will not break the trust</p>";
    // resText += "<p> Name: <b>Rahul Birla</b></p>";
    // resText += "<p> Student Number: <b>147395198</b></p>";
    // resText += "<a href = './CPA'> Click to visit CPA Students </a> <br><br>";
    // resText +=
    //     "<a href = './highGPA'> Click to see who has highest GPA </a> <br>";
    // res.send(resText);
});

// setup another route to listen on /about
app.get("/CPA", function(req, res) {
    testFunctions.getBSD().then(function(result) {
        res.send(result);
    });
});
app.get("/bsdStudents", function(req, res) {
    testFunctions.getBSD().then(function(result) {
        let resText = "<h1> Student List </h1>";
        resText +=
            '<table style="width:50%; border:1px solid black;"><tr style= "border:1px solid black;"><th style="border:1px solid black;">Student Id</th><th style="border:1px solid black;">Name</th><th style="border:1px solid black;">Program</th><th style="border:1px solid black;">GPA</th></tr>';
        for (let i = 0; i < result.length; i++) {
            resText +=
                '<tr style = "border: 1px solid black;">' +
                '<td style = "border: 1px solid black;">' +
                result[i].studId +
                "</td>" +
                '<td style = "border: 1px solid black;">' +
                result[i].name +
                "</td>" +
                '<td style = "border: 1px solid black;">' +
                result[i].program +
                "</td>" +
                '<td style = "border: 1px solid black;">' +
                result[i].gpa +
                "</td>" +
                "</tr>";
        }
        resText += "</table>";
        res.render("main", { students: resText });
    });
});

app.get("/allStudents", function(req, res) {
    testFunctions.allStudents().then(function(result) {
        let resText = "<h1> Student List </h1>";
        resText +=
            '<table style="width:50%; border:1px solid black;"><tr style= "border:1px solid black;"><th style="border:1px solid black;">Student Id</th><th style="border:1px solid black;">Name</th><th style="border:1px solid black;">Program</th><th style="border:1px solid black;">GPA</th></tr>';
        for (let i = 0; i < result.length; i++) {
            resText +=
                '<tr style = "border: 1px solid black;">' +
                '<td style = "border: 1px solid black;">' +
                result[i].studId +
                "</td>" +
                '<td style = "border: 1px solid black;">' +
                result[i].name +
                "</td>" +
                '<td style = "border: 1px solid black;">' +
                result[i].program +
                "</td>" +
                '<td style = "border: 1px solid black;">' +
                result[i].gpa +
                "</td>" +
                "</tr>";
        }
        resText += "</table>";
        res.render("main", { students: resText });
    });
});

app.get("/highGPA", function(req, res) {
    testFunctions.highGPA().then(function(result) {
        let resText = "<h1>Student Info: </h1>";
        resText += "<p>Student ID:" + result.studId + "</p>";
        resText += "<p>Name: " + result.name + "</p>";
        resText += "<p>Program: " + result.program + "</p>";
        resText += "<p>GPA: " + result.gpa + "</p>";
        // res.send(resText);
        res.render("main", { student: resText });
    });
});

app.use((req, res) => {
    res.status(404).send("Page Not Found!");
});

//setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, () => {
    var isResolved = false;
    testFunctions.prepare().then(function() {
        isResolved = true;
    });
    if (isResolved) {
        onHttpStart;
    }
});