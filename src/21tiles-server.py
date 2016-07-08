import os
from flask import Flask, request

# import from the 21 Developer Library
from two1.wallet import Wallet
from two1.bitserv.flask import Payment

# set up server side wallet
app = Flask(__name__)
wallet = Wallet()
payment = Payment(app, wallet)

# create a 402 (http payment required) end-point that accepts a user's input (tiles coord zoom,x,y) and translates it geo extent and returns it
@app.route('/tileextent')
#@payment.required(3000)
def trans():
    """Get WGS84 Extent for tile (x. y) at zoom level z"""
    # Get user's input text
    print('get input')
    z = request.args.get('z')
    x = request.args.get('x')
    y = request.args.get('y')


    # Send a request to Google's Translate REST API using your API credentials defined above
    ans = 'geo coords'
    print(ans)

    # Return translated text back to user
    return ans['translations'][0]['translatedText']

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)