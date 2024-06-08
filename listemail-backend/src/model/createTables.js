import connection from "../dbConfig.js";

const createAdminPaygizmoLoginsTable = `
  CREATE TABLE IF NOT EXISTS paygizmologins (
    EMAILADDRESS varchar(200) NOT NULL DEFAULT '',
    PASSWORD varchar(200) DEFAULT '',
    ADDRESS longtext,
    TENANT varchar(200) DEFAULT 'gridironjobs.com',
    FULLNAME varchar(200) DEFAULT '',
    CURRENCY varchar(200) DEFAULT '',
    COUNTRY varchar(200) DEFAULT '',
    SESSIONCOOKIE varchar(200) DEFAULT '',
    LOGINSOURCE varchar(200) DEFAULT '',
    KYC varchar(200) DEFAULT '',
    ACCOUNTNAME varchar(200) DEFAULT '',
    ACCOUNTNUMBER varchar(200) DEFAULT '',
    SORTCODEBANKCODE varchar(200) DEFAULT '',
    SWIFT varchar(200) DEFAULT '',
    BANKCOUNTRY varchar(200) DEFAULT '',
    BANKNAME varchar(200) DEFAULT '',
    IBAN varchar(200) DEFAULT '',
    BANKADDRESS varchar(200) DEFAULT '',
    DESCRIPTION varchar(200) DEFAULT '',
    WEBSESSION varchar(200) DEFAULT '',
    EPOCH varchar(200) DEFAULT '',
    UUID varchar(200) DEFAULT '',
    REFERREDBY varchar(200) DEFAULT '',
    JOBCATEGORY varchar(200) DEFAULT '',
    DATECREATED varchar(200) DEFAULT '',
    LASTLOGIN varchar(200) DEFAULT '',
    POSITION varchar(200) DEFAULT '',
    YEARSEXPERIENCE varchar(200) DEFAULT '',
    LINKEDINID varchar(200) DEFAULT '',
    WALLETID varchar(200) DEFAULT '',
    PAYMENTLINKS varchar(200) DEFAULT '',
    DISTROLINKS varchar(200) DEFAULT '',
    PLATFORMS varchar(200) DEFAULT '',
    ROLE varchar(200) DEFAULT '',
    SKILLS longtext,
    PRIMARY KEY (EMAILADDRESS)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`;

const createPaygizmosesTable = `
  CREATE TABLE IF NOT EXISTS paygizmoseshtml (
    ID varchar(200) DEFAULT '',
    EMAILADDRESS varchar(200) DEFAULT '',
    CURRENCY varchar(200) DEFAULT '',
    AMOUNT varchar(200) DEFAULT '',
    TARGETCURRENCY varchar(200) DEFAULT '',
    TARGETAMOUNT varchar(200) DEFAULT '',
    DATETIMESTAMPID varchar(200) NOT NULL,
    STATUS varchar(200) DEFAULT '',
    TRANSACTIONTYPE varchar(200) DEFAULT '',
    TRANSACTION varchar(200) DEFAULT '',
    RECIPIENT varchar(200) DEFAULT '',
    DATE varchar(200) DEFAULT '',
    EMAILTEMPLATE longtext,
    DOMAIN varchar(200) DEFAULT 'ega-tech.co',
    PRIMARY KEY (DATETIMESTAMPID)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`;

const createTables = () => {
        connection.query(
            createAdminPaygizmoLoginsTable, 
            (err, results, fields) => {
                if(err){
                    console.error('Error creating paygizmologins table:', err.message);
                }else{
                    console.log('paygizmologins table checked/created successfully');
                }
        });
        connection.query(
          createPaygizmosesTable, 
          (err, results, fields) => {
                if(err){
                    console.error('Error creating paygizmoseshtml table:', err.message);
                } else {
                    console.log('paygizmoseshtml table checked/created successfully');
                }
        });
};

export default createTables;
