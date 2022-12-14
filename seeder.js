"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs = require('fs');
var mongoose = require('mongoose');
var chalk = require('chalk');
var dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
var notes_model_1 = require("./server/models/notes-model");
var dictionary_model_1 = require("./server/models/dictionary.model");
var CONN = 'mongodb://127.0.0.1:27017/Notes_app';
var note;
var definition;
mongoose
    .connect(CONN)
    .then(function () {
    console.log(chalk.bgBlue('Connection to database was successful'));
    if (process.argv[2] === 'i') {
        note = JSON.parse(fs.readFileSync("".concat(__dirname, "/server/_data/notes.json"), 'utf-8').toString());
        importData();
    }
    if (process.argv[2] === 'd') {
        deleteData();
    }
    else if (process.argv[2] === 'e') {
        definition = JSON.parse(fs.readFileSync("".concat(__dirname, "/server/_data/csvjson.json"), 'utf-8').toString());
        importDictionary();
    }
})["catch"](function (err) {
    console.log(chalk.red("MongoDB Error: ".concat(err)));
});
//Read file
//Import into DB
var importData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, notes_model_1["default"].create(note)];
            case 1:
                _a.sent();
                console.log(chalk.bgMagentaBright('Data Imported...'));
                process.exit();
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
/* Delete database data */
var deleteData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, notes_model_1["default"].deleteMany()];
            case 1:
                _a.sent();
                console.log(chalk.bgRed('Data Destroyed...'));
                process.exit();
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                console.log(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
/* Import Dictionary */
var importDictionary = function () { return __awaiter(void 0, void 0, void 0, function () {
    var err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, dictionary_model_1["default"].create(definition)];
            case 1:
                _a.sent();
                console.log(chalk.bgMagentaBright('Data Imported...'));
                process.exit();
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                console.log(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
/* seeds database with json document
Use:
node seeder.js i
or
node seeder.js d */
if (process.argv[2] === 'i') {
    importData();
}
if (process.argv[2] === 'd') {
    deleteData();
}
else if (process.argv[2] === 'e') {
    importDictionary();
}
