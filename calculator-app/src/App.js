import './App.css'
import React, { Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            operand1: 0,
            operand2: 0,
            operator: '+',
            result: 0,
            error: null,
        };
    }

    calculate = () => {
        const { operand1, operand2, operator } = this.state;
        const url = 'http://localhost:5000/calculate';

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                operand1,
                operand2,
                operator,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    this.setState({ error: data.error, result: 0 });
                } else {
                    this.setState({ result: data.result, error: null });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    render() {
        const { operand1, operand2, operator, error, result } = this.state;

        return (
            <div className="App">
                <h1>Calculator</h1>
                <input
                    type="number"
                    value={operand1}
                    onChange={(e) => this.setState({ operand1: parseFloat(e.target.value) })}
                />
                <input
                    type="number"
                    value={operand2}
                    onChange={(e) => this.setState({ operand2: parseFloat(e.target.value) })}
                />
                <select
                    className="operator"
                    value={operator}
                    onChange={(e) => this.setState({ operator: e.target.value })}
                >
                    <option value="+" className="operator_option">+</option>
                    <option value="-" className="operator_option">-</option>
                    <option value="*" className="operator_option">*</option>
                    <option value="/" className="operator_option">/</option>
                </select>
                <pre></pre><button onClick={this.calculate} className="btn">Calculate</button>
                {error ? <p className="error">Error: {error}</p> : <p className="result">Result: {result}</p>}
            </div>
        );
    }
}

export default App;
