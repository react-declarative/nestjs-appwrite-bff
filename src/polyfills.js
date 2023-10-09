import 'websocket-polyfill';
import 'localstorage-polyfill';

import fetch from 'node-fetch';

globalThis.fetch = fetch;
globalThis.window = globalThis;
