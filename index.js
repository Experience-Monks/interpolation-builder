module.exports = function builder( definition ) {

  var interpolationFunctions = {};

  function interpolator( time, start, end ) {

    var rVal = Array.isArray( start ) ? [] : {};

    for( var i in interpolationFunctions ) {

      rVal[ i ] = interpolationFunctions[ i ]( time, start[ i ], end[ i ] );
    }

    return rVal;
  }

  interpolator.sub = function( property ) {

    var nBuilder = builder();

    interpolationFunctions[ property ] = nBuilder;

    return nBuilder;
  },

  interpolator.map = function( property, interpolationFunction ) {

    if( Array.isArray( property ) ) {

      property.forEach( function( property ) {

        interpolationFunctions[ property ] = interpolationFunction || lerp;        
      });
    } else {

      interpolationFunctions[ property ] = interpolationFunction || lerp;  
    }

    return interpolator;
  };

  // if we have a definition setup interpolator
  if( definition ) {

    parse( interpolator, definition );
  }

  return interpolator;
};

function parse( interpolator, definition ) {

  for( var i in definition ) {

    if( typeof definition[ i ] == 'function' || !definition[ i ]  ) {

      interpolator.map( i, definition[ i ] );
    } else if( typeof definition[ i ] == 'object' ) {

      parse( interpolator.sub( i ), definition[ i ] );
    }
  }
}

function lerp( time, start, end ) {

  return ( end - start ) * time + start;
}