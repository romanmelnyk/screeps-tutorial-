var towers = {

    run: function(tower) {
        
        //main task(attacking enemies)
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
        
        if(closestHostile) {
            tower.attack(closestHostile);
        }
		
        //repairs roads every 10th tick
		counter++; 
        if(counter == 10){
            
            var roadsNeededToRepair = tower.room.find(FIND_STRUCTURES, {
                filter: (structure) => structure.structureType == STRUCTURE_ROAD && structure.hits < structure.hitsMax
            });
            
            if(roadsNeededToRepair.length > 0){
                tower.repair(roadsNeededToRepair[0]);
            }
            counter = 0;
        }
        
    }
}
var counter = 0;
module.exports = towers;