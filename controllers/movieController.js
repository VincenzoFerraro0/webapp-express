import connection from '../data/db.js'

function index(req, res) {
    const sql = "SELECT * FROM movies";
    
    connection.query(sql, (err, results) => {
        if(err)
            return res.status(500).json({
                error: 'errore lato server INDEX function'
        });

        res.json(results)
    });
}
function show(req, res) {
    
}
function destroy(req, res) {
    
}

export {
    index,
    show,
    destroy
}