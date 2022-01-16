// main calculator function
class Calculator {
    // constructor to set and manage the previous and current number 
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    // to clear all the number and operation from screen
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }


    // to delete the number
    delete() {
        // slice method is used to extract the string and show the extracted part
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    // to insert the number on screen 
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        // converting to string as we have to show numbers and not to add them as Js will add the bumbers but not the string
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    // to choose operation for calculation
    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    // to calculate and show the result on screen
    compute() {
        let computation
        const prev = parseFloat(this.previousOperand) // converting string to number
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return      // isNan means it is not a number
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    // to update the screen number values
    updateDisplay() {
        this.currentOperandTextElement.innerText =
            this.currentOperand
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.previousOperand} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

// selecting all the elements from DOM and stroing in a variable
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

// creating a calculator
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)


// handles every click on numbers button
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})


//handles every click on operation button
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

////handles every click on equals to button
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

// clears all the value on screen
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

// deletes the recent added number on screen
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})