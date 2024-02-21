const getAllProducts = async (req, res) => {
    res.status(200).json({ msg: "Show all products"});
};

const getAllProductsTesting = async (req, res) => {
    res.status(200).json({ msg: "Get all products Testing"});
};

module.exports = {getAllProducts, getAllProductsTesting};