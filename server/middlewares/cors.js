
module.exports = () => (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Authorization');

    next();
}