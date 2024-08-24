import '@twilio-labs/serverless-runtime-types';
import twilio from 'twilio';

import {v4 as uuidv4} from 'uuid';

const uniqueId = uuidv4();


export const sendSMS = async (phoneNumber:string,otp:string):Promise<string | null> => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID!;
    const authToken = process.env.TWILIO_AUTH_TOKEN!;
    const client = twilio(accountSid, authToken);

    try {
        const message = await client.messages.create({
            body: `Hello, this is a message to authenticate your phone number, this is your OTP ${otp}, it will expire in 30 minutes.`,
            to: phoneNumber,
            from: '+12565634327'
        });

        console.log(`Message sent with SID: ${message.sid}`);
        return uuidv4()
    } catch (error) {
        console.error('Failed to send message:', error);
        return null
    }
}
