// const usersDB={
//     users:require('../models/users.json'),
//     SetUsers:function(data){this.users=data}
// }
// const fsPromises=require(`fs`).promises;
// const path=require(`path`);
// const bcrypt=require(`bcrypt`);
// const handleNewUser=async(req,res)=>
// {
//     const{user,pwd}=req.body;
//     if(!user||!pwd) return res.status(400).json({'message':'Username and password are required.'});
//     // check for duplicate usernames in the db
//     const duplicate=usersDB.users.find(person=>person.username===user);
//     if(duplicate) return res.sendStatus(409);
//     try{
//         //encrypt the password
//         const hashedPwd=await bcrypt.hash(pwd,10);
//         //create and store the new user
//         const newUser={
//             "username":user,
//             "roles":{"User": 2001},
//             "password":hashedPwd};
//         usersDB.SetUsers([...usersDB.users,newUser]);
//         await fsPromises.writeFile(path.join(__dirname,'..',`models`,`users.json`),JSON.stringify(usersDB.users));
//         console.log(newUser);
//         res.status(201).json({'success':`New user ${user} created!`});
//     }
//     catch(err)
//     {
//         res.status(500).json({'message':err.message});
//     }
// }
// module.exports={handleNewUser}
const User = require("../models/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    //create and store the new user
    const result = await User.create({
      username: user,
      password: hashedPwd,
    });

    console.log(result);

    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
