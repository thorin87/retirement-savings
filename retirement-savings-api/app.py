from flask import Flask
from flask import Response
from flask.ext.mysql import MySQL

app = Flask(__name__)
mysql = MySQL()
 
import database.config as cfg
# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = mysql['user']
app.config['MYSQL_DATABASE_PASSWORD'] = mysql['password']
app.config['MYSQL_DATABASE_DB'] = mysql['db']
app.config['MYSQL_DATABASE_HOST'] = mysql['host']
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
    query_string = "SELECT * FROM rate WHERE Date > '2015-01-01'" 
    cursor.execute(query_string)
    data = cursor.fetchall()
    return data

if __name__ == '__main__':
    app.run(debug=True)
