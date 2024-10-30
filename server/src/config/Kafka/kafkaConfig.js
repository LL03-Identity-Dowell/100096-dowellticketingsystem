import kafka from 'kafkajs'

const Kafka = new kafka({
    clientId: "ticket-app",
    brokers: ["localhost:9092"]
})

module.exports = Kafka