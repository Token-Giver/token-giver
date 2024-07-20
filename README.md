<a id="readme-top"></a>

# Token Giver ![product logo](./dapp/public/bx--donate-heart.png)

<div align="center">
  <h2 align="center">
    Transform Charity with Blockchain!
  </h2>
    <br/>
    <a href="https://github.com/othneildrew/Best-README-Template">
    View Live
    </a>
    .
    <a href="https://github.com/othneildrew/Best-README-Template/issues/new">Report Bug</a>
     ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues/new">Request Feature</a>
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
    <li><a href="#contracts">Contracts</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<br/>
<br/>

<!-- ABOUT THE PROJECT -->

## About The Project

<br/>

![Product screen shot](dapp/public/project-screenshot.png)

<br/>

Token Giver is a decentralized application designed to revolutionize the way we approach charity and fundraising. With Token Giver, users can create and manage campaigns by minting unique campaign NFTs. Each campaign NFT automatically gets a Token Bound Account (TBA) deployed for it, enabling seamless and secure donations using STRK tokens. This project leverages the power of Next.js, Starknet React, Starknet TBA SDK, and smart contracts written in Cairo to provide a robust and user-friendly platform..

<br/>
<br/>

## Features

- **Campaign Creation**: Easily create a campaign by minting a unique NFT, which automatically deploys a Token Bound Account (TBA).
- **Integrated Dashboard**: View all your active campaigns on a centralized dashboard.
- **Token Donations**: Share the campaign link to facilitate STRK token donations directly to the campaign's TBA.
- **Seamless Operation**: The entire process—from campaign creation to token donations—takes place within the platform, ensuring a smooth user experience.

## Built With

- **Frontend**: Next.js, Starknet React
- **Smart Contracts**: Cairo

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or later)
- npm or yarn

### Installation

1. **Get API Keys**: Register and get your API keys from [Ark Project](https://www.arkproject.dev/) and [Pinata](https://www.pinata.cloud/).

2. **Clone the Repository**:

```sh
git clone https://github.com/stephanniegb/token-giver.git
cd dapp
```

3. **Install Dependencies**:

```sh
npm install
```

4. **Set Up Environment Variables**:

   Create a `.env file in` the root directory and add the necessary environment variables. Refer to the `.env.example` file for the required variables.

5. **Run the Development Server**:

```sh
npm run dev
```

The app will be available at http://localhost:3000.

<!-- USAGE-->

## Usage

1. **Start a Campaign**: Click the "Start Campaign" button on the platform.
2. **Fill Out the Form**: Complete the form with details about your campaign.
3. **Mint Campaign**: Click on the "Mint Campaign" button. This action will:
   - Mint a unique campaign NFT.
   - Automatically deploy a Token Bound Account (TBA) for the newly minted NFT.
   - Provide you with an NFT linked to the TBA.
4. **View Your Campaign**: The newly minted NFT will be displayed on the token giver platform.
5. **Share and Collect Donations**:
   - Share the link with others to invite them to donate STRK tokens to your campaign's TBA.
   - Donations are processed directly on the platform.

## Contracts

The smart contracts are written in Cairo and deployed on the Starknet network. You can find the contract files in the `contracts` directory.

## Authors

- Stephanie Egbuonu ✨
- Oshioke Salaki 🦎

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

- [Pinata Documentation](https://docs.pinata.cloud/introduction)
- [Ark projects Documentation](https://docs.arkproject.dev/)
- [Starknet Tokenbound Documentation](https://tokenbound.gitbook.io/starknet-tokenbound)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
