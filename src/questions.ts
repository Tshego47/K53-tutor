export interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  answer: string;
}

export const k53Questions: Question[] = [
  {
    id: 1,
    category: "vehicle_controls",
    question: "Which control is used to completely disengage the engine from the gearbox to allow for a smooth gear change?",
    options: ["Foot brake pedal", "Clutch pedal", "Parking brake lever", "Accelerator pedal"],
    answer: "Clutch pedal"
  },
  {
    id: 2,
    category: "vehicle_controls",
    question: "To ensure that a safely parked motor vehicle remains completely stationary, which primary control must you engage?",
    options: ["Gear lever in neutral", "Foot brake pedal", "Parking brake (Handbrake)", "Clutch pedal"],
    answer: "Parking brake (Handbrake)"
  },
  {
    id: 3,
    category: "vehicle_controls",
    question: "Before you change your driving direction, turn at an intersection, or change lanes, which control should you use first to inform other road users?",
    options: ["Steering wheel", "Hooter", "Indicator switch", "Rear-view mirror"],
    answer: "Indicator switch"
  },
  {
    id: 4,
    category: "vehicle_controls",
    question: "Which combination of controls must be used together in order to smoothly change the speed gears of your vehicle?",
    options: ["Accelerator and Foot brake", "Clutch pedal and Gear lever", "Steering wheel and Indicator", "Parking brake and Clutch pedal"],
    answer: "Clutch pedal and Gear lever"
  },
  {
    id: 5,
    category: "vehicle_controls",
    question: "What is the primary function of the vehicle's hooter?",
    options: ["To greet other drivers on the public road", "To signal your intention to overtake another vehicle", "To give a warning signal to prevent dangerous situations", "To show annoyance at reckless drivers"],
    answer: "To give a warning signal to prevent dangerous situations"
  }
];
