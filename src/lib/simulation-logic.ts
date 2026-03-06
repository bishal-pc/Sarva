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
};

export type ResourceAllocation = {
  schools: number;
  teachers: number;
  sanitationWorkers: number;
  waterHubs: number;
  airResearchUnits: number;
};

export function calculateAllocation(totalPool: number): ResourceAllocation {
  // Simple heuristic allocation:
  // 40% Education (Schools & Teachers)
  // 25% Sanitation
  // 20% Water Infrastructure
  // 15% Air Quality Research

  const educationPool = totalPool * 0.4;
  const sanitationPool = totalPool * 0.25;
  const waterPool = totalPool * 0.2;
  const airPool = totalPool * 0.15;

  // Each school needs ~3 teachers for operations
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
