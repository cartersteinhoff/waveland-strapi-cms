"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // Ensure the Public role exists
    const publicRole = await strapi
      .query("plugin::users-permissions.role")
      .findOne({
        where: { type: "public" },
      });

    // Define the permissions to be added
    const permissionsToAdd = [
      {
        action: "plugin::content-manager.explorer.find",
        subject: "api::menu.menu",
      },
      {
        action: "plugin::content-manager.explorer.findOne",
        subject: "api::menu.menu",
      },
    ];

    // Add permissions to the Public role
    await Promise.all(
      permissionsToAdd.map((permission) =>
        strapi.query("plugin::users-permissions.permission").create({
          data: {
            ...permission,
            role: publicRole.id,
          },
        })
      )
    );

    console.log('Public permissions for "menu" content type have been set');
  },
};
