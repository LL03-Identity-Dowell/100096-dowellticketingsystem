import Ticket from "../../models/ticketModel.js";

const waitingQueues = {};

export async function onJoinRoom(io, socket, data) {
    const { ticket_id, public_id } = data;

    console.log(`Received joinRoom request with ticket_id: ${ticket_id} and public_id: ${public_id}`);

    if (!ticket_id) {
        console.error("No ticket_id provided in joinRoom request.");
        return socket.emit("error", "Ticket ID is required to join a room");
    }

    let ticket;
    try {
        ticket = await Ticket.findById(ticket_id);
    } catch (error) {
        console.error("Error fetching ticket:", error);
        return socket.emit("error", "Error fetching ticket data");
    }

    if (!ticket) {
        console.error(`Ticket with ID ${ticket_id} not found.`);
        return socket.emit("error", "Ticket not found");
    }
    
    const lineManagerId = ticket.line_manager[0];
    console.log(`Ticket found with line manager ID: ${lineManagerId}`);

    if (!waitingQueues[lineManagerId]) {
        waitingQueues[lineManagerId] = [];
    }

    waitingQueues[lineManagerId].push({ public_id, socket });
    updateWaitingTimes(lineManagerId);

    console.log(`Client ${public_id} added to queue for line manager ${lineManagerId}.`);

    if (waitingQueues[lineManagerId].length === 1) {
        startChatSession(io, lineManagerId);
    }
}

function updateWaitingTimes(lineManagerId) {
    waitingQueues[lineManagerId].forEach((client, index) => {
        const waitingTime = index * 5;
        client.socket.emit("waitingTime", {
            waitingTime,
            message: `Your estimated waiting time is approximately ${waitingTime} minutes.`
        });
    });
}

function startChatSession(io, lineManagerId) {
    const client = waitingQueues[lineManagerId][0];
    if (!client) return;

    client.socket.emit("startChat", {
        message: "Your chat session has started.",
        details: {
            lineManagerName: "John Doe",  
            sessionDuration: "5 minutes",
            instructions: "Feel free to share your concerns or ask questions. You have up to 5 minutes for this session. Please let the line manager know if you need further assistance."
        },
        startTime: new Date().toISOString()
    });

    io.to(lineManagerId).emit("newChatSession", {
        client: client.public_id,
        message: "A new client has joined your session."
    });

    const sessionTimer = setTimeout(() => {
        endChatSession(io, lineManagerId);
    }, 5 * 60 * 1000);

    client.socket.on("endChatEarly", () => {
        clearTimeout(sessionTimer);
        endChatSession(io, lineManagerId);
    });
}

function endChatSession(io, lineManagerId) {
    const finishedClient = waitingQueues[lineManagerId].shift();

    finishedClient.socket.emit("endChat", {
        message: "Your chat session has ended."
    });

    console.log(`Client ${finishedClient.public_id} chat session ended with line manager ${lineManagerId}`);

    updateWaitingTimes(lineManagerId);

    if (waitingQueues[lineManagerId].length > 0) {
        startChatSession(io, lineManagerId);
    }
}
