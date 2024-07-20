<a id="readme-top"></a>

# Token Giver ![product logo](/dapp/public/bx--donate-heart.png)

<div align="center">
  <p align="center">
    Transform Charity with Blockchain!
    <br/> <br/>
    <a href="https://github.com/othneildrew/Best-README-Template">
    View Demo
    </a>
    .
    <a>Report Bug</a>
     ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues/new">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#features">Features</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<br/>
<br/>

<!-- ABOUT THE PROJECT -->

## About The Project

#

<br/>

![Product screen shot](dapp/public/project-screenshot.png)

<br/>

This is a decentralized application allows users to mint a campaign NFT and deploy a Token Bound Account (TBA) for that NFT. Users can then donate tokens (STRK) to the TBA of the campaign NFT through our platform. This project leverages Next.js, Starknet React, Starknet TBA SDK, and smart contracts written in Cairo.

<br/>
<br/>

## Features

#

- **Start Campaign**: Users can mint unique campaign NFTs, then automatically deploy a TBA for campaign NFT .
- **Token Donations**: Facilitate donations in STRK tokens directly to the TBA associated with each campaign NFT.

<br/>
<br/>

## Built With

#

- **Frontend**: Next.js, Starknet React
- **Smart Contracts**: Cairo
- **Backend**: Starknet TBA SDK

<br/>
<br/>
 
## Getting Started
#

Follow these steps to set up and run the project locally.

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Get API key at https://www.arkproject.dev/ and https://www.pinata.cloud/.

```sh
git clone https://github.com/stephanniegb/token-giver.git
cd dapp
```

3. Install Dependencies

```sh
npm install
```

4. Enter your API

   Create a `.env file in` the root directory and add the necessary environment variables. Refer to the `.env.example` file for the required variables.

5. Run the Development Server

```sh
npm run dev
```

The app will be available at http://localhost:3000.

<br/>
<br/>

<!-- USAGE-->

## Usage

#

1. **Start a Campaign**: Navigate to the "Start a campaign" button and follow the instructions to mint your campaign NFT.
2. **Deploying a TBA**: Once the NFT is minted, the app will automatically deploy a Token Bound Account (TBA) for it.
3. **Donating Tokens**: Users can donate STRK tokens to the TBA associated with each campaign NFT through the platform by clicking of the campaign card.

<br/>
<br/>

## Smart Contracts

#

The smart contracts are written in Cairo and deployed on the Starknet network. You can find the contract files in the contracts directory.

<br/>
<br/>

## Authors

#

- Stephanie Egbuonu ✨
- Oshioke Salaki 🦎

<br/>
<br/>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

#

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

- [Pinata docs](https://docs.pinata.cloud/introduction)
- [Ark projects docs](https://docs.arkproject.dev/)
- [Starknet Tokenbound](https://tokenbound.gitbook.io/starknet-tokenbound)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
