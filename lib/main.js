//学生类
class Student{
    constructor(name,id,race,klass,course1,score1,course2,score2) {
        this.name = name;
        this.id = id;
        this.race=race;
        this.klass=klass;
        this.scores={};
        this.scores[course1]=score1;
        this.scores[course2]=score2;
    }
}
  let students = [];
  const student = new Student('Amy', 1, '汉', 1, 'Chinese', 98, 'Math', 87);
  students.push(student);
  students = menu(students);
//主命令窗口
function  menu(students) {
    var query = require('cli-interact/index.js').getNumber;
    var answer;
    answer = query(`1. 添加学生
2. 生成成绩单
3. 退出
请输入你的选择（1～3）：`, true);		// restrict to integer
    if(answer==1){
        students=addStudent(students);
    }else if(answer==2){
        printScores(students);
    }else{
        menu(students);
    }
    return students;
}
//添加学生信息
function addStudent(students){
    var	query = require('cli-interact/index.js').question;
    var answer;

    answer = query('请输入学生信息（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...），按回车提交：');
    answer=answer.split(',');
    while(!IsCorrectAddFormat(answer)){
        answer = query('请按正确的格式输入（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...），按回车提交：');
        answer=answer.split(',');
    }
    const student=new Student(answer[0],answer[1],answer[2],answer[3],answer[4],answer[5],answer[6],answer[7]);
    students.push(student);
    console.log(`${student.name}成绩被添加`);
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
    var query = require('cli-interact/index.js').question;
    var answer;
    let printStr='';
    answer = query('请输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：');
    answer = answer.split(',');
    while (!IsCorrectPrintFormat(answer)) {
        answer = query('请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：' );
        answer = answer.split(',');
    }
    printStr+=`成绩单
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
    console.log(printStr);
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