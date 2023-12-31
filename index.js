import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

import crypto from 'crypto';
import http from 'http';

import { initApp } from "./app.js";


const app = initApp(express, bodyParser, fs.createReadStream, crypto, http);

app.listen(8080)
