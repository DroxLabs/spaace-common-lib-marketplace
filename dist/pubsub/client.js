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
Object.defineProperty(exports, "__esModule", { value: true });
const pubsub_1 = require("@google-cloud/pubsub");
const dotenv = require("dotenv");
const types_1 = require("./types");
dotenv.config();
class PubSubClient {
    constructor() {
        var _a;
        this.pubsub = new pubsub_1.PubSub({
            projectId: (_a = process.env.PUBSUB_PROJECT_ID) !== null && _a !== void 0 ? _a : 'staake',
        });
    }
    /**
     * Initialize the PubSub client.
     * Create topics and subscriptions if they don't exist.
     */
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createTopics();
            yield this.createSubscriptions();
        });
    }
    /**
     * Create topics if they don't exist
     */
    createTopics() {
        return __awaiter(this, void 0, void 0, function* () {
            const topics = Object.values(types_1.PubSubTopics);
            for (const topic of topics) {
                try {
                    const [exists] = yield this.pubsub.topic(topic).exists();
                    if (exists) {
                        console.log(`Topic ${topic} already exists, skipping.`);
                    }
                    else {
                        yield this.pubsub.createTopic(topic);
                        console.log(`Topic ${topic} created.`);
                    }
                }
                catch (error) {
                    console.log(`Error creating topic ${topic}:`, error);
                }
            }
        });
    }
    /**
     * Create subscriptions if they don't exist
     */
    createSubscriptions() {
        return __awaiter(this, void 0, void 0, function* () {
            const [topics] = yield this.pubsub.getTopics();
            const subscriptions = Object.values(types_1.PubSubSubscriptions);
            subscriptions.forEach((subscription, idx) => __awaiter(this, void 0, void 0, function* () {
                const topic = topics[idx];
                try {
                    const [exists] = yield topic.subscription(subscription).exists();
                    if (exists) {
                        console.log(`Subscription ${subscription} to topic ${topic.name} already exists, skipping.`);
                    }
                    else {
                        yield topic.createSubscription(subscription);
                        console.log(`Subscription ${subscription} to topic ${topic.name} created.`);
                    }
                }
                catch (error) {
                    console.log(`Error creating subscription ${subscription}:`, error);
                }
            }));
        });
    }
    /**
     * Publish a message to a topic
     * @param topicName - Topic name
     * @param data - Data to publish
     * @returns Message ID or null if error
     */
    publish(topicName, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataBuffer = Buffer.from(JSON.stringify(data));
            try {
                console.log('Publishing message:', data);
                return this.pubsub.topic(topicName).publishMessage({
                    data: dataBuffer,
                });
            }
            catch (error) {
                console.log('Error publishing message:', error);
                return null;
            }
        });
    }
    /**
     * Subscribe to a topic and listen for related messages
     * @param subscriptionName - Subscription name
     * @param callback - Callback function
     */
    subscribe(subscriptionName, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const subscription = this.pubsub.subscription(subscriptionName);
            subscription.on('message', callback);
        });
    }
}
exports.default = new PubSubClient();
//# sourceMappingURL=client.js.map