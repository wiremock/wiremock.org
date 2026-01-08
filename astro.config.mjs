// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightSidebarTopics from 'starlight-sidebar-topics';
import starlightLlmsTxt from 'starlight-llms-txt';
import { staticIndexHtmlMiddleware } from './vite-plugins/static-index-html-middleware.js';
import { copyStaticHomepage } from './integrations/copy-static-homepage.js';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
    site: 'https://wiremock.org',
    trailingSlash: 'always',
    vite: {
        plugins: [staticIndexHtmlMiddleware(), tailwindcss()]
    },
    integrations: [
        copyStaticHomepage(),
        starlight({
            title: 'WireMock',
            description: 'WireMock is a flexible API mocking tool for fast, robust and comprehensive testing.',
            logo: {
                src: './src/assets/wiremock-oss-logo.png',
                replacesTitle: true
            },
            social: [
                {
                    label: 'GitHub',
                    icon: 'github',
                    href: 'https://github.com/wiremock',
                },
            ],
            customCss: [
                './src/styles/global.css',
                './src/styles/custom.css',
            ],
            plugins: [
                starlightLlmsTxt(),
                starlightSidebarTopics([
                    {
                        id: 'java',
                        label: 'Java',
                        link: '/docs/',
                        icon: 'java',
                        items: [
                            { label: 'Overview', slug: 'docs' },
                            { label: 'v4 Beta', slug: 'docs/v4' },
                            {
                                label: 'Getting started',
                                items: [
                                    { label: 'Overview', slug: 'docs/overview' },
                                    { label: 'Quick Start API Mocking with Java and JUnit 4', slug: 'docs/quickstart/java-junit' },
                                    { label: 'Download and Install', slug: 'docs/download-and-installation' },
                                    { label: 'WireMock Tutorials', slug: 'docs/getting-started' },
                                    { label: 'Frequently Asked Questions', slug: 'docs/faq' },
                                ],
                            },
                            {
                                label: 'Running Wiremock',
                                items: [
                                    { label: 'Overview', slug: 'docs/standalone' },
                                    { label: 'Running in Docker', slug: 'docs/standalone/docker' },
                                    { label: 'Running as a standalone process', slug: 'docs/standalone/java-jar' },
                                    { label: 'Administration API', slug: 'docs/standalone/administration' },
                                ],
                            },
                            {
                                label: 'Java Usage',
                                items: [
                                    { label: 'JUnit 5+ Jupiter', slug: 'docs/junit-jupiter' },
                                    { label: 'JUnit 4 and Vintage', slug: 'docs/junit-extensions' },
                                    { label: 'Plain Java', slug: 'docs/java-usage' },
                                    { label: 'Java configuration', slug: 'docs/configuration' },
                                    { label: 'Running without the HTTP Server', slug: 'docs/running-without-http-server' },
                                    { label: 'Using WireMock with Jetty 12', slug: 'docs/jetty-12' },
                                ],
                            },
                            {
                                label: 'Stubbing and Verifying',
                                items: [
                                    { label: 'Stubbing', slug: 'docs/stubbing' },
                                    { label: 'Request Matching', slug: 'docs/request-matching' },
                                    { label: 'Response Templating', slug: 'docs/response-templating' },
                                    { label: 'Faker Extension', slug: 'docs/faker-extension' },
                                    { label: 'Simulating Faults', slug: 'docs/simulating-faults' },
                                    { label: 'Stateful Behaviour', slug: 'docs/stateful-behaviour' },
                                    { label: 'Proxying', slug: 'docs/proxying' },
                                    { label: 'Verifying', slug: 'docs/verifying' },
                                ],
                            },
                            {
                                label: 'Mock API Templates Library',
                                items: [
                                    { label: 'WireMock API Templates Library', slug: 'docs/mock-api-templates' },
                                    { label: 'Using Mock API Templates', slug: 'docs/mock-api-templates/usage' },
                                ],
                            },
                            {
                                label: 'Record and Playback',
                                items: [
                                    { label: 'Record and Playback', slug: 'docs/record-playback' },
                                ],
                            },
                            {
                                label: 'Message-Based Mocking',
                                items: [
                                    { label: 'Messaging Framework Overview', slug: 'docs/messaging/overview' },
                                    { label: 'WebSockets Overview', slug: 'docs/messaging/websockets' },
                                    { label: 'Stubbing', slug: 'docs/messaging/stubbing' },
                                    { label: 'Verification', slug: 'docs/messaging/verification' },
                                    { label: 'Sending Messages via Admin API', slug: 'docs/messaging/sending-messages' },
                                ],
                            },
                            {
                                label: 'Protocols',
                                items: [
                                    { label: 'WebSockets', slug: 'docs/websockets' },
                                    { label: 'Webhooks and Callbacks', slug: 'docs/webhooks-and-callbacks' },
                                    { label: 'GraphQL', slug: 'docs/graphql' },
                                    { label: 'gRPC', slug: 'docs/grpc' },
                                    { label: 'JSON Web Tokens (JWT)', slug: 'docs/jwt' },
                                    { label: 'HTTPS', slug: 'docs/https' },
                                ],
                            },
                            {
                                label: 'Integrations',
                                items: [
                                    { label: 'WireMock Spring Boot Integration', slug: 'docs/spring-boot' },
                                ],
                            },
                            {
                                label: 'Advanced use-cases',
                                items: [
                                    { label: 'Multi-domain Mocking', slug: 'docs/multi-domain-mocking' },
                                    { label: 'Deploying into a servlet container', slug: 'docs/advanced/deploy-to-servlet-container' },
                                    { label: 'WireMock on Java 1.7', slug: 'docs/advanced/java7' },
                                ],
                            },
                            {
                                label: 'Extensibility',
                                items: [
                                    { label: 'Extending WireMock', slug: 'docs/extending-wiremock' },
                                    { label: 'Filtering and Modifying Requests', slug: 'docs/extensibility/filtering-requests' },
                                    { label: 'Transforming Responses', slug: 'docs/extensibility/transforming-responses' },
                                    { label: 'Custom Matching', slug: 'docs/extensibility/custom-matching' },
                                    { label: 'Listening for Serve Events', slug: 'docs/extensibility/listening-for-serve-events' },
                                    { label: 'Admin API Extensions', slug: 'docs/extensibility/admin-api-extensions' },
                                    { label: 'Adding Template Helpers', slug: 'docs/extensibility/adding-template-helpers' },
                                    { label: 'Adding Template Model Data', slug: 'docs/extensibility/adding-template-model-data' },
                                    { label: 'Listening for Stub Changes', slug: 'docs/extensibility/listening-for-stub-changes' },
                                    { label: 'Listening for Settings Changes', slug: 'docs/extensibility/listening-for-settings-changes' },
                                    { label: 'Mappings Loader Extensions', slug: 'docs/extensibility/adding-mappings-loader' },
                                    { label: 'Stub Metadata', slug: 'docs/extensibility/stub-metadata' },
                                ],
                            },
                            {
                                label: 'Reference',
                                items: [
                                    { label: 'Admin API', slug: 'docs/standalone/admin-api-reference' },
                                ],
                            },
                            {
                                label: 'Misc',
                                items: [
                                    { label: 'Support', slug: 'docs/support' },
                                    { label: 'Commercial Options', slug: 'docs/commercial' },
                                    { label: 'External Resources', slug: 'docs/external-resources' },
                                    {
                                        label: 'Solutions',
                                        items: [
                                            { label: 'WireMock and Android', slug: 'docs/solutions/android' },
                                            { label: 'WireMock and C/C++', slug: 'docs/solutions/c_cpp' },
                                            { label: 'WireMock and .NET', slug: 'docs/solutions/dotnet' },
                                            { label: 'WireMock and Golang', slug: 'docs/solutions/golang' },
                                            { label: 'WireMock and GraphQL', slug: 'docs/solutions/graphql' },
                                            { label: 'WireMock and Groovy', slug: 'docs/solutions/groovy' },
                                            { label: 'WireMock and JVM', slug: 'docs/solutions/jvm' },
                                            { label: 'WireMock and Kotlin', slug: 'docs/solutions/kotlin' },
                                            { label: 'WireMock and Kubernetes', slug: 'docs/solutions/kubernetes' },
                                            { label: 'WireMock and Node.js', slug: 'docs/solutions/nodejs' },
                                            { label: 'WireMock and Pact', slug: 'docs/solutions/pact' },
                                            { label: 'WireMock and Python', slug: 'docs/solutions/python' },
                                            { label: 'WireMock and Quarkus', slug: 'docs/solutions/quarkus' },
                                            { label: 'WireMock and Rust', slug: 'docs/solutions/rust' },
                                            { label: 'WireMock and Spring Boot Integration', slug: 'docs/solutions/spring-boot-integration' },
                                            { label: 'WireMock and Testcontainers', slug: 'docs/solutions/testcontainers' },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        label: '.NET',
                        link: '/dotnet/',
                        icon: 'dotnet',
                        items: [
                            { label: 'WireMock.NET', slug: 'dotnet' },
                            { label: 'What is WireMock.Net', slug: 'dotnet/what-is-wiremock-net' },
                            { label: 'WireMock Java Compatibility', slug: 'dotnet/wiremock-java-compatibility' },
                            { label: 'References', slug: 'dotnet/references' },
                            { label: 'Settings', slug: 'dotnet/settings' },
                            {
                                label: 'Admin REST API',
                                items: [
                                    { label: 'Admin API Reference', slug: 'dotnet/admin-api-reference' },
                                    { label: 'Mapping', slug: 'dotnet/mapping' },
                                    { label: 'Compatibility with WireMock.org', slug: 'dotnet/compatibility-wiremock-org' }
                                ],
                            },
                            { label: 'Proxying', slug: 'dotnet/proxying' },
                            { label: 'Stubbing', slug: 'dotnet/stubbing' },
                            { label: 'Webhook', slug: 'dotnet/webhook' },
                            { label: 'WireMock commandline parameters', slug: 'dotnet/wiremock-commandline-parameters' },
                            {
                                label: 'Request Matching',
                                items: [
                                    { label: 'Request Matching', slug: 'dotnet/request-matching' },
                                    { label: 'Request Matchers', slug: 'dotnet/request-matchers' },
                                    { label: 'Request Matching Tips', slug: 'dotnet/request-matching-tips' },
                                    { label: 'Request Matcher FormUrlEncodedMatcher', slug: 'dotnet/request-matcher-formurlencodedmatcher' },
                                    { label: 'Request Matching CSharpCode', slug: 'dotnet/request-matching-csharpcode' },
                                    { label: 'Request Matching GraphQLMatcher', slug: 'dotnet/request-matching-graphqlmatcher' },
                                    { label: 'Request Matching JsonMatcher', slug: 'dotnet/request-matching-jsonmatcher' },
                                    { label: 'Request Matching JsonPartialMatcher', slug: 'dotnet/request-matching-jsonpartialmatcher' },
                                    { label: 'Request Matching JsonPartialWildcardMatcher', slug: 'dotnet/request-matching-jsonpartialwildcardmatcher' },
                                    { label: 'Request Matching JsonPathMatcher', slug: 'dotnet/request-matching-jsonpathmatcher' },
                                    { label: 'Request Matching MimePartMatcher', slug: 'dotnet/request-matching-mimepartmatcher' },
                                    { label: 'Request Matching ProtoBuf', slug: 'dotnet/request-matching-protobuf' },
                                ],
                            },
                            { label: 'Response Templating', slug: 'dotnet/response-templating' },
                            {
                                label: 'Unit Testing',
                                items: [
                                    { label: 'Using WireMock in UnitTests', slug: 'dotnet/using-wiremock-in-unittests' },
                                    { label: 'Using WireMock.Net.Testcontainers', slug: 'dotnet/using-wiremock-net-testcontainers' },
                                    { label: 'Using WireMock.Net.Aspire', slug: 'dotnet/using-wiremock-net-aspire' },
                                    { label: 'FluentAssertions', slug: 'dotnet/fluentassertions' },
                                ],
                            },
                            {
                                label: 'Using WireMock',
                                items: [
                                    { label: 'WireMock as dotnet tool', slug: 'dotnet/wiremock-as-dotnet-tool' },
                                    { label: 'WireMock as a standalone process', slug: 'dotnet/wiremock-as-a-standalone-process' },
                                    { label: 'WireMock as a (Azure) Web App', slug: 'dotnet/wiremock-as-a-azure-web-app' },
                                    { label: 'WireMock as a Windows Service', slug: 'dotnet/wiremock-as-a-windows-service' },
                                ],
                            },
                            {
                                label: 'Advanced',
                                items: [
                                    { label: 'Scenarios and States', slug: 'dotnet/scenarios-and-states' },
                                    { label: 'Pact', slug: 'dotnet/pact' },
                                    { label: 'Faults', slug: 'dotnet/faults' },
                                    { label: 'Using HTTPS (SSL)', slug: 'dotnet/using-https-ssl' },
                                    { label: 'Cors', slug: 'dotnet/cors' },
                                    { label: 'KestrelServerOptions', slug: 'dotnet/kestrelserveroptions' },
                                    { label: 'RegexExtended', slug: 'dotnet/regexextended' },
                                    { label: 'MyGet preview versions', slug: 'dotnet/myget-preview-versions' },
                                    { label: 'Development Information', slug: 'dotnet/development-information' },
                                ],
                            },
                            {
                                label: 'Errors',
                                items: [
                                    { label: 'Xamarin - Could not load file or assembly', slug: 'dotnet/xamarin-could-not-load-file-or-assembly' },
                                    { label: 'Conflict on Microsoft.CodeAnalysis.CSharp', slug: 'dotnet/conflict-on-microsoft-codeanalysis-csharp' },
                                    { label: 'Could not load file or assembly RestEase', slug: 'dotnet/could-not-load-file-or-assembly-restease' },
                                    { label: 'MimeKit and MimeKitLite', slug: 'dotnet/mimekit-and-mimekitlite' },
                                ],
                            },
                        ],
                    },
                ]),
            ],
            components: {
                Head: './src/components/Head.astro',
                Header: './src/components/Header.astro',
                Sidebar: './src/components/Sidebar.astro',
            },
        }),
    ],
    redirects: {
        '/docs/quickstart': '/docs/quickstart/java-junit',
        '/docs/advanced': '/docs/multi-domain-mocking',
        '/docs/extensibility': '/docs/extending-wiremock',
        '/docs/stubbing_and_verifying': '/docs/stubbing',
        '/external-resources': '/docs/external-resources',
        '/docs/solutions': '/docs',
    },
});