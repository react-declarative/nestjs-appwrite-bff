# nestjs-appwrite-bff

> AppWrite PWA bootstrap starter kit

<a href="https://cloud.appwrite.io/card/64b53d046c81edba0b1a">
	<img width="350" src="https://cloud.appwrite.io/v1/cards/cloud?userId=64b53d046c81edba0b1a" alt="Appwrite Cloud Card" />
</a>

## The problem

Currently AppWrite [does not support Long Polling instead of WebSocket](
https://github.com/appwrite/appwrite/issues/5631). This is critical if you want to use [Ngrok](https://ngrok.com). Also, using additional microservices together with the AppWrite functions is a must have feature for API integration to other systems: What if we need to cache some data in Redis before writing into the production database?

## Solution

You can use `createProxyMiddleware` with Express web server to connect your PWA with backend microservices. Also this tool restream AppWrite Realtime events by using [sockjs-client](https://www.npmjs.com/package/sockjs-client)

```typescript
import AppwriteService from "./AppwriteService";
import { CC_APPWRITE_EVENT_RESTREAMER_URL } from "../../../config/params";
import Socket from "sockjs-client";
import TYPES from "../../types";
import { inject } from "react-declarative";
import { makeObservable } from "mobx";

type RealtimeResponseEvent<T extends unknown> = {
  events: string[];
  channels: string[];
  timestamp: number;
  payload: T;
};

export class RealtimeService {
  readonly appwriteService = inject<AppwriteService>(TYPES.appwriteService);

  constructor() {
    makeObservable(this, {});
  }

  subscribe = <T extends unknown>(
    channels: string | string[],
    callback: (payload: RealtimeResponseEvent<T>) => void
  ) => {
    if (CC_APPWRITE_EVENT_RESTREAMER_URL) {
      const socket = new Socket(CC_APPWRITE_EVENT_RESTREAMER_URL);

      socket.onopen = () => {
        socket.send(JSON.stringify(channels));
      };

      socket.onerror = (error) => {
        console.error(error);
      };

      socket.onmessage = (msg) => {
        const payload = JSON.parse(msg.data);
        callback(payload);
      };

      socket.onclose = (...args) => {
        console.log("socket closed", { args });
      };

      return () => socket.close();
    }
    return this.appwriteService.client.subscribe(channels, callback);
  };
}

export default RealtimeService;
```

