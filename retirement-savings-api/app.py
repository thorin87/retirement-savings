from flask import Flask
from flask import Response
from flask import jsonify
from flask_cors import CORS, cross_origin
from flask_mysqldb import MySQL

app = Flask(__name__)

import databaseconfig as cfg
app.config['MYSQL_USER'] = cfg.mysql['user']
app.config['MYSQL_PASSWORD'] = cfg.mysql['passwd']
app.config['MYSQL_DB'] = cfg.mysql['db']
app.config['MYSQL_HOST'] = cfg.mysql['host']
mysql = MySQL(app)

#import my_json_encoder
import flask.json
import decimal

class MyJSONEncoder(flask.json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, decimal.Decimal):
            # Convert decimal instances to strings.
            return str(obj)
        return super(MyJSONEncoder, self).default(obj)
app.json_encoder = MyJSONEncoder

CORS(app)

@app.route("/")
def main():
    return "Hello World!"
	
@app.route("/test")
def testdata():
    file = open('static/testdata.json', 'r') 
    file_contents = file.read()
    resp = Response(file_contents, status=200, mimetype='application/json')
    return resp

@app.route("/dbtest")
def fetchfromdb():
    query_string = "SELECT Date, Value FROM rate WHERE Date > '2015-01-01' AND FundId = 1 LIMIT 10" 
    cursor = mysql.connection.cursor()
    cursor.execute(query_string)
    return jsonify(data=cursor.fetchall())
'''
@app.route("/dbtest_errorhandling")
def fetchfromdberrorhandling():
    query_string = "SELECT Date, Value FROM rate WHERE Date > '2015-01-01' AND FundId = 1" 
    try:
        cursor.execute(query_string)
        data = cursor.fetchall()
    except:
        data = "Error: unable to fetch items"
    return jsonify(data)
'''
if __name__ == '__main__':
    app.run(debug=True)
