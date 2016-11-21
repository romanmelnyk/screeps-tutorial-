var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleCourier = require('role.courier');
var roleArcher = require('role.archer');
var roleHealer = require('role.healer');
var roleMelee = require('role.melee');
var roleMiner = require('role.miner');
var roleTransporter = require('role.transporter');

var towers = require ('towers');

module.exports.loop = function () {
	//for towers
    var towers = Game.spawns.Spawn1.room.find(FIND_STRUCTURES,{
            filter: (structure) => structure.structureType == STRUCTURE_TOWER
    });
    if(towers.length == 0){
        Game.spawns['Spawn1'].room.createConstructionSite( 23, 22, STRUCTURE_TOWER );
    }
    
    else{
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
        if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'archer') {
            roleArcher.run(creep);
        }
        if(creep.memory.role == 'courier') {
            roleCourier.run(creep);
        }
        if(creep.memory.role == 'healer') {
            roleHealer.run(creep);
        }
        if(creep.memory.role == 'Melee') {
            roleMelee.run(creep);
        }
        if(creep.memory.role == 'transporter') {
            roleTransporter.run(creep);
        }
    }
}
