const jwt = require("jsonwebtoken");

const JwtGenerate = (uid, name) => {
    const payload = { uid, name };

    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            process.env.SECRET_JWT_SEED, {
                expiresIn: "24h",
            },
            (error, token) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(token);
                }
            }
        );
    });
};

module.exports = {
    JwtGenerate
}