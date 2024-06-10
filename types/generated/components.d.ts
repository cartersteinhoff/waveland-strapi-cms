import type { Schema, Attribute } from '@strapi/strapi';

export interface MenuMenuItem extends Schema.Component {
  collectionName: 'components_menu_menu_items';
  info: {
    name: 'menu-item';
    icon: 'link';
  };
  attributes: {
    label: Attribute.String & Attribute.Required;
    link: Attribute.String & Attribute.Required;
    order: Attribute.Integer;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'menu.menu-item': MenuMenuItem;
    }
  }
}
