"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv")); // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
const useraccounts_json_1 = __importDefault(require("./useraccounts.json"));
const axios_1 = __importDefault(require("axios"));
const cors = require("cors");
dotenv.config();
const app = (0, express_1.default)();
app.use(cors());
app.use(express_1.default.json());
const port = process.env.PORT;
console.log(useraccounts_json_1.default);
app.post("/connect", (req, res) => {
    console.log(req.body);
    if (req.body.connectionString == "IPXDEMO") {
        res.send("IPXDEMO Express Server");
    }
});
app.post("/cameraConnect", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log("send Camera connection");
    res.send("SENDING CAMERA CONNECTION");
    const username = "admin";
    const password = "AtlasIED-123";
    const url = "https://172.26.58.5/rest/session";
    let cameraRes;
    try {
        cameraRes = yield axios_1.default.post(url, { user: username, password: password });
    }
    catch (err) {
        if (axios_1.default.isAxiosError(err)) {
            if (((_a = err.response) === null || _a === void 0 ? void 0 : _a.status) == 400) {
                console.log("400 ", err.response);
            }
            else if (((_b = err.response) === null || _b === void 0 ? void 0 : _b.status) == 401) {
                console.log("401 ", err.response);
            }
            else {
                console.log("??? ", err.response);
            }
        }
    }
    console.log(cameraRes);
    if ((cameraRes === null || cameraRes === void 0 ? void 0 : cameraRes.status) == 200) {
        console.log(cameraRes);
    }
}));
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    let userEntry = useraccounts_json_1.default.users.find((user, index) => user.username === username);
    console.log("entry found", userEntry);
    if (userEntry) {
        //found user
        if (userEntry.password == password) {
            console.log("password match");
            res.send({ username: username, name: userEntry.name, status: true });
        }
        else {
            //invalid password
            console.log("password not matched");
            res.status(401).send(`username: ${username} - invalid password`);
        }
    }
    else {
        //invalid user
        res.status(400).send(`username: ${username} - not found`);
    }
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
