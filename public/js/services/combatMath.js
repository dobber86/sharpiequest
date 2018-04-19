app.service('combatMath', function() {
  this.getEnemy=function(x) {
    return Math.floor(Math.random() * x);
  }
  this.getResponse=function(x) {
    return Math.floor((Math.random() * x) + 1);
  }
  this.getAttack=function(currentHP, attackPower){
    return Math.max(0,currentHP - attackPower);
  }
  this.getHit=function(playerAccuracy){
    var benchmark = Math.floor((Math.random() * 100) + 1);
      if (benchmark < playerAccuracy) {
        return true;
      }
      else {
        return false;
      }
  }
  this.getDefend=function(currentHP, attackPower, defendResistance){
    return Math.max(0,currentHP - (Math.max(0, attackPower - defendResistance)));
  }
  this.getDefendDamage=function(attackPower, defendResistance) {
    return Math.max(0, attackPower - defendResistance);
  }
  this.getPercentHP=function(currentHP, maxHP) {
    return (100*(currentHP / maxHP));
  }
});