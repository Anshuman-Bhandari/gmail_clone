import { Email } from "../models/email.model.js"
import { User } from "../models/user.model.js"

export const createEmail = async(req,res) => {
    try {
        const userId = req.id
        const {to,subject,message} = req.body
        if(!to || !subject || !message)
            return res.status(400).json({message: 'All field are required', success:false})
                    
        const email = await Email.create({
            to,
            subject,
            message,
            userId
        })
        return res.status(201).json({email})

    } catch (error) {
        console.log(error);
    }
}

export const deleteEmail = async(req,res) => {
    try {
        const emailId = req.params.id
        if(!emailId)
            return res.status(400).json({message: 'Email id is required'})

        const email = await Email.findByIdAndDelete(emailId)

        if(!email)
            return res.status(404).json({message: 'Email not found'})

        return res.status(200).json({message:'Email deleted successfully'})
    } catch(err) {
        console.log(err);
    }
}

export const getAllEmailById = async (req, res) => {
    try {
        // Extract the user's ID (from token or request)
        const userId = req.id; // User's ID
        const user = await User.findById(userId); // Fetch the user's details

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const userEmail = user.email; // User's email address

        // Find all emails sent by the user or received by the user
        const emails = await Email.find({
            $or: [
                { userId }, // Sent emails
                { to: userEmail } // Received emails
            ]
        }).sort({ createdAt: -1 }); // Sort by the most recent

        // Return the emails
        return res.status(200).json({ emails });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while fetching emails.' });
    }
};

