import fs from "fs";
import yargs from "yargs";
import uuid from "uuid";

let obj;

const add = function(argv){
    const note = {
        uuid: uuid.v4(),
        title: argv.title,
        body: argv.body,
        author: argv.author
    };
    obj.notes.push(note);
    console.log("Added note: " + note.title);
}

const read = function(argv){
    console.log(obj.notes[argv.index]);
}

const list = function(argv){
    obj.notes.forEach((elem, i)=> {
        console.log(i + "-> " + elem.title);
    }
    );
}

const remove = function(argv){
    for(let i = 0; i < obj.notes.length; i++){
        if(i === argv.index){
            obj.notes.splice(i, 1);
        }
    }
}

yargs.command({
    command: "add",
    describe: "add a new note",
    builder: {
        title: {
            define: "title of the note",
            demandOption: true,
            type: "string",
        },
        body: {
            define: "body of the note",
            demandOption: true,
            type: "string",
        },
        author: {
            define: "author of the note",
            demandOption: true,
            type: "string",
        },
    },
    handler: add,
});

yargs.command({
    command: "read",
    describe: "read a note",
    builder: {
        index: {
            define: "index of the note",
            demandOption: true,
            type: "int",
        },
    },
    handler: read,
});

yargs.command({
    command: "list",
    describe: "list the notes by index",
    handler: list,
});

yargs.command({
    command: "remove",
    describe: "remove a note",
    builder: {
        index: {
            define: "index of the note",
            demandOption: true,
            type: "int",
        },
    },
    handler: remove,
});

const path = "datos.txt";
fs.access(path, fs.F_OK, (err) =>{
    if(err) {
        fs.writeFileSync(path, "");
    }
    const data = fs.readFileSync(path).toString();

    if(data !== ""){
        obj = JSON.parse(data);
    } else {
        obj = {
            notes: [

            ]
        }
    }
    yargs.parse();
    fs.writeFileSync("datos.txt", JSON.stringify(obj));
});