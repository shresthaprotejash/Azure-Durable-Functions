const df = require("durable-functions");

module.exports = df.entity(function (context) {
    try {

        const currentValue = context.df.getState(() => 0);
        switch (context.df.operationName) {
            case "add":
                const amount = context.df.getInput();
                context.df.setState(currentValue + amount);
                context.log('Current VAlue: ', currentValue);
                break;
            case "reset":
                context.df.setState(0);
                break;
            case "get":
                context.df.return(currentValue);
                break;
        }
    } catch (error) {
        console.log('Error in Entity Function: ', error);
    }
});