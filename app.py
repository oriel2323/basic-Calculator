from flask import Flask, render_template, request, jsonify
import calculations

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/calculate', methods=['POST'])
def calculate():
    data = request.json
    num1 = data.get('num1')
    num2 = data.get('num2')
    action = data.get('action')

    if num1 is None or num2 is None or not action:
        return jsonify({'error': 'Missing data'}), 400

    try:
        if action == "+":
            result = calculations.add(num1, num2)
        elif action == "-":
            result = calculations.sub(num1, num2)
        elif action == "*":
            result = calculations.mul(num1, num2)
        elif action == "/":
            result = calculations.div(num1, num2)
        else:
            return jsonify({'error': 'Invalid action'}), 400
        
        return jsonify({'result': result})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
