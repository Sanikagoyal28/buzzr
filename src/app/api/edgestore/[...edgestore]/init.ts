import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';

const store = initEdgeStore.create();

const edgeStoreRouter = store.router({
    questionImages: store.fileBucket()
});

const handler = createEdgeStoreNextHandler({
    router: edgeStoreRouter,
});

export {handler};

export type EdgeStoreRouter = typeof edgeStoreRouter;
