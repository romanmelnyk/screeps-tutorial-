var roleTransporter = {
    run: function(creep) {
        Game.spawns['Spawn1'].createCreep([WORK,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY], undefined, {role: 'transporter',transporting: true});
        if(creep.ticksToLive < 30) {
            Game.spawns['Spawn1'].createCreep([WORK,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY], undefined, {role: 'transporter',transporting: true});
        }
        if(creep.memory.transporting && creep.carry.energy == 0) {
            creep.memory.transporting = false;
	    }
	    if(!creep.memory.transporting && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.transporting = true;
	    }
        if(creep.memory.transporting ) {
            var towers = Game.spawns.Spawn1.room.find(FIND_STRUCTURES,{
                filter: (structure) => structure.structureType == STRUCTURE_TOWER
            });
            var EnergyStructures = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType == STRUCTURE_CONTAINER && (structure.findInRange(FIND_MY_SPAWNS,1) || structure.findInRange(towers,1) )) ||
                            structure.structureType == STRUCTURE_STORAGE ||
                            structure.structureType == STRUCTURE_TERMINAL) && structure.energy < structure.energyCapacity;
                }
        });
            if(creep.transfer(EnergyStructures[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(EnergyStructures[0])
            }
        }
        else {
            var Container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => structure.structureType == STRUCTURE_CONTAINER
                                && structure.energy > 0 && structure.findInRange(FIND_SOURCES,1)
        });
            if(creep.withdraw(Container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Container)
            }
        }
    }
}

module.exports = roleTransporter;