<!-- prettier-ignore-start -->
# Event Scheduler

#### The Event Scheduler is a job scheduling service that allows you to create, update, and delete scheduled events via RESTful APIs. The scheduler supports job persistence across restarts using Redis and MongoDB. The system ensures horizontal scalability by leveraging Redis locks to prevent multiple instances of the application from processing the same job simultaneously.

## Features:

#### Event Management: Create, update, and delete scheduled events.
#### Job Scheduling: Schedule jobs to be executed at a specified time.
#### Persistence: Jobs are stored in MongoDB and persist across application restarts.
#### Job Execution: When a job is executed, the job's parameters are printed to the console.
#### Horizontal Scaling: Redis-based job locking ensures that jobs are executed by only one instance of the application even if scaled horizontally.

## Prerequisites:
#### Node v22.0 or later
#### TS-Node
#### MongoDB

## Installation
### 1. Clone the Repository
#### clone the repository
#### git clone https://github.com/Corey-Code/event-scheduler
#### cd event-scheduler

### 2. Install Dependencies
#### npm install

### 3. Running the Application
#### npm start

### 4. Running the test
#### npm test
<!-- prettier-ignore-end -->
