var roleBuilder = {


    run: function(creep) {
        if(creep.ticksToLive < 30){
            Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'builder'});
        }
        
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
	        var repairWalls = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => structure.hits < structure.hitsMax // && structure.structureType == STRUCTURE_WALL
			});
            if(targets.length > 0) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
			//creep repairs Walls
			else if(repairWalls.length > 0) {
				if(creep.repair(repairWalls[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(repairWalls[0]);
				}
			}
			else {
			    creep.memory.role = 'upgrader';
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