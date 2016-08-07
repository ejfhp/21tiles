#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import logging
import psutil
import subprocess
import os
import yaml
import ipaddress

from flask import Flask
from flask import request

from two1.wallet.two1_wallet import Wallet
from two1.bitserv.flask import Payment

# set up server side wallet
app = Flask(__name__)
wallet = Wallet()
payment = Payment(app, wallet)


# create a 402 (http payment required) end-point that accepts a user's input (zoom, point x, point y) and returns tile coords
@app.route('/tile_coord')
#@payment.required(0)
def tilecoord():
    zoom = request.args.get('zoom')
    lon = request.args.get('x')
    lat = request.args.get('y')

    print('zoom', zoom)
    print('lon=', lon)
    print('lat=', lat)

    output = subprocess.Popen(["node", "build/main.js", "GET_TILE_XY", zoom, lon, lat], stdout=subprocess.PIPE).communicate()[0]
    print('response', output)
    return output

# create a 402 (http payment required) end-point that accepts a user's input (zoom, tile x, tile y) and returns tile geo extent
@app.route('/tile_extent_geo')
#@payment.required(0)
def tile_extent_geo():
    zoom = request.args.get('zoom')
    x = request.args.get('x')
    y = request.args.get('y')

    print('zoom', zoom)
    print('x=', x)
    print('y=', y)

    output = subprocess.Popen(["node", "build/main.js", "GET_TILE_EXT_GEO", zoom, x, y], stdout=subprocess.PIPE).communicate()[0]
    print('response', output)
    return output

# create a 402 (http payment required) end-point that accepts a user's input (zoom, tile x, tile y) and returns tile mercator extent
@app.route('/tile_extent_merc')
#@payment.required(0)
def tile_merc_extent():
    """Get Tiles mercator extent for tile x and y at zoom level zoom"""
    print('get input')
    zoom = request.args.get('zoom')
    x = request.args.get('x')
    y = request.args.get('y')

    print('got input')
    print('zoom', zoom)
    print('x=', x)
    print('y=', y)

    output = subprocess.Popen(["node", "build/main.js", "GET_TILE_EXT_MERC", zoom, x, y], stdout=subprocess.PIPE).communicate()[0]
    print('response', output)
    return output

@app.route('/manifest')
def manifest():
    """Provide the app manifest to the 21 crawler.
    """
    with open('./manifest.yaml', 'r') as f:
        manifest = yaml.load(f)
    return json.dumps(manifest)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
