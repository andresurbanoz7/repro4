from flask import Flask, render_template, jsonify
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/channels')
def get_channels():
    with open('channels.json', encoding='utf-8') as f:
        channels = json.load(f)
    return jsonify(channels)

if __name__ == '__main__':
    app.run(debug=True)
