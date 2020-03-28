// 遍历器/迭代器
// 1. 创建一个指针对象/遍历器对象 指向数据结构起始位置
// 2. 第一次调用 next 方法，指针自动指向数据结构的第一个成员
// 3. 再次调用 next 方法 指针一直向后移动，直到指向最后一个成员
// 4. 每次调用 next 方法返回一个包含 value 和 done 的对象
//    value 表示成员的值，遍历结束后返回 undefined
//    done 表示当前数据是否遍历结束，true 代表结束，false 代表为完成
function Iterator(params) {
    let nextIndex = 0
    return {
        next: function () {
            return nextIndex < params.length ? { value: params[nextIndex++], done: false } : { value: undefined, done: true }
        }
    }
}

let object = Iterator([1, 'a', true])
console.log(object.next())
console.log(object.next())
console.log(object.next())
console.log(object.next())
console.log(object.next())