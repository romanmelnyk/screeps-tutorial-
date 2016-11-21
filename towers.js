var towers = {

    run: function(tower) {
        
        //main task(attacking enemies)
        
        var healer = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
            filter: (enemy) => enemy.getActiveBodyparts(HEAL) > 10 
        });
        var closeEnemy = tower.pos.findInRange(FIND_HOSTILE_CREEPS,15);
        if(closeEnemy){
            var closestHostile = tower.pos.findInRange(FIND_HOSTILE_CREEPS,15, {
                filter: (enemy) => enemy.getActiveBodyparts(HEAL)
            });
        }
        if(closestHostile){
            tower.attack(closestHostile);
            var attack = true;
        }
        else{
            if(!healer){
                var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            }
            else{
                var closestHostile = tower.pos.findInRange(FIND_HOSTILE_CREEPS,20);
            }
            if(closestHostile) {
                tower.attack(closestHostile);
                var attack = true;
            }
            else{
                attack = false;
            }
        }
        
		
        if(Game.time % 10 == 0){
            
            var roadsNeededToRepair = tower.room.find(FIND_STRUCTURES, {
                filter: (structure) => structure.structureType == STRUCTURE_ROAD && structure.hits < structure.hitsMax
            });
            
            if(roadsNeededToRepair.length > 0 && !attack){
                tower.repair(roadsNeededToRepair[0]);
            }
        }
        
    }
}
module.exports = towers;