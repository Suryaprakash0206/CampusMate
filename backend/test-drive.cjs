const url = 'http://localhost:5000/api/faculty/add-drive';
const data = {
    company: 'Google',
    role: 'SDE'
};

fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
})
    .then(res => res.json())
    .then(json => console.log('Response:', json))
    .catch(err => console.error('Error:', err));
