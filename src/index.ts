console.log("this is index.ts.js");

require("./style.2.less");

let a: number = null;
console.log(a);
a = undefined;

let arr: any[] = ["ee", 2, 3];

enum Color {
    a,
    b,
    c = "5a",
}

console.log(Color.a);
console.log(Color[1]);
console.log(Color["5a"]);
console.log(Color.c);

let obj: object = String;
console.log(obj);

function getString(str: string | number): number {
    let num: number;
    // 高速ts编译器我的str是什么类型，断言str为string就可以取length
    // 前提是str类型可以是string
    // 两种方式: <类型>变量  或  变量 as 类型

    // num = (<string>str).length
    num = (str as string).length;
    return num;
}

console.log(getString("12"));

interface ISearchFunc {
    //定义一个调用签名
    (a: string, b: string): boolean;
}

//定义一个函数，使用定义的签名
const searchFunc: ISearchFunc = (a: string, b: string): boolean => {
    console.log(a.search(b));
    return a.search(b) > -1;
};

console.log(searchFunc("2123", "123"));

interface IFly {
    fly();
}

//类接口
interface IFly2 {
    fly2();
}

//类中 implements 的类接口都要实现
class Person implements IFly, IFly2 {
    fly() {
        console.log("实现IFly里的定义");
    }
    fly2() {
        console.log("实现IFly2里的定义");
    }
}

let per1 = new Person();
per1.fly();
per1.fly2();

/**
 * class
 *
 * 继承:类与类的关系
 * 继承后类与类之间的叫法:
 *      A类继承B类:那么A类叫子类，B类叫基类
 *           子类: -> 派生类
 *           基类: -> 超类（父类）
 *
 * 多态:子类重写父类结果 是不同子类实例调用父级可以产生不同的结果
 * 修饰符:作用类中的成员,拿来设置成员(属性、构造函数、方法)的可访问性
 *      类中成员有默认修饰符public(外部实例可以通过 . 访问类中成员)
 *      public:公共的，任何地方都能访问
 *      protected:受保护的，(修饰后类类外部无法访问,但子类可以访问)
 *      private:私有的,(修饰后类类外部与子类都无法访问)
 *      !readonly:只读的,对类中的 属性 成进行修饰，修饰后其他地方只能获取，只有构造函数中能修改
 *
 * 四种修饰符修饰构造函数的属性：
 *      效果一样
 *      但是有修饰符的属性就不需要定义成员属性，也不需要this.name = name;的步骤了
 *
 *
 *  。。。。
 *
 *
 */
(() => {
    //定义一个基类
    class Person {
        //定义属性
        name: string;
        age: number;
        gender: string; //性别
        //定义构造函数
        constructor(name: string, age: number, gender: string) {
            //更新属性
            this.name = name;
            this.age = age;
            this.gender = gender;
        }
        //定义实例方法
        sayHi(str: string) {
            console.log(`我是${this.name}`, str);
        }
    }

    //定义一个子类
    class Student extends Person {
        //定义构造函数
        constructor(name: string, age: number, gender: string) {
            //使用super调用父级的构造函数
            super(name, age, gender);
        }

        sayHi() {
            console.log(`我是子类重写sayHi`);
            super.sayHi("我在调用父类的sayHi方法");
        }
    }

    // let stu1 = new Student("aa",10,'男');
    // stu1.sayHi();
})();

/**
 * 存取器
 */
(() => {
    //定义一个基类
    class Person {
        //定义属性
        name: string;
        age: number;
        //定义构造函数
        constructor(name: string, age: number) {
            //更新属性
            this.name = name;
            this.age = age;
        }

        get nameage() {
            //获取nameage的时候直接调用
            console.log("调用get");
            return this.name + "_" + this.age;
        }
        set nameage(val: string) {
            //设置nameage的时候直接调用
            console.log("调用set");
            this.name = val.split("_")[0];
            this.age = Number(val.split("_")[1]);
        }
    }

    let stu1 = new Person("aa", 10);
    console.log(stu1); //name:"aa",age:10
    console.log(stu1.nameage); //aa_10
    console.log((stu1.nameage = "bb_20"));
    console.log(stu1); //name:"bb",age:20
})();

/**
 * 静态成员
 *      通过 static 修饰的属性或方法
 *      调用:类名.xxx 方式调用的，不能通过实例对象来使用
 *      普通方法不能获取静态属性
 *
 */
(() => {
    //定义一个基类
    class Person {
        //定义属性
        static name1: string;

        //定义构造函数
        constructor() {}
        //定义实例方法
        static sayHi(str: string) {
            console.log(`我是${this.name1}`, str);
        }
    }

    console.log(Person.name1);
    Person.sayHi("静态成员方法");
    console.log((Person.name1 = "cc"));
    Person.sayHi("静态成员方法");
})();

/**
 * 抽象类
 *      抽象方法,只能定义,函数体不能有东西
 *      可以包含非抽象方法
 *      不能被实例化
 *      抽象类的子类必须实现抽象方法和抽象属性才能实例化
 *
 * 抽象类类似模板,定义的抽象方法和抽象属性子类必须拥有
 * 抽象类的目的和作用都是为子类服务的
 *
 */
(() => {
    //定义一个基类
    abstract class Person {
        //定义属性
        abstract name: string = "123";

        //定义方法
        abstract eat();

        //定义实例方法
        sayHi(str: string) {
            console.log(`我是${this.name}`, str);
        }
    }

    class Dog extends Person {
        name: string;
        eat() {
            console.log("实现eat");
        }
    }
    let dog = new Dog();
    dog.sayHi("str");
    dog.eat();
    console.log(dog.name);
})();

let add: (a: string, b: string) => string = (a: string, b: string): string => a + b;

console.log(add("123", "456"));

/**
 *
 * @param a  默认参数,有默认值,可以不传
 * @param b  可选参数
 * @param ...args  剩余参数,必须放在最后面,如果参数够多，默认和可选一定会占一个
 */
function test(a: number = 123, b?: number, ...args: number[]): number {
    console.log(a); //1
    console.log(b); //2
    console.log(args); //[3,4,5,6,7,8]
    return a + b;
}

test(1, 2, 3, 4, 5, 6, 7, 8);

//重载练习失败
(() => {
    type Combinable = string | number;
    function add(a: number, b: number): number;
    function add(a: string, b: string): string;
    function add(a: string, b: number): string;
    function add(a: number, b: string): string;
    function add(a: Combinable, b: Combinable) {
        if (typeof a === "string" || typeof b === "string") {
            return a.toString() + b.toString();
        }
        return a + b;
    }
    // function add(x: string | number, y: string | number): string | number {
    //     if (typeof x === "string" && typeof y == "string") {
    //         return x + y;
    //     } else if (typeof x === "number" && typeof y == "number") {
    //         return x + y;
    //     }
    // }
})();

(() => {
    /**
     *  泛型:
     *      在定义接口、函数、类的时候不能确定要使用的数据类型，只能在接口、函数、类调用的时候才能确定的数据类型
     *       定义时不知道类型，利用T..等字幕占位，调用的时候将类型传入
     *  T:type
     */

    function createArray<T>(value: T): T[] {
        return [value];
    }

    //指定T为number类型number
    let caarr1 = createArray<number>(1);
    //一个泛型,调用时如果不指定，编译器通过参数自动推导出T的类型
    let caarr2 = createArray("1");

    //----------------------------------------------------------------------

    function createArray2<T, K>(value: T, key: K): K[] {
        return [key];
    }
    let ca1 = createArray2<string, number>("123", 123);
    let ca2 = createArray2("123", true); //通过参数自动推导出T,K的类型

    //----------------------------------------------------------------------
    //多个泛型实现反转
    let swap = <T, K>(tuple: [T, K]): [K, T] => {
        return [tuple[1], tuple[0]];
    };

    console.log(swap(["123", true]));

    //-----类中---
    class Person<T> {
        name: T;
    }
    new Person<string>();

    //-----接口中---
    interface PersonInt<T> {
        name: T;
    }
    let pint: PersonInt<string> = {
        name: "123",
    };
    console.log(pint);
})();

(() => {
    /**
     *  泛型约束:
     *      如果直接对一个泛型取length会报错，一个编译器不知道T到的有没有length
     *      限制调用时传入的内容
     *      <T extends ILength> //必须有长度,并且可调用split方法
     */

    //定义一个接口用来约束将来某个类型中必要的length属性
    interface ILength {
        length: number;
        split
    }

    function getLength<T extends ILength>(x: T): number {
        x.split("")
        return x.length;
    }

    console.log(getLength<string>("ds"))
})();

(()=>{
    /**
     *  内置对象
     */
    let str:string = "";
    //let str2:string = new String("str") //“string”是基元，但“String”是包装器对象会报错
    let str3:String = new String("str") //正确
    console.log(str,str3)
})()

//https://www.bilibili.com/video/BV1rf4y167am?p=41&spm_id_from=pageDriver
