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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const shelljs_1 = __importDefault(require("shelljs"));
// docs: https://github.com/ggerganov/whisper.cpp
const WHISPER_CPP_PATH = path_1.default.join(__dirname, '..', 'external/whisper.cpp');
const WHISPER_CPP_MAIN_PATH = "./main";
// default passed to shelljs exec
const defaultShellOptions = {
    silent: true,
    async: false
};
// return shelljs process
function whisperShell(command, options = defaultShellOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                // docs: https://github.com/shelljs/shelljs#execcommand--options--callback
                shelljs_1.default.exec(command, options, (code, stdout, stderr) => {
                    if (code === 0)
                        resolve(stdout);
                    else
                        reject(stderr);
                });
            }
            catch (error) {
                reject(error);
            }
        }));
    });
}
exports.default = whisperShell;
try {
    // shell.cd(__dirname + WHISPER_CPP_PATH);
    shelljs_1.default.cd(WHISPER_CPP_PATH);
    // ensure command exists in local path
    if (!shelljs_1.default.which(WHISPER_CPP_MAIN_PATH)) {
        shelljs_1.default.echo("[whisper-node] Problem. whisper.cpp not initialized. Current shelljs directory: ", __dirname);
        shelljs_1.default.echo("[whisper-node] Attempting to run 'make' command in /whisper directory...");
        // todo: move this
        shelljs_1.default.exec("make", defaultShellOptions);
        if (!shelljs_1.default.which(WHISPER_CPP_MAIN_PATH)) {
            console.log("[whisper-node] Problem. 'make' command failed. Please run 'make' command in /whisper directory. Current shelljs directory: ", __dirname);
            process.exit(1);
        }
        else
            console.log("[whisper-node] 'make' command successful. Current shelljs directory: ", __dirname);
    }
}
catch (error) {
    console.log("error caught in try catch block");
    throw error;
}
//# sourceMappingURL=shell.js.map