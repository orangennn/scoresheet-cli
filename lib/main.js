let Student=require("./student.js");
let readlineSync=require("cli-interact");
function main(){
    let students = [];
    students = menu(students);
//主命令窗口
}
function  menu(students) {
    answer = readlineSync.question(`1. 添加学生
2. 生成成绩单
3. 退出
请输入你的选择（1～3）：`);		// restrict to integer
    if(answer==1){
        students=addStudent(students);
    }else if(answer==2){
        printScores(students);
    }


    return students;
}
//添加学生信息
function addStudent(students){
    answer = readlineSync.question('请输入学生信息（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...），按回车提交：');
    answer=answer.split(',');
    while(!IsCorrectAddFormat(answer)){
        answer = readlineSync.question('请按正确的格式输入（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...），按回车提交：');
        answer=answer.split(',');
    }
    const student=new Student(answer[0],answer[1],answer[2],answer[3],answer[4],answer[5],answer[6],answer[7]);
    students.push(student);
    console.log(`学生${student.name}的成绩被添加`);
    menu(students);
    return students;
}
//判断学生信息格式
function  IsCorrectAddFormat(answer) {
    if(answer.length!=8 || isNaN(parseInt(answer[1])) || isNaN(parseInt(answer[5])) || isNaN(parseInt(answer[7])) || (answer[4]!='Chinese' && answer[4]!='Math') || (answer[6]!='Chinese' && answer[6]!='Math') || answer[4]==answer[6]){
        return false;
    }
    return true;
}
//打印学生信息
function printScores(students) {
    answer = readlineSync.question('请输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：');
    answer = answer.split(',');
    while (!IsCorrectPrintFormat(answer)) {
        answer = readlineSync.question('请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：' );
        answer = answer.split(',');
    }
    let printStr=`成绩单
姓名|语文|数学|平均分|总分
========================\n`;
    let scores=[];
    let sumScores=0;
    for(let student of students){
        for(let i of answer){
            if(student.id==i){
                var total=parseFloat(student.scores.Chinese)+parseFloat(student.scores.Math);
                var average=total/2;
                printStr+=(`${student.name}|${student.scores.Chinese}|${student.scores.Math}|${average}|${total}\n`)
                scores.push(total);
                sumScores+=total;
                break;
            }
        }
    }
    scores.sort(function (a,b) {
        return a-b;
    })
    let aveScores=sumScores/scores.length;
    let medianScores=(scores[Math.floor(scores.length/2)]+scores[Math.floor((scores.length-1)/2)])/2;
    printStr+=`========================
全班总分平均数：${aveScores}
全班总分中位数：${medianScores}`;
    console.log(printStr );
    menu(students);
}
//判断学号格式
function IsCorrectPrintFormat(answer) {
    for(let item of answer){
        if(isNaN(parseInt(item))){
            return false;
            break;
        }
    }
    return true;
}
module.exports=main;