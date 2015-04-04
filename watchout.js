// start slingin' some d3 here.


var axes ={
  'x': d3.scale.linear().domain([0,100]).range([0,700]),
  'y': d3.scale.linear().domain([0,100]).range([0,450])};

var gameBoard = d3.select('body').append('svg:svg')
                .attr('width', 700)
                .attr('height', 450)
                .style({'border': 'solid'});





var createEnemies = _.range(0,20).map(function(i){
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
enemies.exit()
  .remove()





var drag = d3.behavior.drag()
             .on('dragstart', function() { players.style({'fill' : 'green', 'stroke': 'green'}); })
             .on('drag', function() { players.attr('cx', d3.event.x)
                                            .attr('cy', d3.event.y); })
             .on('dragend', function() { players.style({'fill': 'red', 'stroke': 'red'});});




 var player = [{
   'x' : axes.x(50),
   'y' : axes.y(50),
}]

 var players = gameBoard.selectAll('circle.player')
                    .data(player);

 players.enter()
  .append('svg:circle')
   .attr('class', 'player')
   .attr('cx', axes.x(50))
   .attr('cy', axes.y(50))
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
  //.tween('custom',tweenToNextPosition)
}

 setInterval(update,1000);

