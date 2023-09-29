'use strict';

/**
 * privacy-folie service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::privacy-folie.privacy-folie');
