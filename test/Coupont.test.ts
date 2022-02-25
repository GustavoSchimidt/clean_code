import Coupon from "../src/Coupon"

test("Deve criar um cupom de desconto valido", function () {
    const coupon = new Coupon("VALE20", 20, new Date("2022-03-10"));
    const today = new Date("2022-02-10")
    const isValid = coupon.isValid(today);
    expect(isValid).toBeTruthy()
});

test("Deve criar um cupom de desconto expirado", function () {
    const coupon = new Coupon("VALE20", 20, new Date("2021-02-10"));
    const today = new Date("2022-02-10")
    const isExpired = coupon.isExpired(today);
    expect(isExpired).toBeTruthy()
});

test("Deve criar um cupom de desconto valido e calcular o desconto", function () {
    const coupon = new Coupon("VALE20", 20);
    const discount = coupon.calculateDiscount(1000);
    expect(discount).toBe(200)
});

