// start slingin' some d3 here.
window.timeElapsed = 0;
window.collisions=0;
window.highScore = 0;

var axes ={
  'x': d3.scale.linear().domain([0,100]).range([0,700]),
  'y': d3.scale.linear().domain([0,100]).range([0,450])};

var gameBoard = d3.select('body').append('svg:svg')
                .attr('width', 700)
                .attr('height', 450)
                .style({'border': 'solid'});



var createEnemies = _.range(0,10).map(function(i){
    var enemy = {};
    enemy['id'] = i;
    enemy['x'] = axes.x(Math.random()*100);
    enemy['y'] = axes.y(Math.random()*100);
    return enemy;
  });

var enemies = gameBoard.selectAll('circle.enemy')
            .data(createEnemies, function(enemy){ return enemy.id;});
 enemies.enter()
    .append('svg:circle')
      .attr('class', 'enemy')
      .attr('cx', function(enemy){
        return enemy.x;
      })
      .attr('cy', function(enemy){
        return enemy.y;
      })
      .attr('r', 10)
// enemies.exit()
//   .remove()

var drag = d3.behavior.drag()
             .on('dragstart', function() { players.style({'fill' : 'green', 'stroke': 'green'}); })
             .on('drag', function() { players.attr('cx', d3.event.x)
                                            .attr('cy', d3.event.y); })
             .on('dragend', function() { players.style({'fill': 'red', 'stroke': 'red'});});


 var player = [{
   'cx' : axes.x(50),
   'cy' : axes.y(50),
}]

 var players = gameBoard.selectAll('circle.player')
                    .data(player);

 players.enter()
  .append('svg:circle')
   .attr('class', 'player')
    .attr('cx', function(d){ return d.cx})
   .attr('cy', function(d){ return d.cy})
   .attr('r', 10)
    .style({'fill': 'red','stroke':'red'})
    .call(drag)
 players.exit()
   .remove()

var update = function(){
enemies.transition()
  .duration(1000)
   .attr('cx', function(enemy){enemy.x = axes.x(Math.random()*100); return enemy.x;})
   .attr('cy', function(enemy){enemy.y = axes.y(Math.random()*100); return enemy.y;})
   .tween('custom',checkCollisionTween);
    setInterval(upDateScore,100);
}


var checkCollisionTween = function(){
var radiusSum = 20;
return function(){
    var eX = d3.select(this).attr("cx");
    var eY = d3.select(this).attr("cy");
    var pX = d3.selectAll("circle.player").attr("cx");
    var pY = d3.selectAll("circle.player").attr("cy");
    var xDiff=eX - pX;
    var yDiff=eY - pY;
    var dist = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
    if(dist < radiusSum){
      window.collisions++;
      console.log(window.collisions);
    }
  }
};

var upDateScore = function(){
  window.timeElapsed++;
  var score = Math.trunc(window.timeElapsed / 100 - window.collisions);
  if(score > window.highScore){
    window.highScore = score
  }
  document.getElementById("collisioncount").textContent=window.collisions;
  document.getElementById("currentscore").textContent=score;
  document.getElementById("currenthighscore").textContent=window.highScore;
};

 setInterval(update,1000);
