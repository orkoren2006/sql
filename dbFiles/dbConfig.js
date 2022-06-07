const config = {
    user: 'ORSQL',
    password: '123456',
    server: 'DEMRI-KOREN',
    database: 'SQL Scorelate',
    options: {
        trustServerCertificate: true,
        trustedConnection: false,
        enableArithAbort: true,
        instancename: 'SQLEXPRESS'
    },
    port: 1433
};

module.exports = config;