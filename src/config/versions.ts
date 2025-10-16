/**
 * Central configuration for version numbers and other site-wide variables.
 *
 * This is the single source of truth for all version numbers used across the site.
 * Update these values here and they will be automatically reflected everywhere.
 */

export const VERSIONS = {
  // WireMock Java versions
  WIREMOCK_STABLE: '3.13.1',
  WIREMOCK_BETA: '4.0.0-beta.15',
  WIREMOCK_LEGACY: '2.31.0',

  // Extension versions
  WEBHOOKS_EXTENSION: '3.13.1',

  // Docker image tags
  DOCKER_STABLE: '3.13.1',
  DOCKER_LATEST: 'latest',

  // Other dependencies (used in examples)
  ASSERTJ: '3.26.3',
  ASSERTJ_GRADLE: '3.24.2',
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
