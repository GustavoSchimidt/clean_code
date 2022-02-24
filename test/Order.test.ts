import Coupon from "../src/Coupon";
import Item from "../src/Item";
import Order from "../src/Order";

test("Deve criar um pedido vazio com cpf valido", function () {
    const cpf = "573.381.980-47";
    const order = new Order(cpf);
    const total = order.getTotal();
    expect(total).toBe(0);
});

test("Deve tentar criar um pedido vazio com cpf invalido", function () {
    const cpf = "222.222.222-22";
    expect(() => new Order(cpf)).toThrow(new Error("Invalid cpf"));
});


test("Deve criar um pedido com 3 itens", function () {
    const cpf = "573.381.980-47";
    const order = new Order(cpf);
    order.addItem(new Item(1, "Musica", "CD", 30), 3);
    order.addItem(new Item(2, "Video", "DVD", 50), 1);
    order.addItem(new Item(3, "Video", "VHS", 10), 2);
    const total = order.getTotal();
    expect(total).toBe(160);
});

test("Deve criar um pedido com 3 itens com um cupom de desconto", function () {
    const cpf = "573.381.980-47";
    const order = new Order(cpf);
    order.addItem(new Item(1, "Musica", "CD", 30), 3);
    order.addItem(new Item(2, "Video", "DVD", 50), 1);
    order.addItem(new Item(3, "Video", "VHS", 10), 2);
    order.addCoupon(new Coupon("VALE20", 20));
    const total = order.getTotal();
    expect(total).toBe(128);
});