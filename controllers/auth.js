import { UserModel } from "../models/user.js";
import { loginValidator, registerValidator } from "../models/user.js";


export const register = async (req, res, next) => {
    try {
        //Registering new user
        const
            { lastName, firstName, username, email, password } = registerValidator.validate(req.body);
        // Checking all the missing fields
        if (!firstName || !lastName || !username || !email || !password) {
            return res.status(400)
                .json({ error: `Please enter all the requiured fields` })
        }
        // Checking all the missing fields
        const doesUserAlreadyExist = await UserModel.findOne({ email });
        if (doesUserAlreadyExist) {
            return res.status(400).json({ error: `A user with the email [${email}] already exist. Try Login` })
        }
        const hashedPassword = bcrypt.hashSync(password, 12);
        const newUsers = UserModel.create({ lastName, firstName, username, email, password: hashedPassword })

        //Save the user
        await newUsers.save();

        //Assign JWT
        const token = jwt.sign({ _id: newUsers._id },
            process.env.JWT_SECRET,
            { expiresIn: '48h' })

        // Return success response
        return res.status(201).json({
            status: 'success',
            message: "Registration successful",
            token,
        })
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    try {
        const { username, email, password } = loginValidator.validate(req.body);
        if (!email || !password) {
            return res
                .status(400)
                .json({ error: `Please enter all the required fields` });
        }
        const doesUserExist = await UserModel.findOne({ $or: [{ email: email }, { username: username }] })

        if (!doesUserExist) {
            return res.status(400).json({ error: `User not found` })
        }
        //If user actually exist
        const doesPasswordMatch = bcrypt.compareSync(password, doesUserExist.password);

        if (!doesPasswordMatch) return res.status(400).json({ error: `Invalid email or password` })

        const payload = { _id: doesUserExist._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '48h' })
        return res.status(201).json({
            message: "Login successfully",
            token,
            user: {
                name: doesUserExist.username,
                email: doesUserExist.email,
                role: doesUserExist.role
            }
        })
    }
    catch (error) {
        next(error)
    }
}
export const passwordForgot = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res
                .status(400)
                .json({ error: `Please enter all the required fields` });
        }
        const doesUserExist = await UserModel.findOne({ email })

        if (!doesUserExist) {
            return res.status(400).json({ error: `User not registered` })
        }
        const payload = { _id: doesUserExist._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5m' })
        const { AUTH_EMAIL, AUTH_PASSWORD } = process.env;

        let transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com",
            port: 587,
            auth: {
                user: AUTH_EMAIL,
                pass: AUTH_PASSWORD,
            },
        });

        const mailOptions = {
            from: AUTH_EMAIL,
            to: email,
            subject: 'Reset Password',
            text: 'insert link here/$token'
        }
        transporter.sendMail(mailOptions, error)
        if (error) {
            return res.status(400).json({ error: `error` })
        } else {
            return res.status(200).json({ message: `Email sent to [${email}]` })
        }
    }
    catch (error) {
        next(error)
    }
}
export const passwordReset = async (req, res, next) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const id = decoded.id;
        const hashedPassword = bcrypt.hashSync(password, 12);
        await UserModel.findByIdAndUpdate({_id: id}, {password: hashedPassword})
// Return status response
        return res.status(201).json({
            status: 'success',
            message: "Password Updated"
        })   
    }
    catch (error) {
        return res.status(422).json({
            status: 'failed',
            message: "Invalid Token"
        }) 
    }
}

export const googleSignup = async (req, res, next) => {
    try {

    } catch (error) {

    }
}
export const googleLogin = async (req, res, next) => {
    try {

    } catch (error) {

    }
}
export const discordSignup = async (req, res, next) => {
    try {

    } catch (error) {

    }
}
export const discordLogin = async (req, res, next) => {
    try {

    } catch (error) {

    }
}
export const logout = async (req, res, next) => {
    try {
        res.clearCookie('token')
        return res.status(201).json({
            status: 'success',
            message: "Logout successful"
        })
    } catch (error) {

    }
}
