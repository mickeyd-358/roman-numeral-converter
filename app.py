from flask import Flask, render_template

app = Flask(__name__)


app.config['SECRET_KEY'] = 'very_secret_key'
app.config['SESSION_COOKIE_HTTPONLY'] = True  # Prevent XSS

@app.route('/')
def home():
    return render_template('roman_converter.html')

if __name__ == '__main__':
    app.run(debug=True, port=8000)