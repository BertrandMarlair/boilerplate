import { PubSub } from 'apollo-server';

const pubsub = new PubSub();

export default pubsub;

export const generateSubscribtionForEvent = (...events) => {
    return {
        subscribe: () => pubsub.asyncIterator(events),
    };
};
