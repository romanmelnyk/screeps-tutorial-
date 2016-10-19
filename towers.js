var towers = {

    run: function(tower) {
        
        //main task(attacking enemies)
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
        
        if(closestHostile) {
            tower.attack(closestHostile);
        }
		
        if(Game.time % 10 == 0){
            
            var roadsNeededToRepair = tower.room.find(FIND_STRUCTURES, {
                filter: (structure) => structure.structureType == STRUCTURE_ROAD && structure.hits < structure.hitsMax
            });
            
            if(roadsNeededToRepair.length > 0){
                tower.repair(roadsNeededToRepair[0]);
            }
        }
        
    }
}
module.exports = towers;