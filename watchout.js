// start slingin' some d3 here.


var axes ={
  'x': d3.scale.linear().domain([0,100]).range([0,700]),
  'y': d3.scale.linear().domain([0,100]).range([0,450])};

var gameBoard = d3.select('body').append('svg:svg')
                .attr('width', 700)
                .attr('height', 450)
                .style({'border': 'solid'})
var createEnemies = _.range(0,100).map(function(i){
    var enemy = {};
    enemy['id'] = i;
    enemy['x'] = axes.x(Math.random()*100);
    enemy['y'] = axes.y(Math.random()*100);
    return enemy;
  });


var enemies = gameBoard.selectAll('circle.enemy')
            .data(createEnemies, function(enemy){ return enemy.id;});


// var tweenToNextPosition = function(){
//   var enemy = d3.select(this);
//   console.log(enemy)
//   var oldX = enemy.x;
//   console.log(oldX)
//   var oldY = enemy.y;
//   enemy.x = axes.x(Math.random()*100);
//   console.log(enemy.x);
//   enemy.y = axes.y(Math.random()*100);
//   var deltaX=enemy.x-oldX;
//   var deltaY=enemy.y-oldY;

//   return function(t){
//     return enemies.attr('cx', function(enemy){return oldX + deltaX * t})
//                   .attr('cy',function(enemy){return oldY + deltaY * t})
//   };
// };


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



var update = function(){
enemies.transition()
  .duration(1000)
   .attr('cx', function(enemy){enemy.x = axes.x(Math.random()*100); return enemy.x;})
   .attr('cy', function(enemy){enemy.y = axes.y(Math.random()*100); return enemy.y;})
  //.tween('custom',tweenToNextPosition)
}

 setInterval(update,1000);

