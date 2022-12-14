class CircleDao{
    async checkCircle(connection,info){
        const searchquery=`
                           SELECT * 
                           FROM Circle
                           WHERE IF( ? !="",name=?,name=name) AND IF (? != 999,interest_id=?,interest_id=interest_id) AND IF(? != 999,area_id=?,area_id=area_id) AND IF(? !=999,sex=?,sex=sex);`;
        const searchrow=await connection.query(
            searchquery,
            info
        );
        return searchrow;
    }
    async insertCircle(connection,info){
        const insertquery=`INSERT INTO Circle(name,area_id,interest_id,sex,caution,max_num,prime,cur_num,intro,circlepic,leader_email)
                           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
        await connection.query(
            insertquery,
            info
        );
        
    }
    async findname(connection,name){
        const searchquery=` SELECT *
                            FROM Circle
                            WHERE name=?;`;
        const re=await connection.query(
            searchquery,
            name
        );
        return re;
    }
    async findid(connection,id){
        const searchquery=` SELECT *
                            FROM Circle
                            WHERE id=?;`;
        const re=await connection.query(
            searchquery,
            id
        );
        return re;
    }
    async userCircle(connection,id){
        const searchquery= `SELECT name,circlepic,id
                            FROM Circle
                            WHERE id IN(?);`;
        const re=await connection.query(
            searchquery,
            [id]
        );
        return re;
    }

    async newid(connection){
        const searchquery=`SELECT id
                           FROM Circle
                           ORDER BY id DESC
                           LIMIT 1;`;
        const re=await connection.query(
            searchquery
        );

        return re;
    }

    async updateimage(connection,vec){
        const updatequery=`INSERT INTO Circle_gallery(pic_url,circle_id)
                            VALUES(?,?);`;

        await connection.query(
            updatequery,
            vec
        );
    }

    async getpicture(connection,ID){
        const getquery=`SELECT pic_url
                        FROM Circle_gallery
                        WHERE circle_id=?;`;
        
        const pictures=await connection.query(
            getquery,
            ID
        );
        
        return pictures;
    }

    async gettodo(connection,ID){
        const getquery=`SELECT date,schedule
                        FROM Schedule_calendar
                        WHERE circle_id=?;`;
        
        const result=await connection.query(
            getquery,
            ID
        )

        return result;
    }

    async updateboard(connection,vec){
        const insertquery=`INSERT INTO Circle_board(circle_id,title,content,writer,writedate)
                            VALUES (?,?,?,?,?);`;
        
        await connection.query(
            insertquery,
            vec
        );
    }

    async updatecalender(connection,vec){
        const insertquery=`INSERT INTO Schedule_calendar(circle_id,date,schedule)
                            VALUES(?,?,?);`;
        
        await connection.query(
            insertquery,
            vec
        );
    }

    async getboard(connection,ID){
        const getquery=`SELECT *
                        FROM Circle_board
                        WHERE circle_id=?;`;
        const re=await connection.query(
          getquery,
          ID
        );
        
        return re;
      }

    async getcomment(connection,board_id){
        const getquery=`SELECT *
                        FROM Board_comment
                        WHERE board_id in (?);`;
        
        const re=await connection.query(
            getquery,
            [board_id]
        );

        return re;
    }

    async insertcomment(connection,vec){
        const insertquery=`INSERT INTO Board_comment(board_id,content,nickname)
                            VALUES(?,?,?);`;
        
        await connection.query(
            insertquery,
            vec
        );
    }

    async updatecur(connection,ID){
        const updatequery=`UPDATE Circle
                            SET cur_num=cur_num+1
                            WHERE id=?;`;
        
        await connection.query(
            updatequery,
            ID
        );
    }

}

export default new CircleDao();