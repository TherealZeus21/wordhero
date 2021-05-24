interface IBackgroundType {
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
}
const backgrounds: IBackgroundType[] = [
  {
    backgroundImage:
      "linear-gradient(rgba(255, 150, 110, 0.25), transparent), linear-gradient(-45deg, rgba(255, 250, 0, 0.25), transparent), linear-gradient(45deg, rgba(255, 0, 0, 0.25), transparent)",
    backgroundColor: undefined,
    backgroundSize: undefined,
    backgroundPosition: undefined,
  },
  {
    backgroundImage:
      "linear-gradient(rgba(180, 220, 255, 0.9), transparent), linear-gradient(-15deg, rgba(15, 122, 255, 0.3), transparent), linear-gradient(-45deg, rgba(15, 122, 255, 0.9), transparent)",
    backgroundColor: undefined,
    backgroundSize: undefined,
    backgroundPosition: undefined,
  },
  {
    backgroundImage:
      "linear-gradient(to bottom, rgba(246, 245, 248, 0.1), rgba(14, 0, 78, 0.3))",
    backgroundColor: undefined,
    backgroundSize: undefined,
    backgroundPosition: undefined,
  },
  {
    backgroundImage: `repeating-linear-gradient(120deg, rgba(255,255,255,.1), rgba(255,255,255,.1) 1px, transparent 1px, transparent 60px),
    repeating-linear-gradient(60deg, rgba(255,255,255,.1), rgba(255,255,255,.1) 1px, transparent 1px, transparent 60px)`,
    backgroundColor: "black",
    backgroundSize: "70px 120px",
    backgroundPosition: undefined,
  },
  {
    backgroundImage: `radial-gradient( rgba(255,255,255,.2) 2px, transparent 40px),
    radial-gradient(rgba(255,255,255,0.3), rgba(255,255,255,.15) 1px, transparent 30px),
    radial-gradient(rgba(255,255,255,0.3), rgba(255,255,255,.1) 2px, transparent 40px),
    radial-gradient(rgba(255,255,255,.2), rgba(255,255,255,.1) 2px, transparent 30px)`,
    backgroundColor: "black",
    backgroundSize: "550px 550px, 350px 350px, 250px 250px, 150px 150px",
    backgroundPosition: "0 0, 40px 60px, 130px 270px, 70px 100px",
  },
  {
    backgroundImage: `linear-gradient(90deg, #02c4f6, #91fe9e)`,
    backgroundColor: undefined,
    backgroundSize: undefined,
    backgroundPosition: undefined,
  },
  {
    backgroundImage: `linear-gradient(90deg, #E5C83F, #18d5d1)`,
    backgroundColor: undefined,
    backgroundSize: undefined,
    backgroundPosition: undefined,
  },
];

export { backgrounds };
