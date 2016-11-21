var roleArcher = {
    run: function(creep) {
        Game.spawns['Spawn1'].createCreep([MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK], undefined, {role: 'archer'});
        var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(target) {
            if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        } 
    }
}

module.exports = roleArcher;