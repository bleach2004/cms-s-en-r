import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBewegwijzeringBewegwijzering extends Schema.CollectionType {
  collectionName: 'bewegwijzerings';
  info: {
    singularName: 'bewegwijzering';
    pluralName: 'bewegwijzerings';
    displayName: 'bewegwijzering';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Afbeeldingen: Attribute.Media;
    Titel: Attribute.String;
    Beschrijving: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::bewegwijzering.bewegwijzering',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::bewegwijzering.bewegwijzering',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiExterieurSigningExterieurSigning
  extends Schema.CollectionType {
  collectionName: 'exterieur_signings';
  info: {
    singularName: 'exterieur-signing';
    pluralName: 'exterieur-signings';
    displayName: 'exterieur-signing';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Gevellichtreclame: Attribute.Media;
    Reclameborden: Attribute.Media;
    Raamstikkers: Attribute.Media;
    Bewegwijzering: Attribute.Media;
    Spandoekenvlaggen: Attribute.Media;
    Fleetmarking: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::exterieur-signing.exterieur-signing',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::exterieur-signing.exterieur-signing',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFleetmarkingFleetmarking extends Schema.CollectionType {
  collectionName: 'fleetmarkings';
  info: {
    singularName: 'fleetmarking';
    pluralName: 'fleetmarkings';
    displayName: 'fleetmarking';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Afbeeldingen: Attribute.Media;
    Titel: Attribute.String;
    Beschrijving: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::fleetmarking.fleetmarking',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::fleetmarking.fleetmarking',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFolietekstenFolieteksten extends Schema.CollectionType {
  collectionName: 'folietekstens';
  info: {
    singularName: 'folieteksten';
    pluralName: 'folietekstens';
    displayName: 'folieteksten';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Afbeeldingen: Attribute.Media;
    Titel: Attribute.String;
    Beschrijving: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::folieteksten.folieteksten',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::folieteksten.folieteksten',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFotoOpTextielFotoOpTextiel extends Schema.CollectionType {
  collectionName: 'foto_op_textiels';
  info: {
    singularName: 'foto-op-textiel';
    pluralName: 'foto-op-textiels';
    displayName: 'foto-op-textiel';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Afbeeldingen: Attribute.Media;
    Titel: Attribute.String;
    Beschrijving: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::foto-op-textiel.foto-op-textiel',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::foto-op-textiel.foto-op-textiel',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiGevelEnLichtreclameGevelEnLichtreclame
  extends Schema.CollectionType {
  collectionName: 'gevel_en_lichtreclames';
  info: {
    singularName: 'gevel-en-lichtreclame';
    pluralName: 'gevel-en-lichtreclames';
    displayName: 'gevel-en-lichtreclame';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Afbeeldingen: Attribute.Media;
    Titel: Attribute.String;
    Beschrijving: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::gevel-en-lichtreclame.gevel-en-lichtreclame',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::gevel-en-lichtreclame.gevel-en-lichtreclame',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiInterieurSigningInterieurSigning
  extends Schema.CollectionType {
  collectionName: 'interieur_signings';
  info: {
    singularName: 'interieur-signing';
    pluralName: 'interieur-signings';
    displayName: 'interieur-signing';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Wallcovering: Attribute.Media;
    Interieurfolie: Attribute.Media;
    Privacyfolie: Attribute.Media;
    Meubelpanelen: Attribute.Media;
    Peesframes: Attribute.Media;
    Ledframes: Attribute.Media;
    Textielfoto: Attribute.Media;
    Folieteksten: Attribute.Media;
    Schilderijprints: Attribute.Media;
    Whiteboards: Attribute.Media;
    Wayfinding: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::interieur-signing.interieur-signing',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::interieur-signing.interieur-signing',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiInterieurfolieInterieurfolie extends Schema.CollectionType {
  collectionName: 'interieurfolies';
  info: {
    singularName: 'interieurfolie';
    pluralName: 'interieurfolies';
    displayName: 'interieurfolie';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Afbeeldingen: Attribute.Media;
    Titel: Attribute.String;
    Beschrijving: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::interieurfolie.interieurfolie',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::interieurfolie.interieurfolie',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLedframesLedframes extends Schema.CollectionType {
  collectionName: 'ledframess';
  info: {
    singularName: 'ledframes';
    pluralName: 'ledframess';
    displayName: 'ledframes';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Afbeeldingen: Attribute.Media;
    Titel: Attribute.String;
    Beschrijving: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ledframes.ledframes',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::ledframes.ledframes',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMeubelpanelenMeubelpanelen extends Schema.CollectionType {
  collectionName: 'meubelpanelens';
  info: {
    singularName: 'meubelpanelen';
    pluralName: 'meubelpanelens';
    displayName: 'meubelpanelen';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Afbeeldingen: Attribute.Media;
    Titel: Attribute.String;
    Beschrijving: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::meubelpanelen.meubelpanelen',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::meubelpanelen.meubelpanelen',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPeesframesPeesframes extends Schema.CollectionType {
  collectionName: 'peesframess';
  info: {
    singularName: 'peesframes';
    pluralName: 'peesframess';
    displayName: 'peesframes';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Afbeeldingen: Attribute.Media;
    Titel: Attribute.String;
    Beschrijving: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::peesframes.peesframes',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::peesframes.peesframes',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPrivacyFoliePrivacyFolie extends Schema.CollectionType {
  collectionName: 'privacy_folies';
  info: {
    singularName: 'privacy-folie';
    pluralName: 'privacy-folies';
    displayName: 'privacy-folie';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Afbeeldingen: Attribute.Media;
    Titel: Attribute.String;
    Beschrijving: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::privacy-folie.privacy-folie',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::privacy-folie.privacy-folie',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRaamstikkersRaamstikkers extends Schema.CollectionType {
  collectionName: 'raamstikkerss';
  info: {
    singularName: 'raamstikkers';
    pluralName: 'raamstikkerss';
    displayName: 'raamstikkers';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Afbeeldingen: Attribute.Media;
    Titel: Attribute.String;
    Beschrijving: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::raamstikkers.raamstikkers',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::raamstikkers.raamstikkers',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiReclamebordenReclameborden extends Schema.CollectionType {
  collectionName: 'reclamebordens';
  info: {
    singularName: 'reclameborden';
    pluralName: 'reclamebordens';
    displayName: 'reclameborden';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Afbeeldingen: Attribute.Media;
    Titel: Attribute.String;
    Beschrijving: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::reclameborden.reclameborden',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::reclameborden.reclameborden',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSchilderijPrintsSchilderijPrints
  extends Schema.CollectionType {
  collectionName: 'schilderij_printss';
  info: {
    singularName: 'schilderij-prints';
    pluralName: 'schilderij-printss';
    displayName: 'schilderij-prints';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Afbeeldingen: Attribute.Media;
    Titel: Attribute.String;
    Beschrijving: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::schilderij-prints.schilderij-prints',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::schilderij-prints.schilderij-prints',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSpandoekenEnVlaggenSpandoekenEnVlaggen
  extends Schema.CollectionType {
  collectionName: 'spandoeken_en_vlaggens';
  info: {
    singularName: 'spandoeken-en-vlaggen';
    pluralName: 'spandoeken-en-vlaggens';
    displayName: 'spandoeken-en-vlaggen';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Afbeeldingen: Attribute.Media;
    Titell: Attribute.String;
    Beschrijving: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::spandoeken-en-vlaggen.spandoeken-en-vlaggen',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::spandoeken-en-vlaggen.spandoeken-en-vlaggen',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTextielframesTextielframes extends Schema.CollectionType {
  collectionName: 'textielframess';
  info: {
    singularName: 'textielframes';
    pluralName: 'textielframess';
    displayName: 'textielframes';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Afbeeldingen: Attribute.Media;
    Titel: Attribute.String;
    Beschrijving: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::textielframes.textielframes',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::textielframes.textielframes',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWallcoveringWallcovering extends Schema.CollectionType {
  collectionName: 'wallcoverings';
  info: {
    singularName: 'wallcovering';
    pluralName: 'wallcoverings';
    displayName: 'wallcovering';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Afbeeldingen: Attribute.Media;
    Titel: Attribute.String;
    Beschrijving: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::wallcovering.wallcovering',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::wallcovering.wallcovering',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWayfindingWayfinding extends Schema.CollectionType {
  collectionName: 'wayfindings';
  info: {
    singularName: 'wayfinding';
    pluralName: 'wayfindings';
    displayName: 'wayfinding';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Afbeeldingen: Attribute.Media;
    Titel: Attribute.String;
    Beschrijving: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::wayfinding.wayfinding',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::wayfinding.wayfinding',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWhiteboardsWhiteboards extends Schema.CollectionType {
  collectionName: 'whiteboardss';
  info: {
    singularName: 'whiteboards';
    pluralName: 'whiteboardss';
    displayName: 'whiteboards';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Afbeeldingen: Attribute.Media;
    Titel: Attribute.String;
    Beschrijving: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::whiteboards.whiteboards',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::whiteboards.whiteboards',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::bewegwijzering.bewegwijzering': ApiBewegwijzeringBewegwijzering;
      'api::exterieur-signing.exterieur-signing': ApiExterieurSigningExterieurSigning;
      'api::fleetmarking.fleetmarking': ApiFleetmarkingFleetmarking;
      'api::folieteksten.folieteksten': ApiFolietekstenFolieteksten;
      'api::foto-op-textiel.foto-op-textiel': ApiFotoOpTextielFotoOpTextiel;
      'api::gevel-en-lichtreclame.gevel-en-lichtreclame': ApiGevelEnLichtreclameGevelEnLichtreclame;
      'api::interieur-signing.interieur-signing': ApiInterieurSigningInterieurSigning;
      'api::interieurfolie.interieurfolie': ApiInterieurfolieInterieurfolie;
      'api::ledframes.ledframes': ApiLedframesLedframes;
      'api::meubelpanelen.meubelpanelen': ApiMeubelpanelenMeubelpanelen;
      'api::peesframes.peesframes': ApiPeesframesPeesframes;
      'api::privacy-folie.privacy-folie': ApiPrivacyFoliePrivacyFolie;
      'api::raamstikkers.raamstikkers': ApiRaamstikkersRaamstikkers;
      'api::reclameborden.reclameborden': ApiReclamebordenReclameborden;
      'api::schilderij-prints.schilderij-prints': ApiSchilderijPrintsSchilderijPrints;
      'api::spandoeken-en-vlaggen.spandoeken-en-vlaggen': ApiSpandoekenEnVlaggenSpandoekenEnVlaggen;
      'api::textielframes.textielframes': ApiTextielframesTextielframes;
      'api::wallcovering.wallcovering': ApiWallcoveringWallcovering;
      'api::wayfinding.wayfinding': ApiWayfindingWayfinding;
      'api::whiteboards.whiteboards': ApiWhiteboardsWhiteboards;
    }
  }
}
