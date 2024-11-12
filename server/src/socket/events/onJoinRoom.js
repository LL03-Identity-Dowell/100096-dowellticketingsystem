import Ticket from "../../models/ticketModel.js";

// Map to store the waiting queue for each line manager
const waitingQueues = {};

export async function onJoinRoom(io, socket, data) {
    const { ticket_id, public_id, role } = data;

    console.log(`Received joinRoom request with ticket_id: ${ticket_id}, public_id: ${public_id}, and role: ${role}`);

    if (!ticket_id || !public_id) {
        console.error("Missing ticket_id or public_id in joinRoom request.");
        return socket.emit("error", "Ticket ID and Public ID are required to join a room");
    }

    // Fetch the ticket to validate its existence and assigned line manager
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

    // Verify the role and join the appropriate room
    const lineManagerId = ticket.line_manager[0];
    console.log(`Ticket found with line manager ID: ${lineManagerId}`);

    if (role === "line_manager") {
        if (lineManagerId.toString() !== public_id) {
            console.error(`Line manager ${public_id} is not assigned to this ticket.`);
            return socket.emit("error", "You are not assigned to this ticket");
        }
        socket.join(ticket_id);
        console.log(`Line manager ${public_id} joined room ${ticket_id}.`);
        socket.emit("joinedRoom", { message: "You have joined the room as a line manager" });
    } else if (role === "client") {
        if (!waitingQueues[lineManagerId]) {
            waitingQueues[lineManagerId] = [];
        }

        waitingQueues[lineManagerId].push({ public_id, socket });
        updateWaitingTimes(lineManagerId);

        console.log(`Client ${public_id} added to queue for line manager ${lineManagerId}.`);

        // If client is first in queue, start their session immediately
        if (waitingQueues[lineManagerId].length === 1) {
            startChatSession(io, lineManagerId);
        }
    } else {
        socket.emit("error", "Invalid role specified");
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

    io.to(client.public_id).emit("newChatSession", {
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
