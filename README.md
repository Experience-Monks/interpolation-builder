# interpolation-builder

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Using interpolation-builder you can build interpolation functions for objects and arrays. By default lerp is used but you can drop in 
custom interpolation functions also.

## Usage

[![NPM](https://nodei.co/npm/interpolation-builder.png)](https://www.npmjs.com/package/interpolation-builder)

### Example with Objects

```javascript
var builder = require( 'interpolation-builder' );

var lerper = builder();

lerper.map( [ 'x', 'y' ] ); // <- use default lerp for these properties
lerper.map( 'z', customInterpolation1 ); // <- custom interpolation for one prop
lerper.map( [ 'u', 'v' ], customInterpolation2 ); // <- custom for two props

var start = { x: 0, y: 0, z: 0, u: 0, v: 0 };
var end = { x: 100, y: 150, z: 100, u: 100, v: 200 };

console.log( lerper( 0.5, start, end ) ); // { x: 50, y: 75, z: 'c1 50', u: 'c2 50', v: 'c2 100' }

function customInterpolation1( time, start, end ) {

  return 'c1 ' + ( ( end - start ) * time + start );
}

function customInterpolation1( time, start, end ) {

  return 'c2 ' + ( ( end - start ) * time + start );
}
```


### Example with Arrays

```javascript
var builder = require( 'interpolation-builder' );

var lerper = builder();

lerper.map( [ 0, 1, 2 ] ); // <- use default lerp for these properties

var start = [ 0, 0, 0 ];
var end = [ 100, 200, 300 ];

console.log( lerper( 0.5, start, end ) ); // [ 50, 100, 150 ]
```

## License

MIT, see [LICENSE.md](http://github.com/jam3/interpolation-builder/blob/master/LICENSE.md) for details.
