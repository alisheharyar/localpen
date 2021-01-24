declare const baseUrl = "/localpen/";
declare module "localpen/monaco" {
    export { monaco } from './vendor/monaco-editor/monaco';
}
declare module "localpen/editor" {
    export const createEditor: (options: any) => Promise<any>;
}
declare module "localpen/models" {
    export interface Pen {
        baseUrl: string;
        title: string;
        autoupdate: boolean;
        autosave: boolean;
        delay: number;
        emmet: boolean;
        autoprefixer: boolean;
        mode: 'full' | 'editor' | 'codeblock' | 'result';
        editor: {
            [key: string]: any;
        };
        allowLangChange: boolean;
        language: Language;
        markup: Editor;
        style: Editor;
        script: Editor;
        stylesheets: string[];
        scripts: string[];
        cssPreset: CssPresetId;
        modules: Module[];
    }
    export type Language = 'html' | 'htm' | 'markdown' | 'md' | 'mdown' | 'mkdn' | 'mdx' | 'pug' | 'jade' | 'asciidoc' | 'adoc' | 'asc' | 'css' | 'scss' | 'sass' | 'less' | 'stylus' | 'styl' | 'javascript' | 'js' | 'typescript' | 'ts' | 'jsx' | 'tsx' | 'coffeescript' | 'coffee';
    export interface Editor {
        language: Language;
        content?: string;
        contentUrl?: string;
        selector?: string;
    }
    export type EditorId = 'markup' | 'style' | 'script';
    export interface Editors {
        markup: any;
        style: any;
        script: any;
    }
    export interface EditorLanguages {
        markup: Language;
        style: Language;
        script: Language;
    }
    export interface Module {
        name: string;
        url?: string;
        typesUrl?: string;
    }
    export interface LanguageSpecs {
        name: Language;
        title: string;
        longTitle?: string;
        parser?: Parser;
        compiler?: Compiler | Language;
        extensions: Language[];
        editor: EditorId;
        preset?: CssPresetId;
    }
    export interface Processors {
        name: ProcessorName | Language;
        compiler: Compiler | ProcessorName | Language;
        editors?: EditorId[];
    }
    export type ProcessorName = 'autoprefixer';
    export type ParserName = 'babel' | 'babel-ts' | 'html' | 'markdown' | 'css' | 'scss' | 'less' | 'pug';
    export interface Parser {
        name: ParserName;
        plugins?: any[];
        pluginUrls: string[];
    }
    export type CssPresetId = '' | 'normalize.css' | 'reset-css' | 'github-markdown-css' | 'asciidoctor.css';
    export interface CssPreset {
        id: CssPresetId;
        name: string;
        url: string;
    }
    export interface EditorLibrary {
        filename: string;
        content: string;
    }
    export interface Compiler {
        url: string;
        fn?: (code: string, options?: any) => any;
        factory: (compilerModule: any, config: Pen) => (code: string) => string;
        umd?: boolean;
        editors?: EditorId[];
    }
    export interface Compilers {
        [language: string]: Compiler;
    }
    export interface Template {
        title: string;
        thumbnail: string;
        language: Language;
        markup: Editor;
        style: Editor;
        script: Editor;
        stylesheets: string[];
        scripts: string[];
        cssPreset: CssPresetId;
        modules: Module[];
    }
}
declare module "localpen/languages" {
    import { CssPreset, EditorId, Language, LanguageSpecs, Processors } from "localpen/models";
    export const languages: LanguageSpecs[];
    export const postProcessors: Processors[];
    export const cssPresets: CssPreset[];
    export const getLanguageByAlias: (alias: string) => Language | undefined;
    export const getLanguageEditorId: (alias: Language) => EditorId | undefined;
    export const getLanguageExtension: (alias: string) => Language | undefined;
}
declare module "localpen/storage" {
    import { Pen } from "localpen/models";
    interface Item {
        id: string;
        pen: Pen;
        lastModified: number;
    }
    export const createStorage: (name?: string) => {
        getList: () => {
            id: string;
            title: string;
            lastModified: number;
        }[];
        getItem: (itemId: string) => Item | undefined;
        addItem: (pen: Pen) => string;
        updateItem: (id: string, pen: Pen) => void;
        deleteItem: (id: string) => void;
        clear: () => void;
    };
}
declare module "localpen/formatter" {
    import { Language, Parser, Pen } from "localpen/models";
    export const createFormatter: (config: Pen) => {
        load: (languages: Language[]) => Promise<void>;
        loadParser: (language: Language) => Promise<Parser | undefined>;
        format: (editor: any, language: Language) => Promise<void>;
    };
}
declare module "localpen/compilers" {
    import { Language, LanguageSpecs, Pen, Compilers, Processors } from "localpen/models";
    export const importsPattern: RegExp;
    export const replaceImports: (code: string, config: Pen) => string;
    export const getCompilersData: (languages: Array<LanguageSpecs | Processors>, config: Pen) => Compilers;
    export const compile: (language: Language, content: string, compilers: Compilers, config: Pen, eventsManager: any) => Promise<string>;
    export const loadCompilers: (languages: string[], compilers: Compilers, config: Pen, eventsManager: any) => Promise<unknown[]>;
}
declare module "localpen/notifications" {
    export const createNotifications: (selector: string) => {
        message: (message: string) => void;
        error: (message: string) => void;
    };
}
declare module "localpen/modal" {
    export const createModal: () => {
        show: (container: Element, className?: string) => void;
        close: () => void;
    };
}
declare module "localpen/html/index" {
    import resultTemplate from '../assets/result.html';
    import appHTML from './app.html';
    import importScreen from './import.html';
    import resourcesScreen from './external-resources.html';
    import savePromptScreen from './save-prompt.html';
    import templatesScreen from './templates.html';
    import openScreen from './open.html';
    export { resultTemplate, appHTML, importScreen, resourcesScreen, savePromptScreen, templatesScreen, openScreen, };
}
declare module "localpen/export/export-codepen" {
    import { Pen } from "localpen/models";
    export const exportCodepen: (config: Pen) => void;
}
declare module "localpen/utils" {
    export const decodeHTML: (html: string) => string;
    export const encodeHTML: (html: string) => string;
    export const pipe: (...fns: Function[]) => Function;
    export const safeName: (name: string) => string;
}
declare module "localpen/export/utils" {
    export const downloadFile: (filename: string, extension: string, content: string) => void;
}
declare module "localpen/export/export-html" {
    import { Pen } from "localpen/models";
    export const exportHTML: (config: Pen, html: string) => void;
}
declare module "localpen/export/export-jsfiddle" {
    import { Pen } from "localpen/models";
    export const exportJsfiddle: (config: Pen) => void;
}
declare module "localpen/export/export-json" {
    import { Pen } from "localpen/models";
    export const exportJSON: (config: Pen) => void;
}
declare module "localpen/export/export-src" {
    import { Pen } from "localpen/models";
    export const exportSrc: (config: Pen, { JSZip, html, editors, getEditorLanguage }: any) => Promise<void>;
}
declare module "localpen/export/export" {
    import { Pen } from "localpen/models";
    type ExportType = 'json' | 'src' | 'html' | 'codepen' | 'jsfiddle';
    export const exportPen: (config: Pen, type: ExportType, payload?: any) => void;
}
declare module "localpen/export/index" {
    export * from "localpen/export/export";
}
declare module "localpen/events" {
    export const createEventsManager: () => {
        addEventListener: (element: HTMLElement | Document | Window | FileReader, eventType: string, fn: (event: Event | KeyboardEvent) => void, _options?: any) => void;
        removeEventListeners: () => void;
    };
}
declare module "localpen/templates/angular-starter" {
    import { Template } from "localpen/models";
    export const angularStarter: Template;
}
declare module "localpen/templates/blank" {
    import { Template } from "localpen/models";
    export const blank: Template;
}
declare module "localpen/templates/bootstrap-starter" {
    import { Template } from "localpen/models";
    export const bootstrapStarter: Template;
}
declare module "localpen/templates/d3-starter" {
    import { Template } from "localpen/models";
    export const d3Starter: Template;
}
declare module "localpen/templates/jquery-starter" {
    import { Template } from "localpen/models";
    export const jqueryStarter: Template;
}
declare module "localpen/templates/preact-starter" {
    import { Template } from "localpen/models";
    export const preactStarter: Template;
}
declare module "localpen/templates/react-starter" {
    import { Template } from "localpen/models";
    export const reactStarter: Template;
}
declare module "localpen/templates/readme-template" {
    import { Template } from "localpen/models";
    export const readmeTemplate: Template;
}
declare module "localpen/templates/tailwindcss-starter" {
    import { Template } from "localpen/models";
    export const tailwindcssStarter: Template;
}
declare module "localpen/templates/typescript-starter" {
    import { Template } from "localpen/models";
    export const typescriptStarter: Template;
}
declare module "localpen/templates/vue-starter" {
    import { Template } from "localpen/models";
    export const vueStarter: Template;
}
declare module "localpen/templates/index" {
    export const starterTemplates: import("localpen/models").Template[];
}
declare module "localpen/import/url" {
    import { EditorId, Language, Pen } from "localpen/models";
    type Selectors = {
        [key in EditorId]: {
            language: Language;
            selector: string;
        };
    };
    export const getLanguageSelectors: (params: {
        [key: string]: string;
    }) => Selectors;
    export const importFromUrl: (url: string, params: {
        [key: string]: string;
    }, config: Pen) => Promise<Partial<Pen>>;
}
declare module "localpen/import/github" {
    import { Pen } from "localpen/models";
    export const isGithubUrl: (url: string, patterns?: string[]) => boolean | undefined;
    export const importFromGithub: (url: string) => Promise<Partial<Pen>>;
}
declare module "localpen/import/utils" {
    import { EditorId, Language, Pen } from "localpen/models";
    export interface sourceFile {
        filename: string;
        language: Language;
        content: string;
        editorId: EditorId;
    }
    export interface FileData {
        rawURL: string;
        extension: Language;
        startLine: number;
        endLine: number;
    }
    export const getValidUrl: (url: string) => URL | undefined;
    export const populateConfig: (files: Array<Partial<sourceFile>>, params: {
        [key: string]: string;
    }) => Partial<Pen>;
    export const hostPatterns: {
        github: string[];
        githubGist: string[];
        gitlab: string[];
    };
}
declare module "localpen/import/github-dir" {
    export const isGithubDir: (url: string, patterns?: string[]) => boolean | undefined;
    export const importFromGithubDir: (url: string, params: {
        [key: string]: string;
    }) => Promise<Partial<import("localpen/models").Pen>>;
}
declare module "localpen/import/github-gist" {
    export const isGithubGist: (url: string, patterns?: string[]) => boolean;
    export const importFromGithubGist: (url: string, params: {
        [key: string]: string;
    }) => Promise<{}>;
}
declare module "localpen/import/gitlab" {
    import { Pen } from "localpen/models";
    export const isGitlabUrl: (url: string, patterns?: string[]) => boolean | undefined;
    export const importFromGitlab: (url: string) => Promise<Partial<Pen>>;
}
declare module "localpen/import/gitlab-dir" {
    export const isGitlabDir: (url: string, patterns?: string[]) => boolean | undefined;
    export const importFromGitlabDir: (url: string, params: {
        [key: string]: string;
    }) => Promise<Partial<import("localpen/models").Pen>>;
}
declare module "localpen/import/gitlab-snippet" {
    export const isGitlabSnippet: (url: string, patterns?: string[]) => boolean | undefined;
    export const importFromGitlabSnippet: (url: string, params: {
        [key: string]: string;
    }) => Promise<Partial<import("localpen/models").Pen>>;
}
declare module "localpen/import/import" {
    import { Pen } from "localpen/models";
    export const importCode: (url: string, params: {
        [key: string]: any;
    }, config: Pen) => Promise<Partial<Pen>>;
}
declare module "localpen/import/index" {
    export * from "localpen/import/url";
    export * from "localpen/import/import";
}
declare module "localpen/config" {
    import { Pen } from "localpen/models";
    export const defaultConfig: Pen;
    export const loadConfig: (userConfig?: Partial<Pen>) => Promise<Pen>;
}
declare module "localpen/app" {
    import { Pen } from "localpen/models";
    export const app: (config: Pen) => Promise<{
        run: () => Promise<void>;
        save: () => void;
        getData: () => any;
    }>;
}
declare const container = "#pen";
declare const style: HTMLStyleElement;
declare const iframe: HTMLIFrameElement;
declare const containerElement: Element | null;
declare module "localpen/index" {
    import { Pen } from "localpen/models";
    export const localpen: (container: string, config?: Partial<Pen>) => Promise<unknown>;
}
declare module "localpen/import/__tests__/github.spec" { }
declare module "localpen/import/__tests__/url.spec" { }
