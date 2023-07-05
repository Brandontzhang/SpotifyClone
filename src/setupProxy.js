module.exports = (app) => {
    app.use(proxy(`/auth/**`, { 
        target: 'http://localhost:5000' 
    }));
};