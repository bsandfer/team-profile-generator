const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const fse = require('fs-extra');

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
// const { finished } = require("stream");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

let employeeArray = []

const finished = () => {
    let myTeamHtml = render(employeeArray)
    fse.outputFile('output/team.html', myTeamHtml)
   .then(() => {
       console.log('The file has been saved!');
   })
   .catch(err => {
       console.error(err)
   });
}

const questContinue = () => {
    inquirer.prompt([{
        message: 'Add more team members?',
        type: 'list',
        choices: ['yes', 'No'],
        name: 'yesOrNo'
    }])
    .then(yesOrNo => {
        if (yesOrNo.yesOrNo === 'yes') {
            engineerOrIntern()
        } else {
            finished()
        }
    })
}

const engineerOrIntern = () => {
    inquirer.prompt([{
        message: 'adding an engineer or intern?',
        type: 'list',
        choices: ['Engineer', 'Intern'],
        name: 'engOrInt'
    }])
    .then(answer => {
        console.log(answer)
        if(answer.engOrInt === 'Engineer') {
            inquirer.prompt([
                {
                    message: "Engineer's name?",
                    type: 'input',
                    name: 'name'    
                },
                {
                    message: "Engineer's id?",
                    type: 'input',
                    name: 'id'
                },
                {
                    message: "Engineer's email address?",
                    type: 'input',
                    name: 'email'
                },
                {
                    message: "Engineer's github?",
                    type: 'input',
                    name: 'github'
                }
            ])
            .then(engineer => {
                console.log(engineer)
                let newEngineer = new Engineer(engineer.name, engineer.id, engineer.email, engineer.github)
                employeeArray.push(newEngineer)
                console.log(employeeArray)
                questContinue()
            })
        } else if (answer.engOrInt === 'Intern') {
            inquirer.prompt([
                {
                    message: "Intern's name?",
                    type: 'input',
                    name: 'name'    
                },
                {
                    message: "Intern's id?",
                    type: 'input',
                    name: 'id'
                },
                {
                    message: "Intern's email address?",
                    type: 'input',
                    name: 'email'
                },
                {
                    message: "Intern's school?",
                    type: 'input',
                    name: 'school'
                }
            ])
            .then(intern => {
                let newIntern = new Intern(intern.name, intern.id, intern.email, intern.school)
                employeeArray.push(newIntern)
                console.log(employeeArray)
                questContinue()
            })
        }
    })
}

inquirer.prompt([
    {
        message: "Team manager's name?",
        type: 'input',
        name: 'name'    
    },
    {
        message: "Team manager's id?",
        type: 'input',
        name: 'id'
    },
    {
        message: "Team manager's email address?",
        type: 'input',
        name: 'email'
    },
    {
        message: "Team manager's office number?",
        type: 'input',
        name: 'officeNumber'
    }
])

.then(manager=> {
    console.log(manager)
    let newManager = new Manager(manager.name, manager.id, manager.email, manager.officeNumber)
    employeeArray.push(newManager)
    console.log(employeeArray)
    engineerOrIntern()
})

