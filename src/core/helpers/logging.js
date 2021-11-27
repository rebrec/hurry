import { createLogger, format, transports } from 'winston';
import { inspect } from 'util';
import { hasAnsi} from './helpers'


const config = {
  logger: {
    maxModuleNameLength: 25,
    displayTimestamp: false,
    filterModuleNames: true, // if true, only modules within 'keptModulesNames' will continue to be logged
    filterModuleNames: false,
    keptModuleNames: [  // list of modules to log (only used if filterModuleNames == true)
      // 'ShellManager',
    ]
  }
}


/** adapted from https://stackoverflow.com/questions/11386492/accessing-line-number-in-v8-javascript-chrome-node-js
 * Use CallSite to extract filename and number, for more info read: https://v8.dev/docs/stack-trace-api#customizing-stack-traces
 * @returns {string} filename and line number separated by a colon
 */
const getFileNameAndLineNumber = () => {
  const oldStackTrace = Error.prepareStackTrace;
  try {
      // eslint-disable-next-line handle-callback-err
      const stackTrace = {};
      Error.prepareStackTrace = (err, structuredStackTrace) => structuredStackTrace;
      Error.stackTraceLimit = 20; 
      Error.captureStackTrace(stackTrace);
      let foundDerivedLogger = false;
      const callSite = stackTrace.stack.find(line => {
        let funcName = line.getFunctionName() ?? ''; // <== See also https://v8.dev/docs/stack-trace-api
        const res = foundDerivedLogger;
        if (funcName.indexOf('DerivedLogger')>-1) foundDerivedLogger = true;
        return res;
      });
      return callSite.getFileName() + ':' + callSite.getLineNumber();
  } finally {
      Error.prepareStackTrace = oldStackTrace;
  }
};


function isPrimitive(val) {
  return val === null || (typeof val !== 'object' && typeof val !== 'function');
}
function formatWithInspect(val) {
  const prefix = isPrimitive(val) ? '' : '\n';
  const shouldFormat = typeof val !== 'string' || !hasAnsi(val);

  return prefix + (shouldFormat ? inspect(val, { depth: null, colors: true }) : val);
}

const filterModuleNames = format((info, opts) => {
  if (config.logger.filterModuleNames && !config.logger.keptModuleNames.includes(info.moduleName) ) { return false; }
  return info;
});
const {maxModuleNameLength} = config.logger;

const myFormat = format.printf( (info) => {
  // { level, message, timestamp, moduleName, ...metadata}
  const msg = formatWithInspect(info.message);
  const splatArgs = info[Symbol.for('splat')] || [];
  const rest = splatArgs.map(data => formatWithInspect(data)).join(' ');

  // return `${info.timestamp} - ${info.level}: ${msg} ${rest}`;



    let res = '';
    if (config.logger.displayTimestamp) res += `${info.timestamp} | `
    res += `${info.moduleName.padEnd(maxModuleNameLength, ' ').substr(0, maxModuleNameLength)} `
    res += ('[' + info.level + ']').padStart(19, ' ');
    res += ` : ${msg} ${rest}`  
    res += `                    [${getFileNameAndLineNumber()}]`;
    return res
  }
);

const logger = createLogger({
    level: 'silly',
    format: format.combine(
        format.colorize(),
        // format.errors({ stack: true }),
        // splat(),
        // prettyPrint(),
        format.timestamp(),
        filterModuleNames(),
        myFormat ,
    ),
    transports: [
        new transports.Console(),
        //new transports.File({ filename: 'testloginfo.txt', level:'info'})
    ]
});

export default function getChildLogger(name) {
  return logger.child({moduleName: name});
}