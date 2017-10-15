# coding=utf-8

from flask import Flask
from flask import Response
from flask import request
from flask import jsonify
from flask_cors import CORS, cross_origin
from flask_mysqldb import MySQL
import uuid
import json
import datetime
from datetime import date

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

@app.route("/token", methods=['GET', 'POST'])
def token():
    if request.method == 'POST' and 'token' in request.json:
        query = "INSERT INTO User (Token, Admin) VALUES ('{0}', 0)"
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
    query_string = getAvailableProducts('IKZE')
    return fetchFromDbReturnAsJSON(query_string)

def getAvailableProducts(productType):
    return '''SELECT prod.Id, prod.Name, inst.Name AS Owner, insttype.Name AS OwnerType
            FROM InvestmentProduct prod
            JOIN FinancialInstitution inst ON prod.FinancialInstitutionId = inst.Id
            JOIN FinancialInstitutionType insttype ON inst.TypeId = insttype.Id
            WHERE prod.Type = '{0}' '''.format(productType)

@app.route("/fund")
def fund():
    query_string = "SELECT Id, Name FROM Fund"
    return fetchFromDbReturnAsJSON(query_string)

@app.route('/fund/<int:fundId>/rates', methods=['GET', 'POST'])
def fundRates(fundId):
    if request.method == 'POST':
        if 'token' in request.json and check_if_admin(request.json['token']):
            values = []
            for row in request.json['data']:
                values.append("('{0}', {1}, {2})".format(row['Date'], row['Value'], fundId))
            insert_query = '''INSERT IGNORE INTO Rate (`Date`,`Value`,`FundId`) VALUES ''' + ', '.join(values)
            insertToDb(insert_query)
            return jsonify(), 201, {'location': '/fund/{0}/rates'.format(fundId)}
    else:
        query_string = "SELECT Date, Value FROM Rate WHERE FundId = " + fundId
        return fetchFromDbReturnAsJSON(query_string)

@app.route('/wallet', methods=['GET', 'POST'])
def wallet():
    if request.method == 'POST':
        if 'token' in request.json and check_if_admin(request.json['token']):
            query_string = "INSERT INTO Wallet (Name) VALUES ('{0}')".format(request.json['name'])
    else:
        query_string = '''SELECT Wallet.Id, Wallet.Name, prod.Name AS ProductName, inst.Name AS Owner, insttype.Name AS OwnerType
        FROM Wallet 
        JOIN InvestmentProduct prod ON prod.Id = Wallet.InvestmentProductId
        JOIN FinancialInstitution inst ON prod.FinancialInstitutionId = inst.Id
        JOIN FinancialInstitutionType insttype ON inst.TypeId = insttype.Id
        WHERE Wallet.UserId = 1'''
        return fetchFromDbReturnAsJSON(query_string)

@app.route('/wallet/<int:walletId>/assets', methods=['GET', 'POST'])
def walletAssets(walletId):
    if request.method == 'POST':
        query_string = 'INSERT INTO Asset (Quantity, OperationDate, WalletId, FundId) VALUES ({0}, {1}, {2}, {3})'
        query_string = query_string.format(request.json['quantity'], request.json['operationDate'], walletId, request.json['fundid'])
        #assetId = insertToDb(query_string)
        #return
    else:
        query_string = '''SELECT Fund.Name AS FundName, SUM(Quantity) AS Quantity, OperationDate FROM Asset 
        JOIN Fund ON Fund.Id = Asset.FundId
        WHERE WalletId = {0}
        GROUP BY Asset.FundId
        HAVING Quantity > 0
        ORDER BY OperationDate DESC'''
        query_string = query_string.format(walletId)
        return fetchFromDbReturnAsJSON(query_string)

@app.route('/wallet/<int:walletId>/assets/history')
def walletAssetsHistory(walletId):
    query_string = '''SELECT Fund.Name AS FundName, Quantity, OperationDate FROM asset 
    JOIN Fund ON Fund.Id = Asset.FundId
    WHERE WalletId = {0} ORDER BY OperationDate DESC'''
    query_string = query_string.format(walletId)
    return fetchFromDbReturnAsJSON(query_string)

@app.route('/allAssets')
def allAssets():
    # assets_query = '''SELECT FundId, OperationDate FROM Asset 
    # JOIN Wallet ON Wallet.Id = Asset.WalletId
    # WHERE Wallet.UserId = 1
    # GROUP BY Asset.FundId'''
    # asset_ids = query_db(assets_query)
    
    # min_date = date.today()
    # fund_ids = []
    # for row in asset_ids:
    #     if row['OperationDate'].date() < min_date:
    #         min_date = row['OperationDate'].date()
    #     if row['FundId'] not in fund_ids:
    #         fund_ids.append(row['FundId'])
    
    
    # values_at_date_query = '''SELECT FundId, Date, Value FROM Rate WHERE Date >= '%s' AND FundId IN (%s) ORDER BY Date ASC'''
    # values_at_date_query = values_at_date_query % (min_date, ",".join(map(str, fund_ids)))
    # values_at_date = query_db(values_at_date_query)
    #values_at_date = query_db(values_at_date_query, (min_date, ",".join(map(str, fund_ids))))

    #return jsonify(values_at_date_query2, values_at_date, (min_date, ",".join(map(str, fund_ids)) ))

    query = '''SELECT DatesToCalculateValue.Date, 
	ROUND(SUM(Asset.Quantity * (SELECT Value FROM Rate WHERE Date <= DatesToCalculateValue.Date AND FundId = Asset.FundId ORDER BY Date DESC LIMIT 1)), 2) AS Value
    FROM Wallet
    JOIN Asset ON Asset.WalletId = Wallet.Id
    JOIN Rate AS OperationDateRate
	ON Asset.FundId = OperationDateRate.FundId
	AND OperationDateRate.Date = Asset.OperationDate
    JOIN (SELECT Date FROM Rate GROUP BY Date ORDER BY Date) AS DatesToCalculateValue
	ON DatesToCalculateValue.Date >= Asset.OperationDate
    WHERE Wallet.UserId = 1
    GROUP BY DatesToCalculateValue.Date
    ORDER BY DatesToCalculateValue.Date'''
    return fetchFromDbReturnAsJSON(query)

@app.route('/summary')
def summary():
    money_spent_query = '''SELECT ROUND(SUM(Quantity * Value), 2) as Value
    FROM Asset 
    JOIN Rate ON Rate.Date = Asset.OperationDate AND Rate.FundId = Asset.FundId'''
    money_spent = fetchSingle(money_spent_query)

    current_value_query = '''SELECT ROUND(SUM(Quantity * Value), 2) as Value
    FROM Asset 
    JOIN Rate ON Rate.FundId = Asset.FundId
    JOIN (SELECT FundId, MAX(Date) as MaxDate FROM Rate GROUP BY FundId) AS RateMax
    ON RateMax.MaxDate = Rate.Date AND RateMax.FundId = Rate.FundId'''
    current_value = fetchSingle(current_value_query)

    invest_days_query = '''SELECT DATEDIFF(NOW(), MIN(OperationDate)) FROM Asset JOIN Wallet ON Asset.WalletId = Wallet.Id WHERE Wallet.UserId = 1'''
    invest_days = fetchSingle(invest_days_query)

    lastUpdateInDaysQuery = '''SELECT DATEDIFF(NOW(), MAX(Date)) FROM Rate'''
    lastUpdateInDays = fetchSingle(lastUpdateInDaysQuery)

    difference = current_value[0] - money_spent[0]
    earn_per_year = difference * 356 / invest_days[0]

    return jsonify(saved = money_spent[0], 
    have = current_value[0], 
    diff = difference,
    percentage = difference * 100/current_value[0],
    meanPercentage = earn_per_year * 100/current_value[0],
    period = invest_days[0],
    lastUpdateInDays = lastUpdateInDays[0],
    lastDepositDate = '09-11-2016')

########## datebase helper method
def fetchSingle(query):
    cursor = mysql.connection.cursor()
    cursor.execute(query)
    return cursor.fetchone()

def query_db(query, args=(), one=False):
    cur = mysql.connection.cursor()
    try:
        cur.execute(query, args)
        #poniżej magia, nie ruszać
        r = [dict((cur.description[i][0], value) \
                for i, value in enumerate(row)) for row in cur.fetchall()]
        data = (r[0] if r else None) if one else r
    except:
        data = "Error: unable to fetch items"
    return data

def fetchFromDbReturnAsJSON(query):
    return jsonify(data=query_db(query))

def insertToDb(query):
    cursor = mysql.connection.cursor()
    cursor.execute(query)
    mysql.connection.commit()
    return cursor.lastrowid

########## 
#TODO dodać pobieranie tokena z settings a potem z url/cookie
def getUserId():
    return 1

def check_if_admin(token):
    query = "SELECT Admin FROM User WHERE Token = '{0}'"
    query = query.format(token)
    isAdmin = fetchSingle(query)
    return isAdmin[0] == 1

if __name__ == '__main__':
    app.run(debug=True)
