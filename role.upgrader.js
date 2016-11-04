var roleUpgrader = {

    run: function(creep) {
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        var repairWalls = creep.room.find(FIND_STRUCTURES, {
			filter: (structure) => structure.hits < structure.hitsMax // && structure.structureType == STRUCTURE_WALL
		});
		if((targets.length > 0 || repairWalls.length > 0) && upgraders.length > 2){
		    creep.memory.role = 'builder';
		}
		if(creep.ticksToLive < 30){
            Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
        }
        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.say('upgrading');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
	}
};

module.exports = roleUpgrader;