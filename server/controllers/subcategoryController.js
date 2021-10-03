const Subcategory = require('../models/subcategoryModel');
const slugify = require('slugify');
const { response } = require('express');

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await new Subcategory({
      name,
      slug: slugify(name),
    }).save();
    res.json(category);
  } catch (error) {
    // console.log(error);
    res.status(400).send('Create subcategory failed!');
  }
};

exports.list = async (req, res) => {
  res.json(await Subcategory.find({}).sort({ createdAt: -1 }).exec());
};

exports.read = async (req, res) => {
  const sub = await Subcategory.findOne({ slug: req.params.slug }).exec();
  res.json(sub);
};

exports.update = async (req, res) => {
  const { name } = req.body;

  try {
    const updated = await Subcategory.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).send('Subcategory update failed!');
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Subcategory.findOneAndDelete({
      slug: req.params.slug,
    });
    res.json(deleted);
  } catch (error) {
    res.status(400).send('Subcategory delete failed!');
  }
};
