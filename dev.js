/**
 * This function checks if any of the items in args is
 * undefined. If so, add the corresponding property in
 * apis to the returned object, which in turn acts as
 * an argument collector. Otherwise executes goal.
 * Usage:
 *     core_wrap( arguments, {
 *         'select': collector1,
 *         'by': collector2,
 *         'on': collector3,
 *     }, finalFunc );
 */

function core_wrap( args, apis, goal ) {
    var result = {},
        hasArgMissing = false,
        apiNames = Object.getOwnPropertyNames( apis );
    for ( var i = 0, n = apiNames.length; i < n; ++i ) {
        var apiName = apiNames[ i ];
        var api = apis[ apiName ];
        if ( typeof args[ i ] === 'undefined' ) {
            hasArgMissing = true;
            result[ apiName ] = ( function ( i, api ) {
                return function ( newArg ) {
                    if ( typeof api === 'function' ) {
                        // Use the api to collect arguments.
                        args[ i ] = api.apply( this, arguments );
                    } else {
                        args[ i ] = newArg;
                    }
                    return core_pack( args, apis, goal );
                };
            } )( i, api );
        }
    }
    
    if ( !hasArgMissing ) {
        // No argument is missing
        args.length = apiNames.length;
        return goal.apply( this, args );
    } else {
        return result;
    }
}