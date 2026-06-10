const express = require('express');
const app = express();

// EJS Template Engine सेट करा
app.set('view engine', 'ejs');

// फॉर्म डेटा वाचण्यासाठी Middleware
app.use(express.urlencoded({ extended: true }));

// 🔴 Temporary Server-Side Storage (डेटा तात्पुरता साठवण्यासाठी Array)
let temporaryUsers = [];

// होम रूट - फॉर्म दाखवण्यासाठी
app.get('/', (req, res) => {
    res.render('index');
});

// फॉर्म सबमिट झाल्यावर डेटा इथे येणार
app.post('/submit-data', (req, res) => {
    const { fullName, email, mobile } = req.body;

    // 🔴 Server-Side Validation (सुरक्षेसाठी बॅकएंडवर पुन्हा चेकिंग)
    if (!fullName || !email || !mobile) {
        return res.status(400).send("<h3>Server Error: सर्व रकाने भरणे बंधनकारक आहे!</h3>");
    }

    if (mobile.length !== 10 || isNaN(mobile)) {
        return res.status(400).send("<h3>Server Error: मोबाईल नंबर १० अंकीच असायला हवा!</h3>");
    }

    // डेटा तात्पुरता Array मध्ये सेव्ह करा
    const newUser = { id: Date.now(), fullName, email, mobile };
    temporaryUsers.push(newUser);

    // टर्मिनलवर डेटा प्रिंट करून पाहणे
    console.log("सध्या सेव्ह असलेला डेटा (Temporary Storage):", temporaryUsers);

    // स्क्रीनवर सक्सेस मेसेज दाखवणे
    res.send(`
        <div style="font-family: Arial; padding: 20px; text-align: center;">
            <h2 style="color: green;">Form Submitted Successfully! (Validated by Server)</h2>
            <p><strong>नाव:</strong> ${fullName} | <strong>ईमेल:</strong> ${email} | <strong>मोबाईल:</strong> ${mobile}</p>
            <br><a href="/">परत जा</a>
        </div>
    `);
});

// सर्व्हर पोर्ट ३००० वर चालू करा
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
