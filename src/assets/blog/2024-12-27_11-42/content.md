# Starting out with System Design (Part 1)

## Introduction

Game development has always been a passion of mine. While I've created small games in the past, I've yet to dive into the complexity and scale of larger genres—like MMOs, RTS, and other expansive projects. Tackling these challenges has been a dream of mine, and as I dig deeper, the importance of system design becomes increasingly evident.

Game development isn’t just about writing code; it’s about building interconnected systems that operate seamlessly and reliably. Understanding these systems is critical for creating scalable, maintainable, and enjoyable games.

## Planning

The first step for any project is planning: defining what you want to achieve and how to go about it. For me, that meant creating detailed design documents. These documents help outline the big picture while breaking down the essential details. They’ve been invaluable for staying organized and ensuring I have a clear path forward. You can also easily share these with your teams or product testers to get their feedback.

I started with three core design documents:

1. **Feature Design**: To display gameplay elements like leveling systems, skill trees, crafting, and items.
2. **System Design**: To define how interconnected systems—like user data, multiplayer functionality, and resource management—would work together.
3. **API Design**: To establish how middleware would handle communication between systems and ensure scalability and reliability.

The game is an MMORPG, so it has your typical RPG elements, such as a leveling system, skill trees, unlockables, and a crafting system along with various armors, weapons, and items. Beyond the core features, it was important to plan the game world itself: the environments, lore, and how regions are connected. Interactivity, such as how players will cooperate or compete, will also play a central role in system design. It may be fun to initially bundle many features together at the start, but as the design document grows, you'll be able to detect weak points and alter the design to better suit the needs of the project.

Next, I needed to figure out how to store game data efficiently. I started by designing schemas for core elements like items, skills, and other key systems. Each of these need to be carefully connected in the database to ensure scalability, especially as the player base grows.

## Technical Approach

For the tech stack, I decided to use Java due to its robust ecosystem and my familiarity with the language. Here’s an overview of the core technologies chosen:

1. **MySQL**: Relational Database
    - **Why**: MySQL is a reliable, widely-used relational database system. Its support for complex queries, transactions, and data integrity makes it a solid choice for managing game state, player data, and world interactions. I chose MySQL due to its ease of use, my familiarity with the technology, and its ability to scale horizontally as the game grows.
    - **Considerations**: Since MMORPGs often deal with millions of player interactions, ensuring the database can scale horizontally was a key factor in the decision. Partitioning, sharding, and replication are essential considerations for managing large datasets and maintaining high performance.
2. **RabbitMQ**: Message Handling
    - **Why**: RabbitMQ is a popular and open-source message broker that allows for communication between systems in a *decoupled manner*. In an MMORPG, different parts of the game (like the user authentication service, inventory management, or world state synchronization) need to interact efficiently. RabbitMQ ensures that communication between services is asynchronous and scalable.
    - **Considerations**: RabbitMQ's reputation for reliability and high throughput makes it a valuable tool for managing data transactions between servers and the database. It ensures that data is processed and stored smoothly, allowing microservices to focus on their specific tasks and can be scaled independently.
3. **Spring Boot**: REST API
    - **Why**: Spring Boot is a powerful framework for building modular, scalable backend systems. In this case, it allows for easy integration with the database and can power our API endpoints to serve data to any of our services or third-party applications that want to use any public game related data.
    - **Considerations**: Spring Boot's modular architecture and its support for microservices make it a valuable tool for building a scalable backend. It allows for easy integration with other technologies like RabbitMQ and MySQL, and its support for RESTful APIs makes it easy to serve data to any of our services or third-party applications that want to use any public game related data.
4. **Caffeine**: In-Memory Caching
    - **Why**: Caching is crucial for reducing the load on the database and improving response times. Caffeine is a high-performance, lightweight caching library for Java. It will be used to store frequently accessed data, such as online players or other data that is frequently accessed.
    - **Considerations**: Caching allows for fast read operations, which are critical in real-time gaming environments. Caffeine’s automatic eviction policies ensure that stale or unused data is removed from memory, while its high throughput ensures minimal performance bottlenecks during peak usage times.

These technologies form the backbone of the project’s system design.

## Scalability, Reliability, and Redundancy

By choosing these technologies, I've created a system that is event-driven, with RabbitMQ handling asynchronous communication between microservices and the game servers. When a player makes any type of meaningful change (e.g., crafting an item, leveling up), RabbitMQ ensures that the relevant systems are notified, and MySQL stores the updated data. Caffeine will be used to cache the most frequently accessed data, allowing for quick retrieval during gameplay. I also needed to consider how to scale the system, how to ensure reliability and redundancy, and how to backup data.

1. **Load Balancing**: Load balancing across multiple servers is crucial for distributing traffic evenly and maintaining server health during peak usage times. Depending on the traffic, new server instances are started or stopped to handle the load.
2. **Database Sharding and Partitioning**: Given the high volume of data that MMORPGs generate, sharding the MySQL database to distribute player data across multiple servers, ensuring that no single server becomes a bottleneck.
3. **Eventual Consistency**: In MMORPGs, near-instantaneous synchronization across all players isn’t always possible, especially with large, distributed databases. Using eventual consistency and designing for resilience will allow the system to tolerate delays and network failures while still providing a reliable player experience.
4. **Fault Tolerance**: By leveraging RabbitMQ’s message persistence and MySQL’s built-in replication capabilities, I’ll ensure that the system is fault-tolerant. This means that even if a server goes down, no player data will be lost, and gameplay can continue without major disruptions.
5. **Backup Strategies**: Regular database backups and using redundant systems for caching will help ensure that no critical data is lost. In the event of a failure, a backup system will be able to take over without affecting the player experience.

## What's next?

In the next part, I'll dive into the implementation of the system design, with schemas and how data is communicated between services.
