import 'websocket-polyfill';

import fetch from 'node-fetch';

(globalThis as any).fetch = fetch;
