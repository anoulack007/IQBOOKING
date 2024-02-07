const express = require("express");
const customer = require("../model/customer");
const { check,validationResult } = require('express-validator');

/**
 *
 * @param {*} contact
 * @param {*} password
 * @param {*} google
 * @param {*} facebook
 * @returns
 */
const VerifyContact = async (contact,req,res) => {
  const OldContact = await customer.findOne({ contact: contact });
  if (OldContact) {
    res.status(400).send("UserContact Already Exist.")
  }
}
const VerifyContact1 = async (body) => {
  if (!body.contact) throw new Error("UserContact Already Exist.");
}

const VerifyFacebook = async (facebook) => {
  const OldGoogle = await customer.findOne({ facebook: facebook });
  if (OldGoogle) {
    return "UserFacebook Already Exist."
  }
}

const VerifyGoogle = async (google, res) => {
    const OldGoogle = await customer.findOne({ google: google });
    if (OldGoogle) {
      return "UserGoogle Already Exist."
    }
  }
  const validateRegisterContact = [

    check('contact').isEmail().withMessage('Invalid email'),
    check('password').notEmpty().withMessage('Password cannot be empty'),
    // Add more validation rules as needed
  ];
module.exports = {
  validateRegisterContact,
  VerifyContact,
  VerifyFacebook,
  VerifyGoogle
};
