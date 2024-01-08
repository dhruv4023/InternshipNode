require("./connDb")
const userColl = require("./UserModel")
const addUserData = async (name, email) => {

    const userdata = new userColl({

        name: name,
        email: email,
    })
    const res = await userdata.save();
    console.log(res)
}

addUserData("abc", "abc@mail.com")