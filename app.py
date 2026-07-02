from flask import Flask, render_template

app = Flask(__name__)


app.config['SECRET_KEY'] = 'very_secret_key'
app.config['SESSION_COOKIE_HTTPONLY'] = True  # Prevent XSS

@app.route('/')
def home():
    return render_template('roman_converter.html')

@app.route('/api/convert_integer', methods=['POST'])
def convert_integer():
    roman_dict = {
        "M": 1000,
        "CM": 900,
        "D": 500,
        "CD": 400,
        "C": 100,
        "XC": 90,
        "L": 50,
        "XL": 40,
        "X": 10,
        "IX": 9,
        "V": 5,
        "IV": 4,
        "I": 1
    }
    final_str = ''

    for roman, decimal in roman_dict.items():
        final_str += (number // decimal) * roman
        number -= decimal * (number // decimal)

    return final_str

if __name__ == '__main__':
    app.run(debug=True, port=8000)