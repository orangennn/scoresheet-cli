let sinon = require("sinon");
let readlineSync=require("cli-interact");
let main = require("../lib/main");

describe('main', () => {
    beforeEach(() => {
        sinon.stub(readlineSync, 'question');
        sinon.stub(console, 'log');
    });

    afterEach(() => {
        readlineSync.question.restore();
        console.log.restore();
    });

    it('should display main menu once started', () => {
        readlineSync.question.returns('');
        main();
        expect(readlineSync.question.args.join()).toBe(`1. 添加学生
2. 生成成绩单
3. 退出
请输入你的选择（1～3）：`);
    });

    it('should exit', () => {
        readlineSync.question.returns(3);
        main();
        expect(readlineSync.question.calledOnce).toBe(true);
    });

    it('should add student info', () => {
        readlineSync.question.onFirstCall().returns(1);
        readlineSync.question.onSecondCall().returns("Amy,1,汉,201701,Chinese,100,Math,90");
        readlineSync.question.onThirdCall().returns(3);
        main();
        expect(console.log.getCall(0).args[0]).toBe("学生Amy的成绩被添加");
        //expect(spy.calledWith("Amy的成绩被添加")).to.be.ok;
    });

    it('should print client menu when add student info succeed', () => {
        readlineSync.question.onFirstCall().returns(1);
        readlineSync.question.onSecondCall().returns("Amy,1,汉,201701,Chinese,100,Math,90");
        readlineSync.question.onThirdCall().returns(3);
        main();
        expect(readlineSync.question.lastCall.args.join().includes("请输入你的选择（1～3）：")).toBe(true);
    });

    it('should print score sheet', () => {
        readlineSync.question
            .onCall(0).returns(1)
            .onCall(1).returns("Amy,1,汉,201701,Chinese,100,Math,90")
            .onCall(2).returns(1)
            .onCall(3).returns("Sam,2,汉,201701,Chinese,90,Math,88")
            .onCall(4).returns(2)
            .onCall(5).returns('1,2')
            .onCall(6).returns(3)
        main();
        expect(console.log.getCall(2).args[0]).toBe(`成绩单
姓名|语文|数学|平均分|总分
========================
Amy|100|90|95|190
Sam|90|88|89|178
========================
全班总分平均数：184
全班总分中位数：184`);
    });

    it('should ask to retry when add student info failed', () => {
        let invalidStudentInfo = "3";
        readlineSync.question
            .onCall(0).returns(1)
            .onCall(1).returns(invalidStudentInfo)
            .onCall(2).returns("Amy,1,汉,201701,Chinese,100,Math,90")
            .onCall(3).returns(3);
        main();
        expect(readlineSync.question.thirdCall.args.join()).toBe('请按正确的格式输入（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...），按回车提交：');
    });

    it('should ask to retry when id info invalid',()=>{
        let invalidIdInfo = "w";
        readlineSync.question
            .onCall(0).returns(2)
            .onCall(1).returns(invalidIdInfo)
            .onCall(2).returns("1")
            .onCall(3).returns(3);
        main();
        expect(readlineSync.question.thirdCall.args.join()).toBe('请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：');
    })


});
