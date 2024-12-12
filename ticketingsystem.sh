#!/bin/bash

# Check if the .env.development file exists
if [ ! -f .env.development ]; then
  echo "Error: .env.development file not found! Please create this file."
  exit 1
fi

# Check if the docker-compose.dev.yml file exists
if [ ! -f docker-compose.dev.yml ]; then
  echo "Error: docker-compose.dev.yml file not found! Please create this file."
  exit 1
fi

# Set resource names
DoWellTicketingSystem_IMAGE_PREFIX="dowellticketingsystem"
MONGO_VOLUME="mongo-data"
NETWORK_NAME="queue-net"

# Function to clean up containers, images, volumes, and network
cleanup() {
  echo "Starting cleanup process for DoWell Ticketing System..."

  echo "Stopping all DoWell Ticketing System containers..."
  docker stop mongo_container client server > /dev/null 2>&1

  # Remove all DoWell Ticketing System containers
  echo "Removing all DoWell Ticketing System containers..."
  docker rm mongo_container client server > /dev/null 2>&1

  # Remove all DoWell Ticketing System images
  echo "Removing all DoWell Ticketing System Docker images..."
  docker rmi $(docker images -q --filter "reference=mongo*") > /dev/null 2>&1
  docker rmi $(docker images -q --filter "reference=client*") > /dev/null 2>&1
  docker rmi $(docker images -q --filter "reference=server*") > /dev/null 2>&1

  # Remove the MongoDB volume
  echo "Removing the MongoDB Docker volume..."
  docker volume rm $MONGO_VOLUME > /dev/null 2>&1

  # Optionally remove the DoWell Ticketing System network
  echo "Removing the DoWell Ticketing System Docker network..."
  docker network rm $NETWORK_NAME > /dev/null 2>&1

  echo "Cleanup complete. All DoWell Ticketing System containers, images, and volumes have been removed."
}

# Function to display the interactive menu
show_menu() {
  echo "Please select the service you want to run:"
  echo "1) All (This will remove all containers and images and start everything from scratch. NOTE: It will take time)"
  echo "2) Server (Only start the server)"
  echo "3) Client (Only start the client)"
  echo "4) Server & Client (Start both server and client)"
  echo "5) Exit"
  read -p "Enter your choice [1-5]: " choice
}

# Main script logic
if [ $# -eq 0 ]; then
  # Show the interactive menu if no argument is passed
  while true; do
    show_menu
    case $choice in
      1)
        echo "You chose: All. Cleaning up and starting everything..."
        cleanup

        # Start all services and rebuild everything
        docker-compose --env-file .env.development -f docker-compose.dev.yml up --build --force-recreate
        echo "All services have been successfully rebuilt and started!"
        break
        ;;
      2)
        echo "You chose: Server. Starting only the server..."
        SERVICES="server"
        docker-compose --env-file .env.development -f docker-compose.dev.yml up $SERVICES
        echo "Server has been successfully started!"
        break
        ;;
      3)
        echo "You chose: Client. Starting only the client..."
        SERVICES="client"
        docker-compose --env-file .env.development -f docker-compose.dev.yml up $SERVICES
        echo "Client has been successfully started!"
        break
        ;;
      4)
        echo "You chose: Server & Client. Starting both server and client..."
        SERVICES="server client"
        docker-compose --env-file .env.development -f docker-compose.dev.yml up server client kafka
        echo "Server and Client have been successfully started!"
        break
        ;;
      5)
        echo "Exiting..."
        exit 0
        ;;
      *)
        echo "Invalid choice. Please select a valid option (1-5)."
        ;;
    esac
  done
else
  echo "Usage: ./run.sh (Run the script without arguments for interactive mode)"
  exit 1
fi