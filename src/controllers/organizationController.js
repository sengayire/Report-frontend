import { Organization, Report } from "../models";

class OrganizationController {
  //creata oraganization
  static async create(req, res) {
    try {
      const checkOrg = await Organization.findAll({
        where: {
          name: req.body.organizationName
        }
      });

      if (checkOrg.length > 0) {
        return res.status(200).send({
          error: "Sorry, the organisation already exists"
        });
      }

      const newOrg = await Organization.create({
        name: req.body.organizationName
      });

      return res.status(201).json({
        status: 201,
        data: [newOrg.dataValues]
      });
    } catch (error) {
      console.log(error);
    }

    res.status(500).json({
      message: " Oops, Something went wrong!!"
    });
  }

  // edit Organizations

  static async editOrganization(req, res) {
    try {
      const checkOrg = await Organization.findAll({
        where: {
          id: req.params.id
        }
      });
      console.log(req.params.id);
      if (checkOrg.length == 0) {
        return res.status(200).send({
          error: "Sorry, Organisation with such id doesn't exist"
        });
      }
      const updateOrg = await Organization.update(
        { name: req.body.organizationName },
        { where: { id: req.params.id } }
      );
      res.status(201).json({
        status: 201,
        data: updateOrg.dataValues,
        message: "the organisation name edited successfully"
      });
    } catch (error) {
      console.log("an error happened");
    }
    res.status(500).json({
      status: 500,
      message: "Oops, something went wrong"
    });
  }

  //Get all organization
  static async allOrganizations(req, res) {
    try {
      const allOrg = await Organization.findAll({ raw: true });

      return res.status(200).send({
        message: "All organizations are successfully fetched",
        data: allOrg
      });
    } catch (error) {
      console.log(error);
    }
    res.status(500).json({
      message: "Oops, Something went wrong!!"
    });
  }

  // delete organization
  static async deleteOrganization(req, res) {
    try {
      const { id } = req.params;
      const checkOrganization = await Organization.findAll({ where: { id } });
      if (!checkOrganization.length > 0) {
        return res.status(404).json({
          status: 404,
          error: `Organization with  id ${id} not found!`
        });
      }
      const deleteOrganization = await Organization.destroy({ where: { id } });
      return res.status(200).json({
        status: 200,
        message: "Organization deleted successful"
      });
    } catch (error) {
      console.log(error);
    }

    return res.status(500).json({
      error: "Ooops, something went wrong!"
    });
  }

  // Verified reports for organization
  static async verifiedIncidents(req, res) {
    try {
      const { id } = req.params;
      const checkIncidents = await Report.findAll({
        where: { id, status: "verified" }
      });
      if (!checkIncidents.length > 0) {
        return res.status(404).json({
          status: 404,
          error: ` No verified Report found for this organization!`
        });
      }
      return res.status(200).json({
        status: 200,
        data: [{ checkIncidents }]
      });
    } catch (error) {
      console.log(error);
    }

    return res.status(500).json({
      error: "Ooops, something went wrong!"
    });
  }
}

export default OrganizationController;
