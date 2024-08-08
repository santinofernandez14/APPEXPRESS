const {json}=require('express')

const db=require('../database/conexion')


class inscripcionController{
    async inscribir(req,res){
        const conn = await db.getConnection();
        const {curso_id,estudiante_id,nota} = req.body;
            try {
             await conn.beginTransaction();
              const [estRes] = await conn.query('SELECT COUNT(*) AS cant FROM estudiantes WHERE id=?',[estudiante_id])
              if(estRes[0].cant===0){
                //await conn.rollback();
                return res.status(400).json({mens: 'El estudiante no existe'})
              }

              const [curRes] = await conn.query('SELECT COUNT(*) AS cant FROM cursos WHERE id=?',[curso_id])
              if(curRes[0].cant===0){
                //await conn.rollback();
                return res.status(400).json({mens: 'El curso no existe'})
              }
              const [InsertRes] = await conn.query('INSERT INTO cursos_estudiantes(curso_id , estudiante_id , nota) VALUES (?,?,?) ', [curso_id , estudiante_id , nota]);
              if(InsertRes.affectedRows===1){
                await conn.commit();
                res.status(200).json({mens: 'Estudiante inscripto en el curso'});
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


    async consultarTodos(req, res) {
        try {
            const [rows] = await db.query(`
                SELECT estudiantes.nombre AS estudiante, cursos.nombre AS curso
                FROM cursos_estudiantes 
                INNER JOIN cursos ON cursos_estudiantes.curso_id = cursos.id
                INNER JOIN estudiantes ON cursos_estudiantes.estudiante_id = estudiantes.id
            `);
            res.status(200).json(rows);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
    
    async consultarxCurso(req, res) {
        const { id } = req.params;
        try {
            const [rows] = await db.query(`
                SELECT estudiantes.nombre AS estudiante, cursos.nombre AS curso
                FROM cursos_estudiantes 
                INNER JOIN cursos ON cursos_estudiantes.curso_id = cursos.id
                INNER JOIN estudiantes ON cursos_estudiantes.estudiante_id = estudiantes.id
                WHERE cursos.id = ?
            `, [id]);
            res.status(200).json(rows);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
    

    async consultarxEstudiante(req, res) {
        const { id } = req.params;
        try {
            const [rows] = await db.query(`
                SELECT estudiantes.nombre AS estudiante, cursos.nombre AS curso
                FROM cursos_estudiantes 
                INNER JOIN cursos ON cursos_estudiantes.curso_id = cursos.id
                INNER JOIN estudiantes ON cursos_estudiantes.estudiante_id = estudiantes.id
                WHERE estudiantes.id = ?
            `, [id]);
            res.status(200).json(rows);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
    



    
}

module.exports=new inscripcionController();