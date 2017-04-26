from flask import Flask
from flask import Response
from flask import request
from flask import jsonify
from flask_cors import CORS, cross_origin
from flask_mysqldb import MySQL
import uuid

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

@app.route("/dbtest")
def fetchfromdb():
    query_string = "SELECT Date, Value FROM Rate WHERE Date > '2015-01-01' AND FundId = 5"
    cursor = mysql.connection.cursor()
    cursor.execute(query_string)
    return jsonify(data=cursor.fetchall())

@app.route("/token", methods=['GET', 'POST'])
def token():
    if request.method == 'POST' and 'token' in request.json:
        query = "INSERT INTO user (Token, Admin) VALUES ('{0}', 0)"
        query = query.format(request.json['token'])
        try:
            insertedId = insertToDb(query)
            return jsonify(userid=insertedId, error=None)
        except:
            error = "Error: unable to insert token"
            return jsonify(userid=None, error=error)
    else:
        return jsonify(token=uuid.uuid4())

@app.route("/ike")
def ike():
    query_string = getAvailableProducts('IKE')
    return fetchFromDbReturnAsJSON(query_string)

@app.route("/ikze")
def ikze():
    query_string = getAvailableProducts('IKE')
    return fetchFromDbReturnAsJSON(query_string)

def getAvailableProducts(productType):
    return '''SELECT prod.Id, prod.Name, inst.Name AS Owner, insttype.Name AS OwnerType
            FROM InvestmentProduct prod
            JOIN FinancialInstitution inst ON prod.FinancialInstitutionId = inst.Id
            JOIN FinancialInstitutionType insttype ON inst.TypeId = insttype.Id
            WHERE prod.Type = '{0}' '''.format(productType)

@app.route("/fund")
def fund():
    query_string = "SELECT Id, Name FROM fund"
    return fetchFromDbReturnAsJSON(query_string)

@app.route('/fund/<int:fundId>/rates')
def fundRates(fundId):
    query_string = "SELECT Date, Value FROM rate WHERE FundId = " + fundId
    return fetchFromDbReturnAsJSON(query_string)

@app.route('/wallet', methods=['GET', 'POST'])
def wallet():
    if request.method == 'POST':
        query_string = "INSERT INTO wallet (Name) VALUES ('{0}')".format(request.json['name'])
    else:
        query_string = "SELECT Name FROM wallet"
        return fetchFromDbReturnAsJSON(query_string)

@app.route('/wallet/<int:walletId>/assets', methods=['GET', 'POST'])
def walletAssets(walletId):
    if request.method == 'POST':
        query_string = 'INSERT INTO asset (Quantity, Bought, WalletId, FundId) VALUES ({0}, {1}, {2}, {3})'
        query_string = query_string.format(request.json['quantity'], request.json['bought'], walletId, request.json['fundid'])
        #assetId = insertToDb(query_string)
        #return
    else:
        query_string = '''SELECT fund.Name AS FundName, Quantity, Bought FROM asset 
        JOIN fund ON fund.Id = asset.FundId
        WHERE WalletId = {0} AND Sold IS NULL
        ORDER BY Bought DESC'''
        query_string = query_string.format(walletId)
        return fetchFromDbReturnAsJSON(query_string)

@app.route('/wallet/<int:walletId>/assets/history')
def walletAssetsHistory(walletId):
    query_string = '''SELECT fund.Name AS FundName, Quantity, Bought, Sold FROM asset 
    JOIN fund ON fund.Id = asset.FundId
    WHERE WalletId = {0} ORDER BY Bought DESC'''
    query_string = query_string.format(walletId)
    return fetchFromDbReturnAsJSON(query_string)

def fetchFromDbReturnAsJSON(query):
    cursor = mysql.connection.cursor()
    cursor.execute(query)
    return jsonify(data=cursor.fetchall())

def insertToDb(query):
    cursor = mysql.connection.cursor()
    cursor.execute(query)
    mysql.connection.commit()
    return cursor.lastrowid

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
