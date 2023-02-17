const { User } = require("../models/user.model");

const seedSuperAdmin = async () => {
    const superAdmin = await User.findOne({ email: "superadminnelson@gmail.com",
    });
    
    if (superAdmin) {
        return console.log("Admin super admin already created");
        
    }
        seededAdmin = await User({
            isAdmin: true,
            password: process.env.ADMINPASSWORD,
            username: process.env.SUPERADMINUSERNAME,
            email: process.env.SUPERADMINEMAIL,
            fullName: process.env.SUPERADMINFULLNAME,
            phone: "String",
            
        });
    
    seededAdmin.save();
        console.log("Super Admin created with email" + seededAdmin.toJSON().email);
        return seededAdmin
};

seedSuperAdmin();

module.exports = { seedSuperAdmin, };