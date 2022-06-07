const config = require('./dbConfig'),
    sql = require('mssql');

const getLoans = async () => {
    try {
        let pool = await sql.connect(config);
        let loans = await pool.request().query("SELECT * from LoanRequest")
        return loans.recordset
    } 
        catch (err) {
        console.log(err);
    }
};



module.exports = {
    getLoans
}




