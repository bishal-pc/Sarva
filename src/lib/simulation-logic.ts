export const SIMULATION_CONSTANTS = {
  MIN_CONTRIBUTION: 10,
  MAX_CONTRIBUTION: 500,
  COSTS: {
    TEACHER_SALARY: 60000,
    SCHOOL_OPERATIONS: 200000,
    SANITATION_WORKER: 18000,
    WATER_HUB_SETUP: 150000,
    AIR_RESEARCH_UNIT: 500000,
  },
  OPERATIONAL_TARGETS: {
    CLASS_8: {
      label: "Milestone 1: Primary to Class 8",
      monthlyRequirement: 800000,
      description: "Covers 10 teachers, basic operations, and infrastructure for 8 grades.",
    },
    CLASS_10: {
      label: "Milestone 2: Secondary to Class 10",
      monthlyRequirement: 1040000,
      description: "Adds 4 specialized teachers and advanced lab facilities for secondary grades.",
    },
    CLASS_12: {
      label: "Milestone 3: Senior Secondary to Class 12",
      monthlyRequirement: 1280000,
      description: "Adds 4 senior lecturers and specialized streams for classes 11 and 12.",
    }
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

  const schoolCostWithTeachers = SIMULATION_CONSTANTS.COSTS.SCHOOL_OPERATIONS + (3 * SIMULATION_CONSTANTS.COSTS.TEACHER_SALARY);
  const schools = Math.floor(educationPool / schoolCostWithTeachers);
  const teachers = schools * 3;

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
