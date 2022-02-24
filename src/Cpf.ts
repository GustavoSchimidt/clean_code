export default class Cpf {
    value: string;

    constructor (value: string) {
        if (!this.validate(value)) throw new Error("Invalid cpf");
        this.value = value;
    }

    validate(cpf: string) {
    if (!cpf) return false;
    cpf = this.clean(cpf);
    if (!this.hasMinimumLength(cpf)) return false;
    if (this.isBlocked(cpf)) return false;
    const digit1 = this.calculateDigit(cpf, 10);
    const digit2 = this.calculateDigit(cpf, 11);
    const actualDigit = this.extractActualDigit(cpf);
    const calculatedDigit = `${digit1}${digit2}`;
    return actualDigit === calculatedDigit;
    }    

    clean (cpf: string) {
        return cpf.replace(/\D/g, "");
    }
    
    hasMinimumLength (cpf: string) {
        return cpf.length === 11;
    }
    
    isBlocked (cpf: string) {
        const [firstDigit] = cpf;
        return [...cpf].every(digit => digit === firstDigit);
    }
    
    calculateDigit (cpf: string, factor: number) {
        let total = 0;
        for (const digit of cpf) {
            if (factor > 1) {
                total += parseInt(digit) * factor--;
            }
        }
        const rest = total % 11;
        return (rest < 2) ? 0 : 11 - rest;
    }
    
    extractActualDigit (cpf: string) {
        return cpf.slice(9);
    }
}