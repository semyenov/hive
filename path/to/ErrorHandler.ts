export class CustomError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "CustomError";
    }
}

// Middleware to handle errors
export const errorHandler = (err, req, res, next) => {
    res.status(500).json({ error: err.message });
};
