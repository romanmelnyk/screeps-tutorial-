var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var towers = require ('towers');

module.exports.loop = function () {
	
	//for towers
    var tower = Game.spawns.Spawn1.room.find(FIND_STRUCTURES,{
            filter: (structure) => structure.structureType == STRUCTURE_TOWER
    });
    for(var i = 0 ; i < tower.length ; i++){
        towers.run(tower[i]);
    }
    //for creeps   
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}