const Joi = require('joi');
const JoiMongooseObjectId = require("joi-objectid")(Joi);
const { JoiPassword } = require("joi-password");

let expirience = Joi.object().keys({
  company_name: Joi.string().required(),
  start_date: Joi.date().required(),
  end_date: Joi.date().required(),
  job_role: Joi.string().required(),
  address: Joi.string().required(),
});
let education = Joi.object().keys({
  qualification: Joi.string().required(),
  schoolName: Joi.string().required(),
  percentage: Joi.string().required(),
});

const updateUser = Joi.object()
  .keys({
    email: Joi.string().min(3).max(150).email().required(),
    firstName: Joi.string().alphanum().min(3).max(30).required(),
    lastName: Joi.string().alphanum().min(3).max(30).required(),
    mobileNumber: Joi.string()
      .pattern(/^[0-9]+$/)
      .min(10)
      .required(),
    gender: Joi.string().required(),
    personalInfo: {
      fatherFullName: Joi.string().required(),
      motherFullName: Joi.string().required(),
      aadharNumber: Joi.number().integer().required(),
      panNumber: Joi.string().required(),
      isMarried: Joi.string().allow(""),
      marriageDate: Joi.string().allow(""),
      permenentAddress: {
        line1: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        country: Joi.string().required(),
        pincode: Joi.string().required(),
      },
      bankInfo: {
        accountHolderName: Joi.string().required(),
        bankName: Joi.string().required(),
        bankIfsc: Joi.string().required(),
        accountNumber: Joi.number().integer().required(),
      },
      emergencyInfo: {
        personName: Joi.string().required(),
        contactNumber: Joi.string()
          .pattern(/^[0-9]+$/)
          .min(10)
          .required(),
      },
      educationQualification: Joi.array().items(education),
      work_experience: Joi.array().items(expirience),
    },
    params: {
      _id: Joi.string().required()
    }

  });
const createUser = Joi.object()
  .keys({
    email: Joi.string().min(3).max(150).email().required(),
    orgId: JoiMongooseObjectId().required(),
    password: JoiPassword.string()
      .min(6)
      .minOfSpecialCharacters(1)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .noWhiteSpaces()
      .required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().trim().required(),
    mobileNumber: Joi.number().integer().required(),
    gender: Joi.string().required(),
    userType: JoiMongooseObjectId().required(),
  });
const updateUserSignupData = Joi.object()
  .keys({
    email: Joi.string().min(3).max(150).email().required(),
    password: Joi.string().allow(""),
    firstName: Joi.string().required(),
    lastName: Joi.string().trim().required(),
    mobileNumber: Joi.number().integer().required(),
    gender: Joi.string().required(),
    userType: JoiMongooseObjectId().required(),
  });
const createOrganization = Joi.object()
  .keys({
    name: Joi.string().required(),
    address: {
      line1: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      country: Joi.string().required(),
      pincode: Joi.string().required(),
    },
  });
const listOrgId = Joi.object()
  .keys({
    orgId: JoiMongooseObjectId().required()
  });
const createUserRole = Joi.object()
  .keys({
    userRoleName: Joi.string().required(),
    description: Joi.string().allow(""),
  });
const createHoliday = Joi.object()
  .keys({
    orgId: JoiMongooseObjectId().required(),
    date: Joi.date().required(),
    title: Joi.string().required(),
    description: Joi.string().allow(""),
    backgroundColor: Joi.string().allow("")
  });
const updateHoliday = Joi.object()
  .keys({
    date: Joi.date().required(),
    title: Joi.string().required(),
    description: Joi.string().allow(""),
    backgroundColor: Joi.string().allow("")
  });
const forgatePasswordVerify = Joi.object()
  .keys({
    email: Joi.string().min(3).max(150).email().required(),
    password: Joi.string().required(),
    otp: Joi.number().required()
  });
const sendOTPVerify = Joi.object()
  .keys({
    email: Joi.string().min(3).max(150).email().required(),
  });
const loginVerify = Joi.object()
  .keys({
    email: Joi.string().min(3).max(150).email().required(),
    password: Joi.string().required(),
  });
const passwordUpdate = Joi.object()
  .keys({
    email: Joi.string().min(3).max(150).email().required(),
    oldPassword: Joi.string().required(),
    newPassword: JoiPassword.string()
      .min(6)
      .minOfSpecialCharacters(1)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .noWhiteSpaces()
      .required()
  });
const userCheckInUpdateVerify = Joi.object()
  .keys({
    checkdDate: Joi.date().required(),
    updateDate: Joi.date().required(),
  });
const createUserLeave = Joi.object()
  .keys({
    userId: JoiMongooseObjectId().required(),
    orgId: JoiMongooseObjectId().required(),
    leaveTitle: Joi.string().required(),
    leaveReason: Joi.string().required(),
    leaveStartDate: Joi.date().required(),
    leaveEndDate: Joi.date().required(),
  });

const getAllUserLeave = Joi.object()
  .keys({
    orgId: JoiMongooseObjectId().required()
  });
const userAttendance = Joi.object()
  .keys({
    startDate: Joi.date().required(),
    endDate: Joi.date().required()
  });

const updateUserLeaveValid = Joi.object()
  .keys({
    leaveTitle: Joi.string().required(),
    leaveReason: Joi.string().required(),
    leaveStartDate: Joi.date().required(),
    leaveEndDate: Joi.date().required()
  });

const leaveApproveVerify = Joi.object()
  .keys({
    leaveId: JoiMongooseObjectId().required(),
    approval: Joi.number().required(),
    isApproveBy: JoiMongooseObjectId().required(),
    message: Joi.string().allow("")
  });

const createVerify = Joi.object()
  .keys({
    userId: JoiMongooseObjectId().required(),
    salary: Joi.number().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
  })

const updateSalaryVerify = Joi.object()
  .keys({
    userId: JoiMongooseObjectId().required(),
    salary: Joi.number().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
  })

const createCredential = Joi.object()
  .keys({
    userId: JoiMongooseObjectId().required(),
    credentialMedium: Joi.string().required(),
    projectId: JoiMongooseObjectId().required(),
    credentials: {
      email: Joi.string().min(3).max(150).email().required(),
      password: Joi.string().required(),
    }
  });

const addclient = Joi.object()
  .keys({
    clientName: Joi.string().required(),
  });

const addproject = Joi.object()
  .keys({
    clientId: JoiMongooseObjectId().allow(null),
    projectName: Joi.string().required(),
    projectDetails: Joi.string().required(),
  });


const editproject = Joi.object()
  .keys({
    clientId: JoiMongooseObjectId().allow(null),
    projectName: Joi.string().required(),
    projectDetails: Joi.string().required(),
  });

const projectCataloguevalidate = Joi.object()
  .keys({
    projectId: JoiMongooseObjectId().required(),
    screenTitle: Joi.string().required(),
  });

const tagValidates = Joi.object()
  .keys({
    tagName: Joi.string().required(),
    description: Joi.string().required(),
  });

const toggleValidates = Joi.object()
  .keys({
    userId: JoiMongooseObjectId().required(),
    orgId: JoiMongooseObjectId().required(),
    projectId: JoiMongooseObjectId().required(),
    tagId: JoiMongooseObjectId().required(),
    logDescription: Joi.string().required(),
    startTime: Joi.date().required(),
    endTime: Joi.date().required(),
  });


const updateToggleValidates = Joi.object()
  .keys({
    logDescription: Joi.string().required(),
    startTime: Joi.date().required(),
    endTime: Joi.date().required(),
  });

const userUnlocked = Joi.object()
  .keys({
    userId: JoiMongooseObjectId().required(),
    updateDate: Joi.date().required()
  });
let service = Joi.object().keys({
  type: Joi.string().required(),
  createdAt: Joi.date().required()
});
const userlogsupdates = Joi.object()
  .keys({
    checkdDate: Joi.date().required(),
    logs: Joi.array().items(service)
  });
const passwordChange = Joi.object()
  .keys({
    email: Joi.string().min(3).max(150).email().required(),
    newPassword: JoiPassword.string()
      .min(6)
      .minOfSpecialCharacters(1)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .noWhiteSpaces()
      .required()
  });
const addExtraStaffingValidation = Joi.object()
  .keys({
    userId: JoiMongooseObjectId().required(),
    orgId: JoiMongooseObjectId().required(),
    extraStaffing_Hours: Joi.number().required(),
    description: Joi.string().required(),
    date: Joi.date().required()
  });
const extrastaffingApproveVerify = Joi.object()
  .keys({
    extraStaffingId: JoiMongooseObjectId().required(),
    isApproved: Joi.number().required(),
    isApprovedBy: JoiMongooseObjectId().required(),
    approveMessage: Joi.string().allow("")
  });
const getExtraStaffingValidation = Joi.object()
  .keys({
    orgId: JoiMongooseObjectId().required()
  });
const updateExtraStaffingValidation = Joi.object()
  .keys({
    extraStaffing_Hours: Joi.number().required(),
    description: Joi.string().required(),
    date: Joi.date().required()
  });
module.exports = {
  // POST /api/users
  updateUser,
  updateUserSignupData,
  createUser,
  createOrganization,
  listOrgId,
  createUserRole,
  createHoliday,
  updateHoliday,
  sendOTPVerify,
  forgatePasswordVerify,
  loginVerify,
  passwordUpdate,
  userCheckInUpdateVerify,
  userAttendance,
  createUserLeave,
  getAllUserLeave,
  updateUserLeaveValid,
  leaveApproveVerify,
  createVerify,
  updateSalaryVerify,
  createCredential,
  addclient,
  addproject,
  editproject,
  projectCataloguevalidate,
  tagValidates,
  toggleValidates,
  updateToggleValidates,
  userlogsupdates,
  userUnlocked,
  passwordChange,
  addExtraStaffingValidation,
  extrastaffingApproveVerify,
  getExtraStaffingValidation,
  updateExtraStaffingValidation,


  createCategory: {
    body: {
      name: Joi.string().required()
    }
  },

  updateCategory: {
    body: {
      name: Joi.string().required()
    },
    params: {
      id: Joi.string().required()
    }
  },

  createProduct: {
    body: {
      sku: Joi.string().required(),
      productName: Joi.string().required(),
      description: Joi.string().required(),
      categoryId: Joi.number().integer().required(),
      price: Joi.number().integer().required(),
      inStockCount: Joi.number().integer().required()
    }
  },

  updateProduct: {
    body: {
      sku: Joi.string().required(),
      productName: Joi.string().required(),
      description: Joi.string().required(),
      categoryId: Joi.number().integer().required(),
      price: Joi.number().integer().required(),
      inStockCount: Joi.number().integer().required()
    },
    params: {
      id: Joi.string().required()
    }
  },

  updateProductPriceStock: {
    body: {
      price: Joi.number().integer().required(),
      inStockCount: Joi.number().integer().required()
    },
    params: {
      id: Joi.string().required()
    }
  },

  createRole: {
    body: {
      name: Joi.string().required()
    }
  },

  updateRole: {
    body: {
      name: Joi.string().required()
    },
    params: {
      id: Joi.string().required()
    }
  },

  createDeliveryAddress: {
    body: {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      mobileNumber: Joi.number().integer().required(),
      addressLine1: Joi.string().required(),
      city: Joi.string().required(),
      pinCode: Joi.number().integer().required()
    }
  },

  updateDeliveryAddress: {
    body: {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      mobileNumber: Joi.number().integer().required(),
      addressLine1: Joi.string().required(),
      city: Joi.number().integer().required(),
      pinCode: Joi.number().integer().required()
    }
  },
  createOrder: {
    body: {
      // products: Joi.array().items([Joi.object().keys({
      //   productId: Joi.number().integer().required(),
      //   quantity: Joi.number().integer().required()
      // })]).min(1).required(),
      // transactionId: Joi.number().integer().required()
    }
  },

  updateOrder: {
    body: {
      products: Joi.array().items(Joi.object().keys({
        productId: Joi.number().integer().required(),
        quantity: Joi.number().integer().required()
      })).min(1).required()
    },
    params: {
      id: Joi.number().integer().required()
    }
  },

  cancelOrder: {
    body: {
      cancelReason: Joi.string().required()
    }
  },
  cartValidation: {
    params: {
      // instanceId: Joi.string().required()
    }
  },
  checkAllSessionDetails: {
    body: {
      // instanceId: Joi.string().required(),
      productId: Joi.number().integer().required(),
      quantity: Joi.number().integer().required()
    }
  },
  updateSessionValidateData: {
    body: {
      // instanceId: Joi.string().required(),
      productId: Joi.number().integer().required()
    }
  },

  // for banner
  createBanner: {
    body: {
      image: Joi.string().required()
    }
  },

  updateBanner: {
    body: {
      image: Joi.string().required()
    },
    params: {
      id: Joi.string().required()
    }
  },

  createWhislist: {
    body: {
      productId: Joi.number().integer().required()
    }
  },

  tagValidate: {
    body: {
      tagName: Joi.string().required()
    }
  },

  courierChargeValidate: {
    body: {
      countryName: Joi.string().required().label('Your error message in here'),
      countryCode: Joi.string().required().label('Your error message in here'),
      _500GMS: Joi.number().integer().required(),
      _1KG: Joi.number().integer().required(),
      _2KG: Joi.number().integer().required(),
      _3KG: Joi.number().integer().required(),
      _4KG: Joi.number().integer().required(),
      _5KG: Joi.number().integer().required(),
      _6KG: Joi.number().integer().required(),
      _11KG: Joi.number().integer().required(),
      _21KG: Joi.number().integer().required(),
    }
  },
  returnOrder: {
    body: {
      reason: Joi.string().required(),
      isAdminApproved: Joi.boolean().default(false),
      images: Joi.array().required(),
    }
  },
  exchangeOrder: {
    body: {
      reason: Joi.string().required(),
      isAdminApproved: Joi.boolean().default(false),
      images: Joi.array().required()
    },
  },
  updateOrders: {
    body: {
      orderId: Joi.number().integer().required(),
    }
  }
};
