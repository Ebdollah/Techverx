type Pizza = {
    name: string,
    price: number
}

type Order = {
    id: number,
    pizza: Pizza,
    status: "ordered" | "completed"
}

const menu = [
    {name : "Margherita", price : 8},
    {name : "Pepperoni", price : 10},
    {name : "Hawaiian", price : 10},
    {name : "Veggue", price : 9},
]

let cashInRegister = 100
const orderQueue: Order[] = []
let nextOrderId = 1

function addNewPizza(pizza: Pizza){
    menu.push(pizza)
}

function placeOrder(pizzaName: string){
    const pizzaObj = menu.find(pizza => pizza.name === pizzaName)
    if (!pizzaObj) {
        throw new Error(`Pizza with name "${pizzaName}" not found.`);
    }
    cashInRegister += pizzaObj.price
    const newOrder: Order = {id : nextOrderId++, pizza  : pizzaObj, status : "ordered"}
    orderQueue.push(newOrder)
    return newOrder
}
 

function completeOrder(orderId: number){
    const currentOrder = orderQueue.find(order => order.id === orderId)
    if (!currentOrder){
        throw new Error(`Pizza with "${currentOrder}" not found.`);
    }
    const order = {...currentOrder, status : "completed"}
    return order
}

addNewPizza({name: "Chili", price: 12})
addNewPizza({name: "BBQ", price: 10})
addNewPizza({name: "Chicken", price: 9})

placeOrder("Chicken")
completeOrder(1)