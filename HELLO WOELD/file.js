// const fs = require("fs");
// const os = require("os");

// console.log(os.cpus().length);
//Sync..Blocking
// fs.writeFileSync('./test.txt','Hello World');    // return something

//Async....Non Blocking req
// fs.writeFile("./test.txt", "Hello World Async", (err)=>{});  // alwasy expect callback

// console.log(1);

//Blocking
// const result =fs.readFileSync('contacts.txt','utf-8');
// console.log(result);
// console.log(2);

// console.log(1);
//Non Blocking
const result = fs.readFile('contacts.txt','utf-8',(err,result)=>{
    // console.log(result);
})
// console.log(2);

//Default Thread Pool Size =4

// const result=fs.readFileSync("./contacts.txt", "utf-8");
// console.log(result);

// fs.readFile("./contacts.txt", "utf-8", (err,result)=>{
//     if(err){
//         console.log("Error",err);
//     }else{
//         console.log(result);
//     }
// })

// fs.appendFileSync("./test.txt",`${Date.now()}Hey There\n`);

// fs.cpSync('./test.txt', './copy.txt')

// fs.unlinkSync("./copy.txt")
// console.log(fs.statSync('./test.txt').isFile())
// fs.mkdirSync('my-docs/a/b', {recursive:true});