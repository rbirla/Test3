var studentsRecord = require("./students.json");

var students = [];
module.exports = {
    prepare: function() {
        let promise = new Promise(function(resolve, reject) {
            for (let i in studentsRecord) {
                students.push(studentsRecord[i]);
            }
            if (students.length != 0) {
                resolve("Read File Resolved");
            } else {
                reject("unable to read file");
            }
        });
        return promise;
    },

    getCPA: function() {
        let promise = new Promise(function(resolve, reject) {
            if (students.length != 0) {
                resolve(students);
            } else {
                reject("no results returned");
            }
        });
        return promise;
    },
    getBSD: function() {
        let promise = new Promise(function(resolve, reject) {
            if (students.length != 0) {
                const bsdStudents = students.filter((a) => a.program == "BSD");
                resolve(bsdStudents);
            } else {
                reject("no results returned");
            }
        });
        return promise;
    },
    allStudents: function() {
        let promise = new Promise(function(resolve, reject) {
            if (students.length != 0) {
                resolve(students);
            } else {
                reject("no results returned");
            }
        });
        return promise;
    },
    highGPA: function() {
        let promise = new Promise(function(resolve, reject) {
            if (students.length != 0) {
                let highestGPAStudent = students[0];
                for (let i = 1; i < students.length - 1; i++) {
                    if (students[i].gpa > highestGPAStudent.gpa) {
                        highestGPAStudent = students[i];
                    }
                }
                resolve(highestGPAStudent);
            } else {
                reject("Failed finding the student with the highest GPA");
            }
        });
        return promise;
    },
};