interface ImgQuestion {
  img: string;
}

interface TextQuestion {
  text: string;
}
export type Question = (ImgQuestion | TextQuestion) & {
  answer: string;
  points?: string;
};

// You can make as many boards as you want, just add another top level [] list

export const CATEGORIES: string[][] = [
  ["Movie Quotes", "Corporate", "Palindromes", "Politics", "Afzal"],
  [
    "Empires",
    "Words in 'Inbreads'",
    "Before and After",
    "Doctor",
    "Complexity",
  ],
];

export const QUESTIONS: Question[][][] = [
  [
    [
      {
        text: "With great power comes great responsibility",
        answer: "Spider-Man (2002)",
      },
      {
        text: "I'm gonna make him an offer he can't refuse",
        answer: "The Godfather (1972)",
      },
      {
        text: "Hello there",
        answer: "Star Wars: Episode III - Revenge of the Sith (2005)",
      },
      {
        text: "If God is all powerful, He cannot be all good. And if He is all good, then He cannot be all powerful. And neither can you be",
        answer: "Batman v Superman: Dawn of Justice (2016)",
      },
      {
        text: "You're like my own personal brand of heroin",
        answer: "Twilight (2008)",
      },
    ],
    [
      {
        text: "This is currently the highest-valued company in the world",
        answer: "Nvidia",
      },
      {
        text: "Current CEO of Amazon",
        answer: "Andy Jassy",
      },
      {
        text: "These are 4 of 6 major companies that Elon Musk owns major shares in",
        answer: "SpaceX, Tesla, Neuralink, The Boring Company, X, xAI",
      },
      {
        text: "Co-founder of Apple who engineered the first computer boards while his partner, Steve Jobs, marketed them",
        answer: "Steve Wozniak",
      },
      {
        text: "The Mercedes-AMG Petronas Formula One Team is owned by four entities. Name three",
        answer: "INEOS, Toto Wolff, Mercedes-Benz Group, George Kurtz",
      },
    ],
    [
      {
        text: "This is the sensory organ responsible for vision",
        answer: "Eye",
      },
      {
        text: "This is an object detection system used to determine the range, angle, and speed of objects",
        answer: "Radar",
      },
      {
        text: "This is a light and fluffy flatbread",
        answer: "Naan",
      },

      {
        text: "This word describes both an anatomical muscle group in the shoulder and a mechanical component",
        answer: "Rotator",
      },
      {
        text: "This was the crime of murdering someone in a secret manner in medieval English law",
        answer: "Murdrum",
      },
    ],
    [
      {
        text: "This figure is known as the 'father of Pakistan's atomic weapon program'",
        answer: "Abdul Qadeer Khan",
      },
      {
        text: "The current de facto ruler of Saudi Arabia, who shares initials with the FIA's president",
        answer: "Crown Prince Mohammed bin Salman",
      },
      {
        text: "This famous singer has had tense relations with Donald Trump, with her music recently being removed from some White House social media videos",
        answer: "Taylor Swift",
      },
      {
        text: "The assassination of this Austro-Hungarian individual led to World War I",
        answer: "Archduke Franz Ferdinand",
      },
      {
        text: "These two US presidents have served two non-consecutive terms",
        answer: "Grover Cleveland & Donald Trump",
      },
    ],
    [
      {
        text: "He attempts to hide his visits to this facility",
        answer: "Gym",
      },
      { text: "He has had this many long term crushes", answer: "2" },
      {
        text: "This is his full name",
        answer: "Ahmed Muhammad Afzal AbdulSattar",
      },
      { text: "This is his first room number in NUST", answer: "345" },
      {
        text: "This is the name of his Jeddah school (__-____)",
        answer: "Al Waha",
      },
    ],
  ],
  [
    [
      {
        text: "Spread the Macedonian empire across three continents before unexpectedly dying, leading to its fall",
        answer: "Alexander the Great",
      },
      {
        text: "Founded the largest contiguous land empire by unifying Northeast Asia and launching vast military conquests across Eurasia",
        answer: "Genghis Khan",
      },
      {
        text: "Laid the foundations for the Roman Empire, whose first emperor was his adopted great-nephew",
        answer: "Julius Caesar",
      },
      {
        text: "Ruled during the peak height and expansion of the British Empire, symbolizing a dominant era of industrialization",
        answer: "Queen Victoria",
      },
      {
        text: "Ruled during the peak of the Ottoman Empire and had the longest reign of any sultan",
        answer: "Suleiman the Magnificent",
      },
    ],
    [
      {
        text: "A staple food made from a dough of flour and water, usually baked",
        answer: "Bread",
      },
      {
        text: "A high-concentration solution of salt and water",
        answer: "Brine",
      },
      {
        text: "A term used to describe a person exceptionally dedicated to intellectual pursuits, often used derogatorily",
        answer: "Nerd",
      },
      {
        text: "A vertical panel located on the left or right side of an application, typically holding navigation links",
        answer: "Sidebar",
      },
      {
        text: "The king at the end of the hit fantasy show Game of Thrones",
        answer: "Bran",
      },
    ],
    [
      {
        text: "This inbread member is a round or oval object often used for sports",
        answer: "Ushball",
      },
      {
        text: "This typically plastic bag used for carrying purchases is an adjective used to describe being entirely without flaw, fault, or defect",
        answer: "Shopperfect",
      },
      {
        text: "This term referring to a giant global network that connects millions of devices together is a major subscription-based TV show host",
        answer: "Internetflix",
      },
      {
        text: "This electronic device used to talk at a distance relates to sounds of human speech and how they are represented with symbols",
        answer: "Telephonetic",
      },
      {
        text: "This inbread member is a traditional double-reed wind musical instrument from South Asia",
        answer: "Anooshehnai",
      },
    ],
    [
      {
        text: "Powerhouse",
        answer: "Mitochondria",
      },
      {
        text: "This hormone produced by the pancreas lowers blood glucose levels",
        answer: "Insulin",
      },
      {
        text: "This is the term for the movement of water molecules across a semipermeable membrane from an area of low solute concentration to high solute concentration",
        answer: "Osmosis",
      },
      {
        text: "This molecule, often called the 'energy currency' of the cell, stores and transfers energy",
        answer: "ATP",
      },
      {
        text: "This enzyme unravels the double helix by breaking the hydrogen bonds between complementary base pairs during DNA replication",
        answer: "DNA helicase",
      },
    ],
    [
      {
        text: "This device applies a flow of electrons through a conducting filament, resulting in an emission of photons in the visible light spectrum",
        answer: "Light bulb",
      },
      {
        text: "This electro-acoustic device agitates the surrounding atmosphere via the Lorentz force",
        answer: "Speaker",
      },
      {
        text: "This is a multi-strand capillary absorbent matrix on an axial wooden vector",
        answer: "Mop",
      },
      {
        text: "This coherent electromagnetic emission resonator leverages quantum electronic transitions to trigger emission of matching energy photons",
        answer: "Laser pointer",
      },
      {
        text: "This force amplification device operates manually via a hemispherical elastomeric container anchored to a rigid wooden handle; upon compression against a surface, trapped air is expelled, creating alternating pressure differentials",
        answer: "Toilet plunger",
      },
    ],
  ],
];
