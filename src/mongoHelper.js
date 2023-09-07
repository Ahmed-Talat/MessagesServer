const { ObjectId } = require('mongodb');

function generateSort(sortorder, sortdirection) {
    let sort = {};
    if (sortorder) {
        sort[`NAXMLMobile.${sortorder}`] = sortdirection === 'asc' ? 1 : -1;
    };
    return sort;
}
exports.generateSort = generateSort;

// function generateFilters(id, umti, merchantid, begintime, endtime) {
//     let filters = {};
//     if (id) {
//         filters._id = new ObjectId(id);
//     }
//     if (umti) {
//         filters['NAXMLMobile.MobileTxnInfo.UMTI'] = umti;
//     }
//     if (merchantid) {
//         filters['NAXMLMobile.MobileTxnInfo.MerchantID'] = merchantid;
//     }
//     if (begintime) {
//         filters['NAXMLMobile.MobileTxnInfo.TimeDateStamp'] = { $gte: new Date(begintime) };
//     }
//     if (endtime) {
//         filters['NAXMLMobile.MobileTxnInfo.TimeDateStamp'] = { $lte: new Date(endtime) };
//     }
//     return filters;
// }

function generateFilters(id, type, umti, merchantId, begintime, endtime) {
    let filters = {};
    if (id) {
        filters._id = new ObjectId(id);
    }
    if (type) {
        filters['NAXMLMobile.type'] = type;
    }
    if (umti) {
        filters['NAXMLMobile.umti'] = umti;
    }
    if (merchantId) {
        filters['NAXMLMobile.merchantId'] = merchantId;
    }
    if (begintime && endtime) {
        filters['NAXMLMobile.timestamp'] = {
            $gte: new Date(begintime).toISOString(),
            $lte: new Date(endtime).toISOString()
        };
    } else if (begintime) {
        filters['NAXMLMobile.timestamp'] = { $gte: new Date(begintime).toISOString() };
    } else if (endtime) {
        filters['NAXMLMobile.timestamp'] = { $lte: new Date(endtime).toISOString() };
    }
    return filters;
}
exports.generateFilters = generateFilters;
