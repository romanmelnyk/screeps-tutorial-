var roleHarvester = {


    run: function(creep) {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var targetsBuilding = creep.room.find(FIND_CONSTRUCTION_SITES);
        var repairWalls = creep.room.find(FIND_STRUCTURES, {
			filter: (structure) => structure.hits < structure.hitsMax // && structure.structureType == STRUCTURE_WALL
		});
		
        if(harvesters.length < 2 || creep.ticksToLive < 30) {
            Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
        }
        if(harvesters.length > 1 && builders.length == 0 && (targetsBuilding.length > 0 || repairWalls.length > 0)) {
            harvesters[0].memory.role = 'builder';
        }
        if(harvesters.length > 1 && upgraders.length == 0) {
            harvesters[0].memory.role = 'upgrader';
        }
        
	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
        
	}
};

module.exports = roleHarvester;