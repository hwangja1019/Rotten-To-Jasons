const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//handling static files from public I hope...
app.use(express.static(path.resolve(__dirname, '../public')));