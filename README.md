the data provider expects a function that receives props as the argument and returns an object.
each top level key will be the name of the new prop that will be provided to the base component.
each key will need to be given an 'api' function (required), and an 'args' array (optional).
the api function will be fired with the given args, and again any time the args change.
