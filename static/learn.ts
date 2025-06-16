import { Step } from "@/app/learn/components/StepBlock";

export const howToSteps = [
  {
    title: "Choose Your Cause",
    description:
      "Explore  campaigns and choose the ones closest to your heart.",
    index: 1,
    position: "bottom-[64px] left-[400px]",
    isReverse: true
  },
  {
    title: "Donate Transparently",
    description:
      "Make donations seamlessly using NFTs and TBAs, ensuring your contributions are safely tracked on the blockchain.",
    index: 2,
    position: "bottom-[280px] left-[500px]",
    isReverse: false
  },
  {
    title: "Track the Impact",
    description:
      "Witness how your donations are making a difference with real-time updates and transparent records.",
    index: 3,
    position: "top-[218px] right-[243px]",
    isReverse: true
  }
];

export const partners = [
  {
    name: "Starknet",
    id: "starknet",
    logo: "/starknet-facecard.svg",
    position: "top-[80px] left-[50%]"
  },
  {
    name: "Braavos",
    id: "braavos",
    logo: "/braavos-facecard.svg",
    position: "top-[20%] right-[30%]"
  },
  {
    name: "Bitcoin",
    id: "bitcoin",
    logo: "/bitcoin-facecard.svg",
    position: "top-[45%] right-[15%]"
  },
  {
    name: "Horus Labs",
    id: "horus-labs",
    logo: "/horuslabs-facecard.svg",
    position: "bottom-[20%] right-[30%]"
  },
  {
    name: "Solana",
    id: "solana",
    logo: "/solana-facecard.svg",
    position: "bottom-[10%] left-[50%]"
  },
  {
    name: "Ethereum",
    id: "ethereum",
    logo: "/eth-facecard.svg",
    position: "bottom-[20%] left-[30%]"
  },
  {
    name: "Onlydust",
    id: "onlydust",
    logo: "/onlydust-facecard.svg",
    position: "top-[45%] left-[15%]"
  },
  {
    name: "Argent",
    id: "argent",
    logo: "/argent-facecard.svg",
    position: "top-[20%] left-[30%]"
  }
];

export const faqs = [
  {
    question: "What is Token Giver?",
    answer:
      "Token Giver is a decentralized application designed to revolutionize charity and fundraising. With Token Giver, users can create and manage campaigns by minting unique campaign NFTs, which have Token Bound Accounts (TBA) deployed on them automatically.",
    index: 1
  },
  {
    question: "How do NFTs work in fundraising?",
    answer:
      "NFTs are used to represent campaigns and donations. Each NFT has a TBA deployed on it, which is used to track the campaign and donations.",
    index: 2
  },
  {
    question: "What are Token Bound Accounts (TBAs)?",
    answer:
      "TBAs are used smart accounts that are deployed on NFTs. Each campaign on Token Giver has a TBA deployed on it, which is used to track the campaign and donations.",
    index: 3
  },
  {
    question: "Is my donation safe?",
    answer:
      "Yes, your donation is safe. Each donation is tracked on the blockchain, and you can see the impact of your donation in real-time.",
    index: 4
  },
  {
    question: "Can I support multiple causes?",
    answer:
      "Yes, you can support multiple causes. You can donate to multiple campaigns at the same time.",
    index: 5
  }
];

export const campaignThemes = [
  {
    name: "arts-crafts",
    label: "Arts & Crafts"
  },
  {
    name: "comics",
    label: "Comics"
  },
  {
    name: "community",
    label: "Community"
  },
  {
    name: "design",
    label: "Design"
  },
  {
    name: "fashion",
    label: "Fashion"
  },
  {
    name: "food",
    label: "Food"
  },
  {
    name: "film",
    label: "Film"
  }
];

export const donorSteps: Step[] = [
  {
    id: 0,
    title: "Search & Explore Campaigns",
    subtext: "Browse verified campaigns across various categories.",
    illus: "/steps/donors/step-1.png",
    points: [
      "Use filters such as cause type, location, and urgency to find a campaign that resonates with you.",
      "Review detailed campaign descriptions and updates for transparency."
    ]
  },
  {
    id: 1,
    title: "Make a Secure Donation",
    subtext: "Contribute to a campaign securely through Token Giver.",
    illus: "/steps/donors/step-2.png",
    points: [
      "Select the amount you wish to donate.",
      "Complete the transaction using crypto  payment options.",
      "Receive a unique NFT as a digital receipt of your donation."
    ]
  },
  {
    id: 2,
    title: "Track & Share Your Impact",
    subtext: "Stay connected with your chosen campaign.",
    illus: "/steps/donors/step-3.png",
    points: [
      "View updates from the fundraiser through the Token Giver app.",
      "Monitor how your donation is making a difference."
    ]
  }
];
export const fundraiserSteps: Step[] = [
  {
    id: 0,
    title: "Set Up Your Campaign",
    subtext: "Design your fundraising campaign with ease.",
    illus: "/steps/fundraiser/step-1.png",
    points: [
      "Add campaign details such as title, description, target goal, and timeline.",
      "Upload multimedia assets like images and videos to make your campaign more engaging.",
      "Mint your campaign!"
    ]
  },
  {
    id: 1,
    title: "Promote Your Campaign",
    subtext: "Share your campaign to reach more donors.",
    illus: "/steps/fundraiser/step-2.png",
    points: [
      "Use the Token Giver sharing tools to post your campaign on social media, email, and other platforms.",
      "Engage with the Token Giver community by featuring your campaign on our trending section."
    ]
  },
  {
    id: 2,
    title: "Receive Donations in Real-Time",
    subtext: "Start receiving secure and traceable donations.",
    illus: "/steps/fundraiser/step-3.png",
    points: [
      "Each donor receives an NFT confirming their contribution.",
      "Funds are stored in your TBA and can be accessed or withdrawn securely."
    ]
  }
];
