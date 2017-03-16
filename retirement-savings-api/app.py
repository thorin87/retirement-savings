from flask import Flask
from flask import Response
from flask import jsonify
from flask_cors import CORS, cross_origin
from flask.ext.mysql import MySQL

def decimal_default(obj):
    if isinstance(obj, decimal.Decimal):
        return float(obj)
    raise TypeError

'''
class CustomJSONEncoder(JSONEncoder):
    def default(self, obj):
        try:
        if isinstance(obj, decimal.Decimal):
            return float(obj)
        except TypeError:
            pass
        else:
            return list(iterable)
        return JSONEncoder.default(self, obj)
'''
app = Flask(__name__)
CORS(app)
#app.json_encoder = CustomJSONEncoder
mysql = MySQL()
 
import databaseconfig as cfg
# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = cfg.mysql['user']
app.config['MYSQL_DATABASE_PASSWORD'] = cfg.mysql['passwd']
app.config['MYSQL_DATABASE_DB'] = cfg.mysql['db']
app.config['MYSQL_DATABASE_HOST'] = cfg.mysql['host']
mysql.init_app(app)

conn = mysql.connect()
cursor = conn.cursor()

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
    query_string = "SELECT Date, CAST(VALUE * 100 AS INT) FROM rate WHERE Date > '2015-01-01' AND FundId = 1" 
    cursor.execute(query_string)
    return jsonify(data=cursor.fetchall())

if __name__ == '__main__':
    app.run(debug=True)
