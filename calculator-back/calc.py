from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


class Calculator:
    def __init__(self):
        # Define a dictionary of operations for each operator
        self.operations = {
            '+': self.add,
            '-': self.subtract,
            '*': self.multiply,
            '/': self.divide,
        }

    def add(self, operand1, operand2):
        # Addition operation
        return operand1 + operand2

    def subtract(self, operand1, operand2):
        # Subtraction operation
        return operand1 - operand2

    def multiply(self, operand1, operand2):
        # Multiplication operation
        return operand1 * operand2

    def divide(self, operand1, operand2):
        # Division operation
        if operand2 == 0:
            raise ValueError('Division by zero is not allowed')
        return operand1 / operand2

    def calculate(self, operand1, operand2, operator):
        # Use appropriate operation for operator to return result
        valid_operation = self.operations.get(operator)
        if not valid_operation:
            raise ValueError('Invalid operator')
        
        result = valid_operation(operand1, operand2)
        return result


calculator = Calculator()


@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.get_json()
    operand1 = data['operand1']
    operand2 = data['operand2']
    operator = data['operator']

    try:
        result = calculator.calculate(operand1, operand2, operator)
        return jsonify({'result': result})
    except ValueError as e:
        return jsonify({'error': str(e)}), 400


if __name__ == '__main__':
    app.run(debug=True)

