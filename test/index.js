var test = require( 'tape' );
var interpolator = require( './..' );

test( 'using objects', function( t ) {

  t.plan( 1 );

  var animator = interpolator();

  var start = {

    x: 0,
    y: 0,
    z: 0,
    w: 0,
    u: 0,
    v: 0
  };

  var end = {

    x: 50.50,
    y: 100,
    z: 500,
    w: 1000,
    u: 1500,
    v: 2000
  };

  var value;

  animator.map( 'x' );
  animator.map( 'y', customInterpolator );
  animator.map( [ 'z', 'w' ] );
  animator.map( [ 'u', 'v' ], customInterpolator );

  t.deepEqual( animator( 0.5, start, end ), {
    x: 25.25,
    y: 'bigger',
    z: 250,
    w: 500,
    u: 'bigger',
    v: 'bigger'
  }, 'interpolation was correct' );
});

test( 'using arrays', function( t ) {

  t.plan( 1 );

  var start = [ 0, 100, 200, 0 ];
  var end = [ 25, 200.50, 300, 100 ];

  var animator = interpolator();

  animator.map( [ 0, 3 ] );
  animator.map( 1, customInterpolator );
  animator.map( 2 );


  t.deepEqual( animator( 0.5, start, end ), [ 12.5, 'bigger', 250, 50 ], 'values were equal' );
});


test( 'recusive', function( t ) {

  t.plan( 1 );

  var start = {

    inner: {
      x: 0,
      y: 0
    }
  };

  var end = {

    inner: {
      x: 104,
      y: 100
    }
  };

  var animator1 = interpolator();
  var animator2 = interpolator();

  animator1.map( 'inner', animator2 );
  animator2.map( [ 'x', 'y' ] );

  t.deepEqual( animator1( 0.5, start, end ), {

    inner: {
      x: 52,
      y: 50
    }
  }, 'interpolated nested' );
});

function customInterpolator( time, start, end ) {

  if( time <= 0.25 ) {
    return 'big';
  } else if( time <= 0.5 ) {
    return 'bigger';
  } else {
    return 'biggest';
  }
}