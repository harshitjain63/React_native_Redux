import { Middleware } from "redux";

// A Function which recieves store as an argument
// return a function from this function (loggingMiddleware) and this function gonna recieve a function called next 
// return a one final function that recieves an action
// the reason the middleware structured in this way so that redux can each of the functions sequentially and then know when your middleware is done executing so that it can call next middleware in the chain thats the purpose of the next function
const loggingMiddleware : Middleware = (store) => {
    return (next) => {
        return (action) => {
            console.group(action.type); // It is going to group all our console log together so that we know that they are all coming from the same action being dispatched and it will be easier to read in console , so name our group based on the action type i.e action.type
            console.log('Action', action); // This tells the actio being dispatched
            console.log('Previous State :', store.getState());
            const result = next(action); // it is very important to call the next function with action being dispatched and  in addition it is very important that you returned it so that redux knows that your middleware is done executing and it can call next middleware in the chain
            console.log('Next State :', store.getState());
            console.groupEnd(action.type); // now browser will know how the console group has ended
            return result;
        };

    };

};

export default loggingMiddleware;
