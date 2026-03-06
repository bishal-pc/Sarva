export const SIMULATION_CONSTANTS = {
  MIN_CONTRIBUTION: 10,
  MAX_CONTRIBUTION: 500,
  TOTAL_DISTRICTS_INDIA: 785, // Approximate number of districts in India
  CHILD_POP_ESTIMATE_PER_DISTRICT: 350000, // Estimated children population per district needing aid
  COSTS: {
    TEACHER_SALARY_AVG: 45000,
    SCHOOL_OPERATIONS_BASE: 300000,
    SANITATION_WORKER: 18000,
    WATER_HUB_SETUP: 150000,
    AIR_RESEARCH_UNIT: 500000,
  },
  OPERATIONAL_TARGETS: {
    CLASS_8: {
      label: "Milestone 1: Primary to Class 8",
      monthlyRequirement: 980000,
      setupCost: 2000000,
      description: "Covers 11 teachers (incl. Computer Literacy & Regional Language), principal, admin, and support staff.",
      setupBreakdown: [
        { item: "Classroom Furniture (8 rooms)", cost: 640000 },
        { item: "Library & Office Setup", cost: 500000 },
        { item: "Books & Basic Materials", cost: 300000 },
        { item: "Admin & Utilities Setup", cost: 560000 },
      ]
    },
    CLASS_10: {
      label: "Milestone 2: Secondary to Class 10",
      monthlyRequirement: 1400000,
      setupCost: 4000000,
      description: "Adds 7 secondary teachers for specialized Math/Science and secondary-level Computer Science.",
      setupBreakdown: [
        { item: "Classroom Furniture (2 rooms)", cost: 160000 },
        { item: "Computer Lab (20 systems)", cost: 1000000 },
        { item: "Advanced Books", cost: 200000 },
        { item: "Lab Prep Area Setup", cost: 640000 },
      ]
    },
    CLASS_12: {
      label: "Milestone 3: Senior Secondary (3 Streams)",
      monthlyRequirement: 2200000,
      setupCost: 6500000,
      description: "Full capacity with Science (incl. Computer Science), Arts, and Commerce (34 total teachers).",
      setupBreakdown: [
        { item: "Classroom Furniture (6 rooms)", cost: 480000 },
        { item: "Science Labs (Phy/Chem/Bio)", cost: 1200000 },
        { item: "Arts & Commerce Resources", cost: 500000 },
        { item: "Stream Specialized Materials", cost: 320000 },
      ]
    }
  },
  DETAILED_BREAKDOWN: {
    TEACHERS: [
      { level: "Primary (1-5)", count: 5, salary: 35000, total: 175000 },
      { level: "Middle (6-8)", count: 6, salary: 40000, total: 240000 },
      { level: "Secondary (9-10)", count: 7, salary: 45000, total: 315000 },
    ],
    STREAMS: [
      { name: "Science", count: 6, salary: 55000, total: 365000, description: "Physics, Chem, Bio, Math, English, Computer Science" },
      { name: "Arts", count: 5, salary: 50000, total: 270000, description: "History, Pol Sci, Geog, Soc/Psych, English" },
      { name: "Commerce", count: 5, salary: 50000, total: 280000, description: "Accounts, B.St, Economics, Math, English" },
    ],
    STAFF: [
      { role: "Principal", count: 1, salary: 70000, total: 70000 },
      { role: "Admin/Office", count: 2, salary: 30000, total: 60000 },
      { role: "Support/Sanitation/Guard", count: 5, salary: 18000, total: 90000 },
    ],
    INFRASTRUCTURE: [
      { item: "Building Rent (10k sq ft)", monthly: 250000 },
      { item: "Electricity & Utilities", monthly: 40000 },
      { item: "Internet & Software", monthly: 10000 },
      { item: "Maintenance & Misc", monthly: 30000 },
    ]
  }
};

export type ResourceAllocation = {
  schools: number;
  teachers: number;
  sanitationWorkers: number;
  waterHubs: number;
  airResearchUnits: number;
  remainingForNextSchool: number;
  citizensNeededPerSchool: number;
};

export function calculateAllocation(totalPool: number, totalParticipants: number): ResourceAllocation {
  const educationPool = totalPool * 0.4;
  const sanitationPool = totalPool * 0.25;
  const waterPool = totalPool * 0.2;
  const airPool = totalPool * 0.15;

  const schoolCost = SIMULATION_CONSTANTS.OPERATIONAL_TARGETS.CLASS_12.monthlyRequirement;
  const schools = Math.floor(educationPool / schoolCost);
  const remainingForNextSchool = schoolCost - (educationPool % schoolCost);
  
  const averageContribution = totalParticipants > 0 ? totalPool / totalParticipants : 250;
  const citizensNeededPerSchool = Math.ceil(schoolCost / averageContribution);

  const teachers = schools * 34;
  const sanitationWorkers = Math.floor(sanitationPool / SIMULATION_CONSTANTS.COSTS.SANITATION_WORKER);
  const waterHubs = Math.floor(waterPool / SIMULATION_CONSTANTS.COSTS.WATER_HUB_SETUP);
  const airResearchUnits = Math.floor(airPool / SIMULATION_CONSTANTS.COSTS.AIR_RESEARCH_UNIT);

  return {
    schools,
    teachers,
    sanitationWorkers,
    waterHubs,
    airResearchUnits,
    remainingForNextSchool,
    citizensNeededPerSchool
  };
}
