var roleBuilder = {


    run: function(creep) {
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
	    var repairWalls = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => structure.hits < structure.hitsMax // && structure.structureType == STRUCTURE_WALL
			});
		var targetsNeedEnergy = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
        if((builders.length > 2 && targets.length == 0 && repairWalls.length == 0) || Game.spawns['Spawn1'].energyCapacity > Game.spawns['Spawn1'].energy * 2) {
            creep.memory.role = 'harvester';
        }
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
            if(targets.length > 0) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
			//creep repairs Walls
			else {
				if(creep.repair(repairWalls[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(repairWalls[0]);
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