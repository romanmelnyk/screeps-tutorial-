var roleMiner = {

    run: function(creep) {

        Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,WORK,MOVE], undefined, {role: 'miner', sourceMine: '0'});
        if(creep.ticksToLive < 30) {
            Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,WORK,MOVE], undefined, {role: 'miner', sourceMine: '0'});
        }
        if(creep.memory.sourceMine == 0) {
            
            var sources = creep.room.find(FIND_SOURCES);
            var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
            
            for(var i = 0 ; i < sources.length ; i++){
                var needed =  sources[i].pos.findInRange(miners,1);
                //console.log(sources[0]);
                console.log(needed[0]);
			    if(needed.length > 0){
			        needed[0].memory.sourceMine = sources[0];
		            console.log(sources[0]);
			        sources.splice(i,1);
			        i--;
			        console.log('-------------------------------');
			        console.log(sources[0]);
			    }
			    else{
			        creep.memory.sourceMine = sources[0];
			    }
            }
        }
        else {
            var source = Game.getObjectById(creep.memory.sourceMine.id);
            console.log(creep.memory.sourceMine.id);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
            else{
                creep.build(STRUCTURE_CONTAINER);
            }
            
        }
            
    }
}
module.exports = roleMiner;