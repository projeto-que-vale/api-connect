class AnalyticsExtension {
    requestDidStart({variables, context}) {
        //console.time("requestDidStart");
        console.log("VARIABLES");
        console.log(variables);

        return (...errors) => {
            if (errors.length) {
                console.log("ERRORS");
                console.log(JSON.stringify(errors, null, 2));
            }
            //console.timeEnd("requestDidStart");
        };
    }

    /*validationDidStart(...args) {
        console.time("validationDidStart", args);
        // console.log('context.metric.validation', context.metric.validation);
        return () => console.timeEnd("validationDidStart");
    }*/

    /*executionDidStart() {
        //console.time("executionDidStart");
        return () => console.timeEnd("executionDidStart");
    }*/

    willSendResponse({graphqlResponse, context}) {
        //console.log('CONTEXT--->', context);
        if (graphqlResponse.data) {
            if (context.hasOwnProperty('connection')) {
                //graphqlResponse.data.accessControl = context.connection.auth.accessControl;
                graphqlResponse.data.error = 'ssssssssssssssssssssssssssssss';
            } else {
                // TODO:: Implementar erro de segurança
            }
        } else {
            console.error('NO_DATA', graphqlResponse);
            //console.error('NO_DATA_ERRORS', graphqlResponse['errors'][0]);
        }
    }
}

module.exports = AnalyticsExtension;
