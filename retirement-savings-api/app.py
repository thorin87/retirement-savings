from flask import Flask
from flask import Response

app = Flask(__name__)

@app.route("/")
def main():
    return "Hello World!"
	
@app.route("/test")
def testdata():
    file = open('static/testdata.json', 'r') 
    file_contents = file.read()
    resp = Response(file_contents, status=200, mimetype='application/json')
    return resp

if __name__ == '__main__':
    app.run(debug=True)
