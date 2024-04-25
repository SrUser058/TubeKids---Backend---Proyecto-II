
const accountSid = process.env.sid;
const authToken = process.env.authToken;
const twilioNumber = process.env.twilioNumber;
const personalNumber = process.env.personalNumber
const client = require('twilio')(accountSid, authToken);

const sendMessage = (req, res) => {
    if (req.query.number) {
        try {
            const code = generateNumber();
            client.messages.create({
                body: `Your access code ir ${code[0]} ${code[1]} ${code[2]} ${code[3]} ${code[4]} ${code[5]} ${code[6]} ${code[7]}`,
                from: twilioNumber,
                to: personalNumber
            }).then(message => {
                //console.log(message);
                res.status(200);
                res.json({ message, code });
            })
        } catch (error) {
            console.log(error);
            res.status(400);
            res.json({});
        }
    } else {
        console.log('No valid data');
        res.status(400);
        res.json({}); 
    }
}

function generateNumber() {
    let numbers = [];
    for (let x = 0; x < 8; x++) {
        numbers.push(Math.floor(Math.random() * 10));
    }
    return numbers
}

module.exports = { sendMessage }