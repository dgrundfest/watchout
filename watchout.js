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
    enemy['x'] = Math.random()*100;
    enemy['y'] = Math.random()*100;
    return enemy;
  });


var enemies = gameBoard.selectAll('circle.enemy')
            .data(createEnemies, function(enemy){ return enemy.id;});

 var enemy = d3.select(this);

 enemies.enter()
    .append('svg:circle')
      .attr('class', 'enemy')
      .attr('cx', function(enemy){
      return axes.x(enemy.x);
        })
      .attr('cy', function(enemy){
        return axes.y(enemy.y);
      })
      .attr('r', 10)
