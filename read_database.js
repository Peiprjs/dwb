const Database = require("@replit/database")
const db = new Database()
console.log ("/!\\ This will delete everything in the database");
console.log(db.list().then(keys => {}));