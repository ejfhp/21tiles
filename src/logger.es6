/**
 * Created by diego on 26/07/16.
 */
import * as console from 'console';
import * as fs from 'fs';

const output = fs.createWriteStream('./stdout.log');
const errorOutput = fs.createWriteStream('./stderr.log');

export const logger = new console.Console(output, errorOutput);
