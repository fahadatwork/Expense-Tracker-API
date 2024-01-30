const Category = require("../models/CategoriesSchema");
const  { validateCategoryFields } =  require('../utils/validators');

exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      console.log(req.body.name);
      return res.status(400).json({ message: "please input required fields" });
    }

    const newCategory = Category({
      name: req.body.name,
      user: req.user._id,
    });

    newCategory.save();
    return res.status(200).json(newCategory);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server Error" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);

    if (!deletedCategory) {
      return res.status(404).json("error : category does not exists");
    }

    return res.status(200).json({ deleted: deletedCategory });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "server Error" });
  }
};

exports.viewCategory = async(req,res) => {

  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json("error : category does not exists");
    }

    return res.status(200).json(category);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "server Error" });
  }

};

exports.editCategory= async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
     
    if(!validateCategoryFields(data)) {
       return res.status(400).json({"error" : "fields empty"});
    }
  
    const updatedCategory = await Category.findByIdAndUpdate(userId, data, {
      new: true,
      runValidators: true,
    });

    if (!updatedCategory) {
      return res
        .status(404)
        .json({ error_mesaage: "category not found check id and retry" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error_mesaage: "internal Server Error" });
  }
};

exports.viewAllCategories = async(req,res) => {

  try {
    const categories = await Category.find({});

    return res.status(200).json(categories);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "server Error" });
  }

};






