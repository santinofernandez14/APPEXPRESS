const {json}=require('express')

const db=require('../database/conexion')


class cursoController{
    constructor(){}

    async consultar(req,res){
        try{
           const [rows] = await db.query('SELECT * FROM cursos');
            res.status(200).json(rows)
        }catch(err){
            res.status(500).send(err.message);
    }

        
      
    }
       async insertar(req,res){
            
      
        const conn = await db.getConnection();
        const {nombre,descripcion,profesor_id} = req.body;
            try {
             await conn.beginTransaction();
              const [profRes] = await conn.query('SELECT COUNT(*) AS cant FROM profesores WHERE id=?',[profesor_id])
              if(profRes[0].cant===0){
                //await conn.rollback();
                return res.status(400).json({mens: 'El profesor no existe'})
              }
              const [InsertRes] = await conn.query('INSERT INTO cursos(id,nombre,descripcion,profesor_id) VALUES (NULL,?,?,?) ', [nombre, descripcion, profesor_id]);
              if(InsertRes.affectedRows===1){
                await conn.commit();
                res.status(200).json({id: InsertRes.insertId});
              }else{
               await conn.rollback();
               res.status(404).json({mens: 'El curso no pudo ser insertado'}); 
              } 
            } catch (err) {
                res.status(500).send(err.message);
            }
            finally{
                conn.release();
            }
         
          }
           
        

          async modificar(req, res) {
            const conn = await db.getConnection();
            const { id } = req.params;
            try {
                // Iniciar transacción
                await conn.beginTransaction();
        
                const { nombre, descripcion, profesor_id } = req.body;
        
                
                const [profRes] = await conn.query('SELECT COUNT(*) AS cant FROM profesores WHERE id=?', [profesor_id]);
                if (profRes[0].cant === 0) {
                    await conn.rollback();
                    return res.status(400).json({ mens: 'El profesor no existe' });
                }
        
                
                const [result] = await conn.query(
                    `UPDATE cursos SET nombre=?, descripcion=?, profesor_id=? WHERE id=?`,
                    [nombre, descripcion, profesor_id, id]
                );
        
                if (result.affectedRows === 1) {
                    await conn.commit(); 
                    res.status(200).json({ res: 'Curso modificado' });
                } else {
                    await conn.rollback();
                    res.status(404).json({ res: 'Curso no encontrado' });
                }
            } catch (err) {
                await conn.rollback();
                res.status(500).send(err.message);
            } finally {
                conn.release(); 
            }
        }
        

       

       async consultarUno(req,res){
           
            try{
                const {id}= req.params;
               const [rows] = await db.query('Select * FROM cursos WHERE id=?', [id]);
               if(rows.length>0){
                res.status(200).json(rows[0])
            }else{
                res.status(404).send('Profesor no encontrado');
            }
               
            }catch(err){
                res.status(500).send(err.message);
    
            }
          
        }

       async borrar(req, res) {
        const { id } = req.params;
        try{
            const [deleteRes] = await db.query(`DELETE FROM cursos WHERE id=?`,[id])
            if(deleteRes.affectedRows===1){
                res.status(200).json({mens: 'Curso borrado'});
            }else{
                res.status(400).jspn({mens: 'Curso no existe'})
            }
        }catch(err){
            res.status(500).send(err.message);
        }
        
}
}


module.exports=new cursoController();

