#!/bin/bash


RES1=`node build/main.js GET_TILE_XY 10 10 45`;
RES2=`node build/main.js GET_TILE_EXT_GEO 10 540 360`;
RES3=`node build/main.js GET_TILE_EXT_MERC 10 540 360`;
echo risultato:
echo 
echo 
echo  -------
echo $RES1
echo  -------
echo  -------
echo $RES2
echo  -------
echo  -------
echo $RES3
echo  -------
