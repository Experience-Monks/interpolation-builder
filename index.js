module.exports = function() {

  var interpolationFunctions = {};

  function interpolator( time, start, end ) {

    var rVal = Array.isArray( start ) ? [] : {};

    for( var i in interpolationFunctions ) {

      rVal[ i ] = interpolationFunctions[ i ]( time, start[ i ], end[ i ] );
    }

    return rVal;
  }

  interpolator.map = function( property, interpolationFunction ) {

    if( Array.isArray( property ) ) {

      property.forEach( function( property ) {

        interpolationFunctions[ property ] = interpolationFunction || lerp;        
      });
    } else {

      interpolationFunctions[ property ] = interpolationFunction || lerp;  
    }
  };

  return interpolator;
};

function lerp( time, start, end ) {

  return ( end - start ) * time + start;
}