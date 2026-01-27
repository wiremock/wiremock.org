/**
 * Central configuration for version numbers and other site-wide variables.
 *
 * This is the single source of truth for all version numbers used across the site.
 * Update these values here and they will be automatically reflected everywhere.
 */

export const VERSIONS = {
  // WireMock Java versions
  WIREMOCK_STABLE: '3.13.2',
  WIREMOCK_BETA: '4.0.0-beta.26',
  WIREMOCK_LEGACY: '2.31.0',

  GRPC_EXTENSION: '0.11.0'
} as const;

/**
 * All variables available for template substitution in code blocks.
 * These can be referenced as {{VARIABLE_NAME}} in VCode components.
 */
export const CODE_VARIABLES = {
  ...VERSIONS,

  // Add any other commonly used values here
  MAVEN_GROUP_ID: 'org.wiremock',
  DOCKER_IMAGE: 'wiremock/wiremock',
} as const;

// Type-safe access to variable names
export type CodeVariable = keyof typeof CODE_VARIABLES;
