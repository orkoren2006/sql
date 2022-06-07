const config = require('./dbConfig'),
    sql = require('mssql');

const getLoans = async () => {
    try {
        let pool = await sql.connect(config);
        let loans = await pool.request().query("SELECT * from LoanRequest")
        return loans
    }
    catch (err) {
        console.log(err);
    }
};

const createLoan = async (loan) => {
    try {
        let pool = await sql.connect(config);
        let loans = pool.request()
            .query(`INSERT INTO LoanRequest VALUES
        (${loan.amount}, ${loan.months}, ${loan.monthly})
        `)
        return loans;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getLoans,
    createLoan
}




