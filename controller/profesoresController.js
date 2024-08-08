const {json}=require('express')

const db=require('../database/conexion')


class profesorController{
    constructor(){}

    async consultar(req,res){
        try{
           const [rows] = await db.query('SELECT * FROM profesores');
            res.status(200).json(rows)
        }catch(err){
            res.status(500).send(err.message);
    }

        
      
    }
       async insertar(req,res){
            
            try{
                const{dni,nombre,apellido,email,profesion,telefono}=req.body;
              const [result] = await 
              db.query(`INSERT INTO profesores(id,dni,nombre,apellido,email,profesion,telefono) VALUES (NULL,?,?,?,?,?,?)`
                ,[dni,nombre,apellido,email,profesion,telefono]
              );
                    res.status(201).json({id: result.insertId})
                
            }catch(err){
                res.status(500).send(err.message);
    
            }
         
          }
           
        

       async modificar(req,res){
            
            try{
                const {id}=req.params;
                const{dni,nombre,apellido,email,profesion,telefono}=req.body;
                const [result] = await db.query(`UPDATE profesores SET dni=?, nombre=? , apellido=? , email=? , profesion=? , telefono=? WHERE id=?` ,
                    [dni,nombre,apellido,email,profesion,telefono,id]
                );
                    if(result.affectedRows === 1){
                        res.status(200).json({resultado:'Profesor modificado'})
                   
                       
                    }else{
                        res.status(404).send('Profesor no encontrado')
                    }
                }catch(err){
                res.status(500).send(err.message);
    
            }
        }

       

       async consultarUno(req,res){
           
            try{
                const {id}= req.params;
               const [rows] = await db.query('Select * FROM profesores WHERE id=?', [id]);
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
        const conn = await db.getConnection();
            try {
               
              await conn.beginTransaction();
              const [cursosRes] = await conn.query('SELECT COUNT(*) AS cant FROM cursos WHERE profesor_id=?',[id])
              if(cursosRes[0].cant >0){
                //await conn.rollback();
                return res.status(400).json({mens: 'El profesor tiene cursos asignados'})
              }
              const [deleteRes] = await conn.query('DELETE FROM profesores WHERE id=?', [id]);
              if(deleteRes.affectedRows===1){
                await conn.commit();
                res.status(200).json({mens: 'El profesor fue borrado'});
              }else{
               await conn.rollback();
               res.status(404).json({mens: 'El profesor no pudo ser borrado'}); 
              } 
            } catch (err) {
                res.status(500).send(err.message);
            }
            finally{
                conn.release();
            }
        }
        
        
}


module.exports=new profesorController();

