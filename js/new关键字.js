// nes 实现
function _new(func, ...arg) {
    // let obj = {}
    // obj.__proto__ = func.prototype
    let obj = Object.create(func.prototype)
    func.call(obj, ...arg)
    return obj
}


function Person(name) {
    this.name = name
}
Person.prototype.say = function () {
    console.log(this.name)
}



let alice = _new(Person, 'Alice')
alice.say()
console.log(alice instanceof Person)