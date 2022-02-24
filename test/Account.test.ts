import Account from "../src/Account";
import CurrencyAPIFake from "../src/CurrencyAPIFake";
import sinon from "sinon"
import CurrencyAPI from "../src/CurrencyAPI";

let account: Account;
let currencyAPI: CurrencyAPI;

beforeEach(function () {
    currencyAPI = new CurrencyAPIFake()
    account = new Account(currencyAPI); 
});

test("Deve criar uma conta", function () {
    const balance = account.getBalance();
    expect(balance).toBe(0); 
});

test("Deve fazer um credito de R$100,00", function () {
    account.credit(100);
    const balance = account.getBalance();
    expect(balance).toBe(100); 
});

test("Deve fazer um debito de R$50,00", function () {
    account.credit(100);
    account.debit(50);
    const balance = account.getBalance();
    expect(balance).toBe(50); 
});

test("Deve fazer um debito de U$100,00 com FAKE", function () {
    account.credit(100, "USD");
    const balance = account.getBalance();
    expect(balance).toBe(500); 
});

test("Deve fazer um debito de U$100,00 com STUB", function () {
    sinon.stub(currencyAPI, "convert").returns(600);
    account.credit(100, "USD");
    const balance = account.getBalance();
    expect(balance).toBe(600); 
});

test("Deve criar uma conta com SPY", function () {
    const spy = sinon.spy(account, 'getBalance');
    account.getBalance();
    sinon.assert.calledOnce(spy);    
});

test("Deve fazer um debito de U$100,00 com MOCK", function () {
    const mock = sinon.mock(account);
    mock.expects("credit").once().withArgs(100, "USD");
    mock.expects("getBalance").once().returns(600);
    account.credit(100, "USD");
    const balance = account.getBalance();
    expect(balance).toBe(600);
    mock.verify();
});
