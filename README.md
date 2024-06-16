# Blockchain Based Supply Chain Management

<b><p align="justify">Abstract: In today’s globalized marketplace, efficient and transparent supply chain management is paramount. This project harnesses cutting-edge technology stacks to develop a robust and forward-thinking solution. At its core, it leverages the Ethereum blockchain platform, utilizing Solidity smart contracts to ensure the tamper-proof tracking of goods from their origin to their ultimate destination. This blockchain-based foundation establishes an unassailable record of all supply chain transaction, enhancing transparency, traceability, and trust. The project incorporates Ganache, a personal blockchain for Ethereum development, enabling seamless testing and deployment of smart contracts within a local, simulated environment. The frontend, designed with React JS, offers an intuitive and user-friendly interface for supply chain stakeholders. It enables real-time tracking, ensuring that users can access and validate crucial product and transaction data at any point in the supply chain process. Additionally, a comprehensive tracker has been integrated, allowing stakeholders to monitor the journey of any product along the supply chain flow, providing visibility into the parties involved at each stage. User authentication is provided by Ethereum stakeholder addresses, leveraging the inherent security and decentralized nature of the Ethereum blockchain. Web3.js enables smooth communication between the blockchain network and the backend, facilitating the seamless exchange of data and information. On the backend, powered by Node.js, seamless data processing and management is facilitated. This rich technology stack creates a dependable, decentralized, and transparent supply chain management that enhances accountability and trust throughout the entire supply network. By fostering transparency and traceability, this project empowers business to operate more efficiently and confidently in today’s complex and interconnected global market.</div></b>

## Table of Contents

- Introduction
  - What is a Blockchain?
  - What is a Supply Chain?
  - Problem Statement
  - Objectives
- Architecture Diagram
- Working of Contract

## Introduction

### What is a Blockchain?

<p align="justify">Blockchain technology is a distributed, decentralized digital ledger that enables safe, transparent transaction recording and verification by numerous parties. It was initially presented as the core technology of the well-known cryptocurrency Bitcoin. Its promise goes far beyond virtual currency, though. A blockchain is fundamentally made up of a series of blocks, each of which has a list of transactions on it. Cryptographic methods are used to connect these blocks, resulting in an unchangeable and impenetrable record of every transaction. Because of its decentralized structure, transactions may be verified and validated without the need of a central authority like a bank or government.</p>

### What is a Supply Chain?

<p align="justify">The network of all the people, companies, assets, processes, and technological advancements involved in developing and providing a good or service from suppliers to consumers is known as a supply chain. It includes every step of the process, from locating raw materials to shipping the finished good to the customer. While minimizing costs, efficient supply chain management guarantees that the appropriate product is delivered at the right time, in the right amount, and in the desired quality. Businesses must manage this intricate worldwide network of distributors, manufacturers, suppliers, and shipping companies in order to satisfy consumer needs and stay competitive.</p>

<div align="center">
  <img src="/client/public/Supply-Chain-Example.jpeg" />
</div>
<br>
<p align="justify">This image illustrate the key components and flow of a typical supply chain. It depicts the interconnected network of entities involved in the process of transforming raw materials into finished products and delivering them to the end consumer.</p>

<p align="justify">At the center is the "Raw Materials" component, which serves as the starting point for the supply chain. Surrounding it are the various participants:</p>

<ol type="1">
  <li><b>Supplier:</b> Responsible for providing the raw materials needed for production</li>
  <li><b>Manufacturer:</b> Uses the raw materials to produce the final product.</li>
  <li><b>Distributer</b>: Facilitates the logistics and movement of goods from the manufacturer to retailers.</li>
  <li><b>Retailer:</b> The point of sale where consumers can purchase the products.</li>
  <li><b>Consumer:</b> The end-user who drives the demand for the product.</li>
</ol>

<p align="justify">The image shows the directional flow of materials, products, and logistics, connecting each participant in the supply chain. It highlights the interdependencies and coordination required among all the entities to ensure the efficient transformation of raw materials into finished goods and their delivery to the end consumer.</p>

### Problem Statement

<p align="justify">Supply chains in today's global business environment face challenges such as lack of transparency, traceability, fraud, delays, and fragmented traditional systems resulting in errors. Counterfeiting is a significant concern, especially in global supply chains, posing brand reputation and safety risks. Delayed payments to smaller suppliers create cash flow problems and disrupt efficiency. Opaqueness of financial transactions leads to miscommunications and conflicts, hindering cooperation and trust within the supply chain, impacting communication, cooperation, and innovation.</p>

### Objectives

<div align="justify">
  <ol type="a" align="justify">
    <li>To develop a robust blockchain-based supply chain ledger on the Ethereum platform using Solidity smart contracts.</li>
    <li>To utilize Reacr JS to build an intuitive interface that offers transparency and real-time tracking across the supply chain.</li>
    <li>To develop smart contracts in Solidity that automate payment processes based on predefined conditions, reducing the risk of delayed payments and improving cash flow for suppliers.</li>
    <li>To utilize Node.js for backend development to streamline and optimize the data processing and communication between the blockchain and frontend.</li>
    <li>Create seamless integration capabilities with existing supply chain systems to ensure a smooth transition and minimal disruption for businesses already using conventional supply chain management methods.</li>
  </ol>
</div>

## Architecture Diagram

<div align="center">
  <img src="/client/public/Architecture Diagram.jpeg">
</div>
<br>

<p align="justify">
  The proposed Blockchain-based Supply Chain System, consists of several steps, including Goods Node Registration, Client Communication, and Good Verification. The registration process involves verifying the authenticity of goods, such as checking against or verifying the identity of the supplier. Stakeholders, such as suppliers, manufacturers, distributors, and retailers, also register on the platform, providing unique identifiers for tracking their activities.
</p>

<p align="justify">
  Client Communication utilizes Web3.js to facilitate seamless interaction with local or remote Ethereum nodes using HTTP, IPC, or WebSocket. Goods Verification integrates the system's digital signature against the Owner's public key to ensure transaction authenticity. This ensures that only the Owner has the authority to initiate orders, maintaining the integrity and security chain.
</p>

<p align="justify">
  Blockchain Chain Creation uses Ethereum's blockchain technology to create immutable records, recording each transaction or update as a block on the blockchain. A User Interface for Product Status Updates is implemented using React.js, ensuring real-time updates on product status. The Supply Chain Flow represents the flow of goods through the supply chain, with each stakeholder having unique access to update their statuses.
</p>

<p align="justify">
  Transactional Data Storage ensures that all transactional data is securely stored in a database, enhancing transparency among all stakeholders in the supply chain. The database can be implemented using traditional database technologies or a distributed database spread across multiple nodes in the network.
</p>

<p align="justify">
  MetaMask Wallet Integration facilitates transactions within the Ethereum blockchain environment, allowing users to interact with the blockchain, including sending and receiving transactions and interacting with smart contracts. Truffle Environment simplifies the development process of Ethereum-based applications by providing built-in smart contracts with the Solidity programming language, compilation, linking, deployment, and binary management.
</p>

## Working of the Contract

<div align="center">
  <img src="/client/public/contractD.png" />
</div>
<br />

<p align="justify">
  This diagram illustrates a supply chain process that incorporates blockchain technology for registration and tracking of transactions. The supply chain involves several key entities: Raw Material Supplier, Manufacturer, Distributor, Retailer, and the end Customer.
</p>

<p align="justify">
  The left side of the diagram shows the registration process to add participants to the blockchain. Each entity (Raw Material Supplier, Manufacture, Distributor, Retailer) goes through a registration process where their address is verified. If the address invalid, they are not registered. If the address is valid, they are verified and registered on the blockchain.
</p>

<p align="justify">
  The right side of the diagram depicts the traditional supply chain flow, starting from the Raw Material Supplier, then to the Manufacture, followed by the Distributor, and finally to the Retailer, who seels the product to the Customer.
</p>

<p align="justify">
  All transactions that occur throughout the supply chain process are recorded on a shared ledger, which is visible to any node (participant) in the blockchain network. This ledger provides transparency and traceability for every transaction that takes place within the supply chain.
</p>
