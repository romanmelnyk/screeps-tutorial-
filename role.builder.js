var roleBuilder = {


    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('building');
	    }
		
		//creep builds
	    if(creep.memory.building) {
			//creep builds 
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
			//creep repairs Walls
			else {
				var repairWalls = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => structure.hits < structure.hitsMax // && structure.structureType == STRUCTURE_WALL
				});
				if(repairWalls.length > 0) {
					if(creep.repair(repairWalls[0]) == ERR_NOT_IN_RANGE) {
						creep.moveTo(repairWalls[0]);
					}
				}
			}	
	    }
		//creep harvests
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
	    }
	}
};

module.exports = roleBuilder;