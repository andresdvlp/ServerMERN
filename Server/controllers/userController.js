const User = require("../models/user");
const bcrypt = require("bcryptjs");
const image = require("../utils/image");


async function getMe(req, res) {
  const { user_id } = req.user; // req.user viene del middleware

  const response = await User.findById(user_id); // aqui busca usuario por id, en sentencia NoSQL

  if (!response) {
    res.status(400).send({ msg: "User not found" });
  } else {
    res.status(200).send(response); // en response me muestra los resultados de la busqueda que puse mas arriba
  }
}

async function getUsers(req, res) {

  const { active } = req.query;

  let response = null

  if (active === undefined) {
    response = await User.find();
  } else {
    response = await User.find({ active });
  }


  res.status(200).send(response);
}

function createUser(req, res) {
  const { password } = req.body;
  const user = new User({ ...req.body, active: false });

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  user.password = hashPassword;



  if (req.files.avatar) {
    const imagePath = image.getFilePath(req.files.avatar);
    user.avatar = imagePath;
  }


  user.save((error, userStorage) => {
    if (error) {
      res.status(400).send({ msg: "Error creating user" });
    } else {
      res.status(200).send(userStorage);
    }
  });
}

function updateUser(req, res) {
  const { id } = req.params;
  const userData = req.body;

  //Password Update 

  if (userData.password) {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(userData.password);
    userData.password = hashPassword;
  } else {
    delete userData.password;
  }
  //Avatar
  if (req.files.avatar) {
    const imagePath = image.getFilePath(req.files.avatar);
    userData.avatar = imagePath;
  }

  User.findByIdAndUpdate({ _id: id }, userData, (error) => {
    if (error) {
      res.status(400).send({ msg: "Failed to update user" });
    } else {
      res.status(200).send({ msg: "User updated successfully" });
    }
  });
}

function deleteUser(req, res) {
  const { id } = req.params

  User.findByIdAndDelete(id,(error)=>{
    if(error){
      res.status(400).send({msg:"Failed to delete user"});
    }else{
      res.status(200).send({msg:"User delete successfully"});
    }
  });
}



    module.exports = {
      getMe,
      getUsers,
      createUser,
      updateUser,
      deleteUser
    };