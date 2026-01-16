export type EventItem = {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
};

export const events: EventItem[] = [
  {
    title: "Google I/O 2026",
    image: "/images/event1.png",
    slug: "google-io-2026",
    location: "Shoreline Amphitheatre, Mountain View, CA",
    date: "May 2026",
    time: "9:00 AM – 5:00 PM PT",
  },
  {
    title: "Apple WWDC 2026",
    image: "/images/event2.png",
    slug: "wwdc-2026",
    location: "Apple Park & Online, Cupertino, CA",
    date: "June 2026",
    time: "10:00 AM – 4:00 PM PT",
  },
  {
    title: "Microsoft Build 2026",
    image: "/images/event3.png",
    slug: "microsoft-build-2026",
    location: "Seattle, WA & Online",
    date: "May 2026",
    time: "9:00 AM – 5:00 PM PT",
  },
  {
    title: "AWS re:Invent 2026",
    image: "/images/event4.png",
    slug: "aws-reinvent-2026",
    location: "Las Vegas, NV",
    date: "Nov–Dec 2026",
    time: "All day",
  },
  {
    title: "React Summit 2026",
    image: "/images/event5.png",
    slug: "react-summit-2026",
    location: "Amsterdam, Netherlands & Online",
    date: "June 2026",
    time: "9:00 AM – 6:00 PM CEST",
  },
  {
    title: "HackMIT 2026",
    image: "/images/event6.png",
    slug: "hackmit-2026",
    location: "MIT, Cambridge, MA",
    date: "September 2026",
    time: "48-hour hackathon",
  },
  {
    title: "KubeCon + CloudNativeCon North America 2026",
    image: "/images/event-full.png",
    slug: "kubecon-cloudnativecon-north-america-2026",
    location: "San Diego, CA",
    date: "September 2026",
    time: "9:00 AM – 5:00 PM PT",
  },
];
