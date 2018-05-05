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
