//유저 정보 조회
class userDao{
  //아이디를통한 유저정보 조회
  async selectUserpage(connection,ID){
      const selectUserIDQuery=`SELECT user_id,nickname,circle,image_url,badge_id,interest_id
                               FROM User
                               WHERE email=?;`;
      const infoRows=await connection.query(selectUserIDQuery,ID);
      return infoRows;
  }
  
//ID유무 확인
async selectUserID(connection,ID){
    console.log(ID);
    const selectUserIDQuery=`SELECT email FROM User WHERE email = ?;`;
    const IDRows=await connection.query(selectUserIDQuery,ID);
    return IDRows;
}
//유저 생성
async insertUserInfo (connection,ID,hashedPW,usernickname,inte) {
  try{
      const insertUserInfoQuery = 'INSERT INTO User (email , password, nickname,interest_id) VALUES (?,?,?,?);';
      const value=[ID,hashedPW,usernickname,inte]
      connection.query(
        insertUserInfoQuery,
        value
      );
      return (ID);
    }
  catch(err){
    console.log(err);
    return(0);
    }
  }
  //비밀번호 확인
async selectUserPassword(connection,ID,PW) {
    const selectUserPasswordQuery = 'SELECT password FROM User WHERE email = ? and password =?;';
    const selectUserPassword = await connection.query(
        selectUserPasswordQuery,
        [ID,PW]
    );
  
    return selectUserPassword;
  }
  //유저정보 업데이트
  async updateUserInfo (connection,ver){
    try{
      const updateUserInfoQuery=`
          UPDATE User
          SET nickname=?
          WHERE user_id=?; 
      `;
      await connection.query(
        updateUserInfoQuery,
        ver
      );
      return(1);
    }
    catch(err){
      console.log(err);
      return(0);
    }
  }
  //유저의 email을 통한 id 추출
  async user_id(connection,email){
    try{
      const useridquery=`
          SELECT id
          FROM User
          WHERE email=?;`;
      const user_id=await connection.query(
        useridquery,
        email
      );
      return user_id;
    }
    catch(err){
      console.log(err);
    }
  }
  //유저의 뱃지 추출
  async selectbadge(connection,badge_id){
    try{
      
      const badgequery=`
          SELECT url
          FROM Badge
          WHERE id in (?)`;
      const row=await connection.query(
        badgequery,
        [badge_id]
      );

      return row;  
    }
    catch(err){
      console.log(err);
    }
   
    }
    async getattendday(connection,user_id){
      try{
        const getquery=`SELECT date
                        FROM Attendence_calender
                        WHERE user_id=?;`;
        const re=connection.query(
          getquery,
          user_id
        );

        return re;
      }
      catch(err){
        console.log(err);
      }
    }
    
    async getnickname(connection,ID){
      try{
        const getquery=`SELECT nickname
                        FROM User
                        WHERE email=?;`;
        const re=connection.query(
          getquery,
          ID
        );
        return re;
      }
      catch(e){
        console.log(e);
      }
    }

    async getimage(connection,ID){
      try{
        const getquery=`SELECT image_url
                        FROM User
                        WHERE user_id=?;`;
        const re=connection.query(
          getquery,
          ID
        );
        return re;
      }
      catch(e){
        console.log(e);
      }
    }
    
    async insertimage(connection,ID,image){
      const vec=[image,ID];
      const insertquery=`UPDATE User
                         SET image_url=?
                         WHERE user_id =?;`;
      await connection.query(insertquery,vec);
    }

    async circleupdate(connection,email,circle_id){
      try{
        const vec=[circle_id,circle_id,email];
        const updatequery=`UPDATE User
                           SET circle=IF(circle IS NULL, ?, CONCAT(circle,',',?))
                           WHERE email=?;`;
        await connection.query(
          updatequery,
          vec
        );
      }
      catch(e){
        console.log(e);
      }
    }

  }
export default new userDao;


