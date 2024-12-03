const { Kafka } = require('kafkajs');

async function createProducer() {
    const kafka = new Kafka({
        clientId: 'producer',
        brokers: ['kafka:9092']
    });

    const producer = kafka.producer();
    await producer.connect();
    console.log('Producer connected to Kafka');

    return producer;
}

// export default createProducer;
module.exports = createProducer;
