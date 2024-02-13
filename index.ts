import inquirer from "inquirer";

// import { Student } from './student';
import { Student } from "./student.js";


let students: Student[] = [];

const mainMenu = async () => {
    const { choice } = await inquirer.prompt({
        type: 'list',
        name: 'choice',
        message: 'Choose an action:',
        choices: ['Add Student', 'View Students', 'Exit']
    });

    switch (choice) {
        case 'Add Student':
            await addStudent();
            break;
        case 'View Students':
            viewStudents();
            break;
        case 'Exit':
            console.log('Exiting...');
            process.exit();
    }
};

const addStudent = async () => {
    const answers = await inquirer.prompt([
        { type: 'input', name: 'name', message: 'Enter student name:' },
        { type: 'input', name: 'age', message: 'Enter student age:' },
        { type: 'input', name: 'grade', message: 'Enter student grade:' }
    ]);

    const newStudent = new Student(
        students.length + 1,
        answers.name,
        parseInt(answers.age),
        answers.grade
    );

    students.push(newStudent);
    console.log('Student added successfully!');
    mainMenu();
};


const viewStudents = () => {
    if (students.length === 0) {
        console.log('\nNo students found. Please add students first.\n');
        mainMenu();
    } else {
        console.log('\nList of Students:');
        students.forEach(student => {
            console.log(`ID: ${student.id}, Name: ${student.name}, Age: ${student.age}, Grade: ${student.grade}`);
        });
        mainMenu();
    }
};


    
mainMenu();
