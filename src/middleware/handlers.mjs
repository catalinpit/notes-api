const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (err.name === 'CastError') {
        return res.status(400).send({
            error: 'Malformatted id'
        });
    }

    next(err);
};

const unknownEndpoint = (req, res) => {
    res.status(404).json({ error: 'No such endpoint' })
};

const reqLogger = (req, res, next) => {
    console.log(`Method => ${req.method}`);
    console.log(`Path => ${req.path}`);
    console.log(`Body => ${req.body}`);
    console.log(`Params => ${req.params}`);
    next();
};

export { errorHandler, unknownEndpoint, reqLogger };