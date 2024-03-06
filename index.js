import App from "./app.js";
import crypto from 'crypto';

const app = new App({
    genReqId: function (req) {
        return (req.id = crypto.randomUUID());
    },
});

(BigInt.prototype).toJSON = function () {
    return Number(this);
};

const PORT = 5000;
app
    .listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
        if (err) {
            console.log(
                `error starting the server @ ${
                    address || '0.0.0.0'
                } with error ${err}`
            );
            process.exit(1);
        }
        console.log(`App listening on ${address}`);
    });
    