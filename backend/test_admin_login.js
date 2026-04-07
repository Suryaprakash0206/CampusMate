const axios = require('axios');

async function testLogin() {
    try {
        console.log("Testing Admin Login with correct credentials...");
        const res = await axios.post('http://localhost:5000/api/admin/login', {
            adminId: 'admin',
            password: 'admin123'
        });
        console.log("Success:", res.data);

        console.log("\nTesting Admin Login with incorrect credentials...");
        try {
            await axios.post('http://localhost:5000/api/admin/login', {
                adminId: 'admin',
                password: 'wrongpassword'
            });
        } catch (err) {
            console.log("Correctly failed:", err.response.data);
        }
    } catch (err) {
        console.error("Test failed:", err.message);
        if (err.response) {
            console.error("Response data:", err.response.data);
        }
    }
}

testLogin();
