var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var towers = require ('towers');

module.exports.loop = function () {
	console.log(Game.time);
	//for towers
    var tower = Game.spawns.Spawn1.room.find(FIND_STRUCTURES,{
            filter: (structure) => structure.structureType == STRUCTURE_TOWER
    });
    if(tower.length == 0){
        Game.spawns['Spawn1'].room.createConstructionSite( 23, 22, STRUCTURE_TOWER );
    }
    
    else{
        console.log('here');
        for(var i = 0 ; i < tower.length ; i++){
            towers.run(tower[i]);
        }
    }
    
    //for creeps 
    if(_.filter(Game.creeps).length == 0){
        Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
    }
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
