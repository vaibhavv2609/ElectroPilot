import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID || process.env.TWILIO_SID || "ACdefault";
const authToken = process.env.TWILIO_AUTH_TOKEN || process.env.TWILIO_TOKEN || "default_token";
const fromNumber = process.env.TWILIO_PHONE_NUMBER || process.env.TWILIO_FROM || "+1234567890";

const client = twilio(accountSid, authToken);

const interviewQuestions = [
  "What type of electronics are you primarily looking for today?",
  "What's your budget range for this purchase?",
  "How will you primarily be using this device?",
  "Are there any specific features that are important to you?",
  "Do you have any brand preferences or requirements?"
];

export async function initiateCall(phoneNumber: string, userId: string): Promise<{ callId: string }> {
  try {
    const twimlUrl = `${process.env.BASE_URL || 'http://localhost:5000'}/api/twiml/${userId}`;
    
    const call = await client.calls.create({
      to: phoneNumber,
      from: fromNumber,
      url: twimlUrl,
      record: true,
      recordingStatusCallback: `${process.env.BASE_URL || 'http://localhost:5000'}/api/recording-callback`,
      recordingStatusCallbackMethod: 'POST'
    });

    return { callId: call.sid };
  } catch (error) {
    throw new Error(`Failed to initiate call: ${error.message}`);
  }
}

export function generateTwiML(questionIndex: number = 0): string {
  if (questionIndex >= interviewQuestions.length) {
    return `
      <Response>
        <Say voice="alice">Thank you for your responses. We're now generating your personalized recommendations. You'll receive them shortly on our website. Have a great day!</Say>
        <Hangup/>
      </Response>
    `;
  }

  const question = interviewQuestions[questionIndex];
  const nextUrl = `${process.env.BASE_URL || 'http://localhost:5000'}/api/twiml-response`;

  return `
    <Response>
      <Say voice="alice">${question}</Say>
      <Record 
        timeout="10" 
        finishOnKey="#" 
        action="${nextUrl}" 
        method="POST" 
        recordingStatusCallback="${process.env.BASE_URL || 'http://localhost:5000'}/api/recording-callback"
        recordingStatusCallbackMethod="POST"
      />
    </Response>
  `;
}

export async function getCallRecordings(callSid: string): Promise<string[]> {
  try {
    const recordings = await client.recordings.list({ callSid });
    return recordings.map(recording => recording.uri);
  } catch (error) {
    throw new Error(`Failed to get call recordings: ${error.message}`);
  }
}
