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

test("Deve criar um pedido com 3 itens com um cupom de desconto expirado", function () {
    const cpf = "573.381.980-47";
    const order = new Order(cpf, new Date("2022-02-28"));
    order.addItem(new Item(1, "Musica", "CD", 30), 3);
    order.addItem(new Item(2, "Video", "DVD", 50), 1);
    order.addItem(new Item(3, "Video", "VHS", 10), 2);
    order.addCoupon(new Coupon("VALE20", 20, new Date("2022-01-10")));
    const total = order.getTotal();
    expect(total).toBe(160);
});

test("Deve criar um pedido com 3 itens com o calculo do frete", function () {
    const cpf = "573.381.980-47";
    const order = new Order(cpf);
    order.addItem(new Item(4, "Jogos", "GTA VI", 1000, 100, 30, 10, 3), 1);
    order.addItem(new Item(5, "Livros", "Rari Poty e a Pedra da filosofia", 5000, 100, 50, 50, 20), 1);
    order.addItem(new Item(6, "Acessorios", "Cabo HDMI", 30, 10, 10, 10, 0.9), 3);
    const freight = order.getFreight();
    expect(freight).toBe(257);
});