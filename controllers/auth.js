import { UserModel } from "../models/user.js";
import { VerificationModel } from "../models/verif.js";
import { generateOTP } from "../middlewares/auth.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { createTransport } from "nodemailer";


export const register = async (req, res, next) => {
    try {
        //Registering new user
        const
            { lastName, firstName, username, email, password, password2 } = req.body;
        // Checking all the missing fields
        if (!firstName || !lastName || !username || !email || !password) {
            return res.status(400)
                .json({ error: `Please enter all the requiured fields` })
        }
        const newEmail = email.toLowerCase()
        // Checking if the user exist
        const doesUserAlreadyExist = await UserModel.findOne({ email: newEmail });
        if (doesUserAlreadyExist) {
            return res.status(400).json({ error: `A user with the email [${email}] already exist. Try Login` })
        }
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
        if (!regex.test(password))
            return res
                .status(400)
                .json({ error: `Please enter a strong password` });
        if ((password.trim()).lenght < 6) {
            return res.status(422).json({ error: `Password should be at least 6 characters` })
        }
        if (password != password2) {
            return res.status(422).json({ error: `Passwords do not match` })
        }
        const hashedPassword = bcrypt.hashSync(password, 12);
        const newUsers = UserModel.create({ lastName, firstName, username, email: newEmail, password: hashedPassword })
        //Save the user
        await newUsers.save();

        //Assign JWT
        const token = jwt.sign({ _id: newUsers._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' })

        // Return success response
        return res.status(201).json({
            message: `Registration for ${newUsers.username} with ${token} successful`,
        })
    } catch (error) {
        next(error)
    }
}

export const OPTVerification = async (req, res, next) => {
    try {
        const { userId, otp } = req.params;

        const result = await VerificationModel.findOne({ userId });

        const { expiresAt, token } = result;

        // token has expired, delete token
        if (expiresAt < Date.now()) {
            await VerificationModel.findOneAndDelete({ userId });

            const message = "Verification token has expired.";
            res.status(404).json({ message });
        } else {
            const isMatch = await compareString(otp, token);

            if (isMatch) {
                await Promise.all([
                    UserModel.findOneAndUpdate({ _id: userId }, { emailVerified: true }),
                    VerificationModel.findOneAndDelete({ userId }),
                ]);

                const message = "Email verified successfully";
                res.status(200).json({ message });
            } else {
                const message = "Verification failed or link is invalid";
                res.status(404).json({ message });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "Something went wrong" });
    }
};

export const login = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ error: `Please enter all the required fields` });
        }
        const newEmail = email.toLowerCase()
        const doesUserExist = await UserModel.findOne({ $or: [{ email: newEmail }, { username: username }] })

        if (!doesUserExist) {
            return res.status(400).json({ error: `User not found` })
        }
        //If user actually exist
        const doesPasswordMatch = bcrypt.compareSync(password, doesUserExist.password);

        if (!doesPasswordMatch) return res.status(400).json({ error: `Invalid email or password` })

        const { _id: id } = doesUserExist;
        const token = jwt.sign(id, process.env.JWT_SECRET, { expiresIn: '1d' })
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

        const mailTransport = createTransport({
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
        mailTransport.sendMail(mailOptions, error)
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
        await UserModel.findByIdAndUpdate({ _id: id }, { password: hashedPassword })
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

export const changeProfileImage = async (req, res, next) => {
    try {
        if (!req.files.profileImage) {
            return res.status(422).send('Please choose an image')
        }
        const user = await UserModel.findById(req.user.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        const { profileImage } = req.files.filename
        const updatedImage = await UserModel.findByIdAndUpdate(
            req.user.id,
            {
                profileImage: req.file.filename
            },
            { new: true }
        )
        if (!updatedImage) {
            return res.status(422).send('Profile image could not be changed');
        }
        // return response
        res.status(200).json({ message: 'Update successful', achievement })
    } catch (error) {
        next(error)
    }
}

export const editProfile = async (req, res, next) => {
    try {
        const { error, value } = req.body

        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        const user = await UserModel.findById(req.user.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        const editedProfile = await UserModel.findByIdAndUpdate(
            req.params.id,
            {
                ...value,
                image: req.file.filename
            },
            { new: true }
        )
        if (!editedProfile) {
            return res.status(404).send('Update not successful');
        }
        // return response
        res.status(200).json({ message: 'Update successful', editedProfile })
    } catch (error) {
        next(error)
    }
}

export const getUser = async (req, res, next) => {
    try {
        const { id } = req.user
        const user = await UserModel.findById(id).select('-password')
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

export const sendVerificationEmail = async (user, res, token) => {
    const { _id, email, username } = user;
    const otp = generateOTP();

    //   mail options
    const mailOptions = {
        from: AUTH_EMAIL,
        to: email,
        subject: "Email Verification",
        html: `<div
      style='font-family: Arial, sans-serif; font-size: 20px; color: #333; background-color: #f7f7f7; padding: 20px; border-radius: 5px;'>
      <h3 style="color: rgb(8, 56, 188)">Please verify your email address</h3>
      <hr>
      <h4>Hi, ${username},</h4>
      <p>
          Please verify your email address with the OTP.
          <br>
          <h1 styles='font-size: 20px; color: rgb(8, 56, 188);'>${otp}</h1>
      <p>This OTP <b>expires in 2 mins</b></p>
      </p>
      <div style="margin-top: 20px;">
          <h5>Regards</h5>
          <h5>Bloom & Balance</h5>
      </div>
  </div>`,
    };

    try {
        const hashedToken = await hashString(String(otp));

        const newVerifiedEmail = await VerificationModel.create({
            userId: _id,
            token: hashedToken,
            createdAt: Date.now(),
            expiresAt: Date.now() + 120000,
        });

        if (newVerifiedEmail) {
            createTransport
                .sendMail(mailOptions)
                .then(() => {
                    res.status(201).send({
                        success: "PENDING",
                        message:
                            "OTP has been sent to your account. Check your email and verify your email.",
                        user,
                        token,
                    });
                })
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "Something went wrong" });
    }
};

export const logout = async (req, res, next) => {
    try {
        res.clearCookie('token')
        res.cookie('jwt', '', { expiresIn: '1' })
        return res.status(201).json({
            status: 'success',
            message: "Logout successful"
        })
    } catch (error) {

    }
}
