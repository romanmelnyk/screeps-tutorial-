var roleHealer = {
    run: function(creep) {
        Game.spawns['Spawn1'].createCreep([MOVE,MOVE,HEAL,HEAL], undefined, {role: 'healer'});
        var target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: (injCreep) =>  injCreep.hits < injCreep.hitsMax
        });
        if(target) {
            if(creep.heal(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        if(creep.hits < creep.hitsMax){
            creep.heal(creep);
        }
    }
}

module.exports = roleHealer;