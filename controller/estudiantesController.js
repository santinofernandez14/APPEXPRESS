


const {json}=require('express')

const db=require('../database/conexion')


class estudianteController{
    constructor(){}

    async consultar(req,res){
        try{
           const [rows] = await db.query('SELECT * FROM estudiantes');
            res.status(200).json(rows)
        }catch(err){
            res.status(500).send(err.message);
    }

        
      
    }
       async insertar(req,res){
            
            try{
                const{dni,nombre,apellido,email}=req.body;
              const [result] = await 
              db.query(`INSERT INTO estudiantes(id,dni,nombre,apellido,email) VALUES (NULL,?,?,?,?)`
                ,[dni,nombre,apellido,email]
              );
                    res.status(201).json({id: result.insertId})
                
            }catch(err){
                res.status(500).send(err.message);
    
            }
         
          }
           
        

       async modificar(req,res){
            
            try{
                const {id}=req.params;
                const{dni,nombre,apellido,email}=req.body;
                const [result] = await db.query(`UPDATE estudiantes SET dni=?, nombre=? , apellido=? , email=? WHERE id=?` ,
                    [dni,nombre,apellido,email,id]
                );
                    if(result.affectedRows === 1){
                        res.status(200).json({resultado:'Estudiante modificado'})
                   
                       
                    }else{
                        res.status(404).send('Estudiante no encontrado')
                    }
                }catch(err){
                res.status(500).send(err.message);
    
            }
        }

       

       async consultarUno(req,res){
           
            try{
                const {id}= req.params;
               const [rows] = await db.query('Select * FROM estudiantes WHERE id=?', [id]);
               if(rows.length>0){
                res.status(200).json(rows[0])
            }else{
                res.status(404).send('Estudiante no encontrado');
            }
               
            }catch(err){
                res.status(500).send(err.message);
    
            }
          
        }

       async borrar(req, res) {
           
            try {
                const { id } = req.params;
               const [result] = await db.query('DELETE FROM estudiantes WHERE id = ?', [id]);
                    if (result.affectedRows === 1) {
                        res.status(200).json({ resultado: 'Estudiante borrado' });
                    }else{
                        res.status(404).send('Estudiante no encontrado')
                    }
                
            } catch (err) {
                res.status(500).send(err.message);
            }
        }
        
        
}


module.exports=new estudianteController();

