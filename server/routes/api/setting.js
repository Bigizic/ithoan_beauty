const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const Product = require('../../models/product');
const Banners = require('../../models/banner');
const Category = require('../../models/category');
const Brand = require('../../models/brand');
const Merchant = require('../../models/merchant');
const Setting = require('../../models/settings');

const auth = require('../../middleware/auth');
const { ROLES } = require('../../constants');
const role = require('../../middleware/role');


// return setting
router.get('/', auth, role.check(ROLES.Admin), async (req, res) => {
    try {
        const setting = await Setting.find({ _id: "settings" })
        if (setting.length > 0) {
            return res.status(200).json({
                success: true,
                setting
            })
        } else {
            return res.status(201).json({
                success: false,
                setting: []
            })
        }
    } catch (error) {
        return res.status(400).json({
            error: 'error fetching setting'
        });
    }
})


// return settting for user
router.get('/user', async (req, res) => {
    try {
        const setting = await Setting.find({ _id: "settings" })
        return res.status(200).json({
            success: true,
            setting
        })
    } catch (error) {
        return res.status(400).json({
            error: 'error fetching setting'
        });
    }
})

// update setting
router.put('/', auth, role.check(ROLES.Admin), async (req, res) => {
    try {
        const { settings, text, website_info, website_info_set, set } = req.body;
        if (set) {
            const setting = await Setting.findByIdAndUpdate({ _id: "settings" },
                { $set: { websiteInfo: website_info, websiteInfoStatus: website_info_set} }
            )
            return res.status(200).json({
                success: true,
                message: "successfully updated header message"
            })
        } else {
            // maintenance mode on or off
            const setting = await Setting.findByIdAndUpdate({ _id: "settings" },
                { $set: { isMaintenanceMode: settings, maintenanceText: text } }
            )
            // update fields
            const turnOnAndOff = await changeModelStatus(!settings)
            if (turnOnAndOff) {
                return res.status(200).json({
                    success: true,
                    message: settings ? "Maintenance mode on" : "Maintenance mode off"
                })
            }
        }
    } catch (error) {
        return res.status(400).json({
            error: 'error updating setting'
        });
    }
})

// create setting if not exist
router.post('/', auth, role.check(ROLES.Admin), async (req, res) => {
    try {
        const { settings } = req.body;
        if (settings === false) {
            // maintenance mode off
            const setting = new Setting({
                _id: "settings",
                isMaintenanceMode: false
            })
            await setting.save()
            return res.status(200).json({
                success: true,
                setting
            })
        }
    } catch (error) {
        return res.status(400).json({
            error: 'error creating setting'
        });
    }
})

/*const changeModelStatus = async(status) => {
    const bannerModel = await Banners.updateMany({}, { $set: { isActive: status } });
    const categoryModel = await Category.updateMany({}, { $set: { isActive: status } });
    const productModel = await Product.updateMany({}, { $set: { isActive: status } });
    if (bannerModel && categoryModel && productModel) { return true }
    return false
}*/

const changeModelStatus = (status) => {
    const bannerModel = true;
    const categoryModel = true;
    const productModel = true;
    if (bannerModel && categoryModel && productModel) { return true }
    return false
}

module.exports = router;
