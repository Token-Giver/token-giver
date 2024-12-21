import AnimalIcon from "@/svgs/AnimalIcon";
import CreativeIcon from "@/svgs/CreativeIcon";
import EmergencyIcon from "@/svgs/EmergencyIcon";
import EventsIcon from "@/svgs/EventsIcon";
import FamilyIcon from "@/svgs/FamilyIcon";
import FeedingIcon from "@/svgs/FeedingIcon";
import MedicalIcon from "@/svgs/MedicalIcon";
import SportsIcon from "@/svgs/SportsIcon";
import TravelIcon from "@/svgs/TravelIcon";
import VolunteerIcon from "@/svgs/VolunteerIcon";

export const categoryList = [
  {
    icon: MedicalIcon,
    title: "Medical",
  },
  {
    icon: EmergencyIcon,
    title: "Emergency",
  },
  {
    icon: FamilyIcon,
    title: "Family",
  },
  {
    icon: EventsIcon,
    title: "Events",
  },
  {
    icon: SportsIcon,
    title: "Sports",
  },
  {
    icon: CreativeIcon,
    title: "Creative",
  },
  {
    icon: VolunteerIcon,
    title: "Volunteer",
  },
  {
    icon: TravelIcon,
    title: "Travel",
  },
  {
    icon: AnimalIcon,
    title: "Animal",
  },
  {
    icon: FeedingIcon,
    title: "Feeding",
  },
];

export const statusList = [
  "All",
  "Just Launched",
  "Urgent",
  "Charities",
  "Close to target",
  "Needs push",
];

export const categories = [
  {
    id: 1,
    name: "Medical",
    card: [
      {
        category: "Charities",
        image: "/classroom.jpeg",
        title: "Help build a school in Barnawa",
        progress: 50,
        raised: "25,000",
        target: "50,000",
        donorImages: [
          "/gabby.jpg",
          "/tima.jpg",
          "/charlotte.jpg",
          "/kosuki.jpg",
        ],
        donorCount: 200,
      },
      {
        category: "Urgent",
        image: "/flood.jpeg",
        title: "Lagos flood victims",
        progress: 2,
        raised: "25,000",
        target: "100,000",
        donorImages: [
          "/gabby.jpg",
          "/tima.jpg",
          "/charlotte.jpg",
          "/kosuki.jpg",
        ],
        donorCount: 50,
      },
      {
        category: "Close to target",
        image: "/close.jpeg",
        title: "Reform children playground ",
        progress: 95,
        raised: "75,000",
        target: "80,000",
        donorImages: [
          "/gabby.jpg",
          "/tima.jpg",
          "/charlotte.jpg",
          "/kosuki.jpg",
        ],
        donorCount: 50,
      },
    ],
  },
  {
    id: 2,
    name: "Emergency",
    card: [
      {
        category: "Just launched",
        image: "/spray.jpeg",
        title: "Support upcoming children event",
        progress: 0,
        raised: "0",
        target: "80,000",
        donorImages: [
          "/gabby.jpg",
          "/tima.jpg",
          "/charlotte.jpg",
          "/kosuki.jpg",
        ],
        donorCount: 0,
      },
      {
        category: "Needs Push",
        image: "/hospital.jpeg",
        title: "Equipment for hospitals",
        progress: 5,
        raised: "5,000",
        target: "80,000",
        donorImages: [
          "/gabby.jpg",
          "/tima.jpg",
          "/charlotte.jpg",
          "/kosuki.jpg",
        ],
        donorCount: 50,
      },
      {
        category: "Close to target",
        image: "/books.jpeg",
        title: "Help send books to schools",
        progress: 95,
        raised: "75,000",
        target: "80,000",
        donorImages: [
          "/gabby.jpg",
          "/tima.jpg",
          "/charlotte.jpg",
          "/kosuki.jpg",
        ],
        donorCount: 50,
      },
    ],
  },
  {
    id: 3,
    name: "Family",
    card: [
      {
        category: "Charities",
        image: "/classroom.jpeg",
        title: "Help build a school in Barnawa",
        progress: 50,
        raised: "25,000",
        target: "50,000",
        donorImages: [
          "/gabby.jpg",
          "/tima.jpg",
          "/charlotte.jpg",
          "/kosuki.jpg",
        ],
        donorCount: 200,
      },
      {
        category: "Urgent",
        image: "/flood.jpeg",
        title: "Lagos flood victims",
        progress: 2,
        raised: "25,000",
        target: "100,000",
        donorImages: [
          "/gabby.jpg",
          "/tima.jpg",
          "/charlotte.jpg",
          "/kosuki.jpg",
        ],
        donorCount: 50,
      },
      {
        category: "Close to target",
        image: "/close.jpeg",
        title: "Reform children playground ",
        progress: 95,
        raised: "75,000",
        target: "80,000",
        donorImages: [
          "/gabby.jpg",
          "/tima.jpg",
          "/charlotte.jpg",
          "/kosuki.jpg",
        ],
        donorCount: 50,
      },
    ],
  },
  {
    id: 4,
    name: "Events",
    card: [
      {
        category: "Just launched",
        image: "/spray.jpeg",
        title: "Support upcoming children event",
        progress: 0,
        raised: "0",
        target: "80,000",
        donorImages: [
          "/gabby.jpg",
          "/tima.jpg",
          "/charlotte.jpg",
          "/kosuki.jpg",
        ],
        donorCount: 0,
      },
      {
        category: "Needs Push",
        image: "/hospital.jpeg",
        title: "Equipment for hospitals",
        progress: 5,
        raised: "5,000",
        target: "80,000",
        donorImages: [
          "/gabby.jpg",
          "/tima.jpg",
          "/charlotte.jpg",
          "/kosuki.jpg",
        ],
        donorCount: 50,
      },
      {
        category: "Close to target",
        image: "/books.jpeg",
        title: "Help send books to schools",
        progress: 95,
        raised: "75,000",
        target: "80,000",
        donorImages: [
          "/gabby.jpg",
          "/tima.jpg",
          "/charlotte.jpg",
          "/kosuki.jpg",
        ],
        donorCount: 50,
      },
    ],
  },
];
