export const SIMULATION_CONSTANTS = {
  MIN_CONTRIBUTION: 10,
  MAX_CONTRIBUTION: 500,
  COSTS: {
    TEACHER_SALARY_AVG: 45000,
    SCHOOL_OPERATIONS_BASE: 300000, // Rent + Utilities + Maintenance
    SANITATION_WORKER: 18000,
    WATER_HUB_SETUP: 150000,
    AIR_RESEARCH_UNIT: 500000,
  },
  OPERATIONAL_TARGETS: {
    CLASS_8: {
      label: "Milestone 1: Primary to Class 8",
      monthlyRequirement: 900000,
      description: "Covers 11 teachers (Primary & Middle), principal, admin, support staff, and rent.",
    },
    CLASS_10: {
      label: "Milestone 2: Secondary to Class 10",
      monthlyRequirement: 1200000,
      description: "Adds 7 secondary teachers and specialized lab facilities.",
    },
    CLASS_12: {
      label: "Milestone 3: Senior Secondary to Class 12",
      monthlyRequirement: 1500000,
      description: "Adds 5 senior secondary teachers for Science/Specialized streams.",
    }
  },
  DETAILED_BREAKDOWN: {
    TEACHERS: [
      { level: "Primary (1-5)", count: 5, salary: 35000, total: 175000 },
      { level: "Middle (6-8)", count: 6, salary: 40000, total: 240000 },
      { level: "Secondary (9-10)", count: 7, salary: 45000, total: 315000 },
      { level: "Sr. Secondary (11-12)", count: 5, salary: 55000, total: 275000 },
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
    ],
    ONE_TIME_SETUP: [
      { item: "Classroom Furniture (12 rooms)", cost: 960000 },
      { item: "Computer Lab (20 systems)", cost: 1000000 },
      { item: "Science Labs (Phy/Che/Bio)", cost: 1500000 },
      { item: "Library & Office Setup", cost: 500000 },
      { item: "Books & Learning Materials", cost: 500000 },
    ]
  }
};

export type ResourceAllocation = {
  schools: number;
  teachers: number;
  sanitationWorkers: number;
  waterHubs: number;
  airResearchUnits: number;
};

export function calculateAllocation(totalPool: number): ResourceAllocation {
  const educationPool = totalPool * 0.4;
  const sanitationPool = totalPool * 0.25;
  const waterPool = totalPool * 0.2;
  const airPool = totalPool * 0.15;

  // For the dashboard, we use a simplified model to show "Capacity"
  const schoolCostWithTeachers = SIMULATION_CONSTANTS.OPERATIONAL_TARGETS.CLASS_12.monthlyRequirement;
  const schools = Math.floor(educationPool / schoolCostWithTeachers);
  const teachers = schools * 23; // Full strength

  const sanitationWorkers = Math.floor(sanitationPool / SIMULATION_CONSTANTS.COSTS.SANITATION_WORKER);
  const waterHubs = Math.floor(waterPool / SIMULATION_CONSTANTS.COSTS.WATER_HUB_SETUP);
  const airResearchUnits = Math.floor(airPool / SIMULATION_CONSTANTS.COSTS.AIR_RESEARCH_UNIT);

  return {
    schools,
    teachers,
    sanitationWorkers,
    waterHubs,
    airResearchUnits,
  };
}
