# Blockchain Based Supply Chain Management

<b><p align="justify">Abstract: In today’s globalized marketplace, efficient and transparent supply chain management is paramount. This project harnesses cutting-edge technology stacks to develop a robust and forward-thinking solution. At its core, it leverages the Ethereum blockchain platform, utilizing Solidity smart contracts to ensure the tamper-proof tracking of goods from their origin to their ultimate destination. This blockchain-based foundation establishes an unassailable record of all supply chain transaction, enhancing transparency, traceability, and trust. The project incorporates Ganache, a personal blockchain for Ethereum development, enabling seamless testing and deployment of smart contracts within a local, simulated environment. The frontend, designed with React JS, offers an intuitive and user-friendly interface for supply chain stakeholders. It enables real-time tracking, ensuring that users can access and validate crucial product and transaction data at any point in the supply chain process. Additionally, a comprehensive tracker has been integrated, allowing stakeholders to monitor the journey of any product along the supply chain flow, providing visibility into the parties involved at each stage. User authentication is provided by Ethereum stakeholder addresses, leveraging the inherent security and decentralized nature of the Ethereum blockchain. Web3.js enables smooth communication between the blockchain network and the backend, facilitating the seamless exchange of data and information. On the backend, powered by Node.js, seamless data processing and management is facilitated. This rich technology stack creates a dependable, decentralized, and transparent supply chain management that enhances accountability and trust throughout the entire supply network. By fostering transparency and traceability, this project empowers business to operate more efficiently and confidently in today’s complex and interconnected global market.</div></b>

## Table of Contents

- Introduction
  - What is a Blockchain?
  - What is a Supply Chain?
  - Problem Statement
  - Objectives
- Architecture Diagram
- Working of Smart Contract
- Class Diagram
- Workflow of Smart Contract
- Technology Stack Used

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

## Working of the Smart Contract

<div align="center">
  <img src="/client/public/contractD.png" />
</div>
<br />

<p align="justify">
  This diagram illustrates a supply chain process that incorporates blockchain technology for registration and tracking of transactions. The supply chain involves several key entities: Raw Material Supplier, Manufacturer, Distributor, Retailer, and the end Customer. The left side of the diagram shows the registration process to add participants to the blockchain. Each entity (Raw Material Supplier, Manufacture, Distributor, Retailer) goes through a registration process where their address is verified. If the address invalid, they are not registered. If the address is valid, they are verified and registered on the blockchain.
</p>

<p align="justify">
  The right side of the diagram depicts the traditional supply chain flow, starting from the Raw Material Supplier, then to the Manufacture, followed by the Distributor, and finally to the Retailer, who seels the product to the Customer. All transactions that occur throughout the supply chain process are recorded on a shared ledger, which is visible to any node (participant) in the blockchain network. This ledger provides transparency and traceability for every transaction that takes place within the supply chain.
</p>

## Class Diagram

<div align="center">
  <img src="/client/public/Project.jpg" />
</div>
<br />

<p align="justify">This class diagram represents the Blockchain Based Supply Chain Management System for goods.</p>

<div align="justify">
  <ol type="1" align="justify">
    <li>Central Classes:
      <ul>
        <li>SupplyChain: The core class connecting various entities.</li>
        <li>Goods: Represents the product with properties like id, name, description, and IDs for different stages.</li>
      </ul>
    </li>
    <li>Participants:
      <ul>
        <li>addManufacturer: Represents manufacturers.</li>
        <li>addRMS: Represents Raw Material Suppliers.</li>
        <li>addDistributor: Represents distributors.</li>
        <li>addRetailer: Represents retailers.</li>
      </ul>
    </li>
    <li>Processes:
      <ul>
        <li>Manufacturing: Linked to manufacturers.</li>
        <li>RMSsupply: Linked to Raw Material Suppliers.</li>
        <li>Distribute: Linked to distributors.</li>
        <li>Retail: Linked to retailers.</li>
      </ul>
    </li>
    <li>Stages: An enumeration (Enum Stage) shows the product lifecycle:
      <ul>
        <li>Init</li>
        <li>Manufacture</li>
        <li>Distribution</li>
        <li>Retail</li>
        <li>Sold</li>
      </ul>
    </li>
    <li>Functions:
      <ul>
        <li>addGoods: For adding new products.</li>
        <li>findDIS, findRMS, findMan, findRET: For finding distributors, raw material suppliers, manufacturers, and retailers respectively.</li>
        <li>onlyByOwner: Access control function.</li>
        <li>showStage: Shows the current stage of a product.</li>
      </ul>
    </li>
    <li>Relationships:
      <ul>
        <li>The SupplyChain class is central, connecting to manufacturers, RMS, distributors, and retailers.</li>
        <li>Each participant type(Manufacturer, RMS, distributor, retailer) has a 1 to many relationship with SupplyChain.</li>
        <li>The goods class is connected to SupplyChain and the Stage enumeration.</li>
      </ul>
    </li>
    <li>Common Attributes: Many classes share attributes like _address, memory_name, and memory_place.</li>
  </ol>
</div>

## Workflow of Smart Contract

<div align="center">
  <img src="/client/public/Supply Chain Workflow.png" />
</div>
<br />

<p align="justify">
  This workflow diagram illustrates the process of creating and managing a supply chain using blockchain and smart contracts. Here's a breakdown of the workflow:
</p>

<div align="justify">
  <ol type="1" align="justify">
    <li>Starting point: The process begins with the Owner.</li>
    <li>Smart Contract Creation:
      <ol>
        <li>The Owner creates a smart contract.</li>
        <li>This contract is then deployed to the Blockchain.</li>
      </ol>
    </li>
    <li>Supply Chain Members:
      <ol>
        <li>The diagram lists Raw Material Suppliers, Manufacturers, Distributors, and Retailers as potential Supply Chain Members.</li>
        <li>These members go through a registration process.</li>
      </ol>
    </li>
    <li>Verification Process:
      <ol>
        <li>After registration, there's a verification step labeled "Owner Verify Supply Chain Memeber."</li>
        <li>This is a decision point:
          <ol>
            <li>If verified (Yes), the member is added to the chain.</li>
            <li>If not verified (No), the member is rejected.</li>
          </ol>
        </li>
      </ol>
    </li>
    <li>Blockchain Integration:
      <ol>
        <li>Verified members are added to the blockchain.</li>
      </ol>
    </li>
    <li>Stages: The diagram outlines the stages of the supply chain:
      <ol>
        <li>Initial</li>
        <li>Raw Material</li>
        <li>Manufacture</li>
        <li>Distributor</li>
        <li>Retailer</li>
        <li>Sold</li>
      </ol>
    </li>
  </ol>
</div>

<p align="justify">
  This workflow demonstrates a controlled, secure process for managing a supply chain using blockchain technology. It ensures that only verified members can participate, and it tracks the product through various stages from raw materials to final sale.
</p>

## Technology Stack Used

- *Blockchain Platform:* Ethereum Chain
- *Smart Contract Development:* Solidity
- *Frontend Development:* ReactJS
- *Backend Development:* Node.js
- *Wallet:* MetaMask
- *Chain Development Platform:* Truffle
