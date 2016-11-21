var roleCourier = {
    run: function(creep) {
        Game.spawns['Spawn1'].createCreep([MOVE,MOVE,MOVE,CARRY,CARRY,CARRY], undefined, {role: 'courier',distributing: true});
        if(creep.ticksToLive < 30) {
            Game.spawns['Spawn1'].createCreep([MOVE,MOVE,MOVE,CARRY,CARRY,CARRY], undefined, {role: 'courier',distributing: true});
        }
        
        if(creep.memory.distributing && creep.carry.energy == 0) {
            creep.memory.distributing = false;
	    }
	    if(!creep.memory.distributing && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.distributing = true;
	    }
        
        var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        
        var towers = creep.pos.findClosestByRange(FIND_STRUCTURES,{
            filter: (structure) => structure.structureType == STRUCTURE_TOWER && structure.energy < (structure.energyCapacity/2)
            });
        
	    
	    
	    if(creep.memory.distributing ) {
            var energyPlace = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
            var towers = creep.pos.findClosestByRange(FIND_STRUCTURES,{
                filter: (structure) => structure.structureType == STRUCTURE_TOWER && structure.energy < (structure.energyCapacity/2)
            });
            if(closestHostile && towers.length != 0){
                if(creep.transfer(towers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(towers[0]);
                }
	        }
	        else{
	            if(creep.transfer(energyPlace[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tenergyPlace[0]);
                }
	        }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER ||
                            structure.structureType == STRUCTURE_STORAGE ||
                            structure.structureType == STRUCTURE_TERMINAL) && structure.energy > 0;
                }
        });
            if(creep.withdraw(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0])
            }
        }
        
        
    }
}

module.exports = roleCourier;