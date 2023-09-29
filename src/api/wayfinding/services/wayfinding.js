'use strict';

/**
 * wayfinding service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wayfinding.wayfinding');
