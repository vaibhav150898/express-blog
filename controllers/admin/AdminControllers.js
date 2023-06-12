class AdminController {
  static Dashboard = (req, res) => {
    try {
      const { name, email } = req.admin;
      res.render("admin/Dashboard", { n: name, e: email });
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = AdminController;
