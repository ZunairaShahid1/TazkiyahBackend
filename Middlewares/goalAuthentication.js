import { verifyUserID } from "../Controller/authVerification.js";

export const VerifySetterID = async (req, res, next) => {
    try {
        if (!req.body.setterId) {
            throw new Error("Invalid Credentials! Try Logout and Login again")
        }
        const isAuthenticUser = await verifyUserID(req.body.setterId)
        if (isAuthenticUser) {
            next();
        } else {
            throw new Error("User Not Found")
        }
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: err.message
        })
    }
}