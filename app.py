from flask import Flask, render_template
import pandas as pd
import numpy as np


app = Flask(__name__)


# Load files at the beginning to improve performance
error_data = pd.read_csv("static/data/error_LGR.txt").to_csv()


@app.route('/')
def index():
    page = render_template('home.html')
    return page


@app.route('/get_error_data')
def get_error_data():
    return error_data


if __name__ == '__main__':
    app.run()
