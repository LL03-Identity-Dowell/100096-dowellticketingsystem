const { Kafka } = require('kafkajs');

async function startConsumer() {
    const kafka = new Kafka({
        clientId: 'consumer',
        brokers: ['kafka:9092']
    });

    const consumer = kafka.consumer({ groupId: 'group1' });
    await consumer.connect();
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log(`Received message: ${message.value.toString()}`);
        }
    });

    console.log("consumer successfully started");
}

startConsumer().catch(console.error);
