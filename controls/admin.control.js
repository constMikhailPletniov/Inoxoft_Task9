const { statusEnum, userRoleEnum } = require('../config');
const { SuperAdmin } = require('../database');
const { pasService } = require('../services');
module.exports = {
    createSuperAdmin: async ({ name, email = statusEnum.EMAIL, role, password = statusEnum.EMAIL_PASSWORD }, req, res, next) => {
        try {
            const admin = await SuperAdmin.create({
                name,
                email: statusEnum.EMAIL,
                role,
                password: statusEnum.EMAIL_PASSWORD
            });

            const passHash = await pasService.hash(admin.password);

            await SuperAdmin.findByIdAndUpdate(admin._id, {
                password: passHash
            });

            res.status(statusEnum.OK).json('Create SuperAdmin');
        } catch (err) {
            next(err);
        }
    },
    checkSuperAdmin: async (req, res, next) => {

        const superAdmin = await SuperAdmin.findOne({ role: userRoleEnum.SUPER_ADMIN });

        if (!superAdmin) {
            await createSuperAdmin({
                name: statusEnum.SUPER_ADMIN_NAME,
                email: statusEnum.EMAIL,
                role: userRoleEnum.SUPER_ADMIN,
                password: statusEnum.EMAIL_PASSWORD
            });
        }
    }
}
