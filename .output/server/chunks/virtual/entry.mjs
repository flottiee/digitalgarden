import { defineProdDiagnostics } from 'nostics';
import { ansiFormatter } from 'nostics/formatters/ansi';
import { createApp, provide, onErrorCaptured, onServerPrefetch, unref, createVNode, resolveDynamicComponent, shallowReactive, reactive, effectScope, hasInjectionContext, getCurrentInstance, inject, defineAsyncComponent, mergeProps, defineComponent, withCtx, createTextVNode, getCurrentScope, toRef, computed, isVNode, openBlock, createBlock, renderSlot, createCommentVNode, useSlots, Fragment, toDisplayString, ref, watchEffect, onScopeDispose, readonly, watch, nextTick, isRef, toValue, h, isReadonly, useSSRContext, isShallow, isReactive, toRaw, createSlots } from 'vue';
import { e as createError, $ as $fetch, B as isEqual, C as stringifyParsedURL, D as stringifyQuery, t as joinURL, E as parseQuery, F as withQuery, G as sanitizeStatusCode, H as parseURL, I as decodePath, J as isScriptProtocol } from '../nitro/nitro.mjs';
import { b as baseURL } from '../routes/renderer.mjs';
import { ssrRenderSuspense, ssrRenderComponent, ssrRenderVNode, ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderSlot, ssrRenderClass, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { Sun, Monitor, Moon } from '@lucide/vue';
import { useResizeObserver, reactiveOmit } from '@vueuse/core';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cva } from 'class-variance-authority';
import { Primitive, useForwardPropsEmits, TooltipRoot, TooltipProvider, TooltipTrigger, TooltipPortal, TooltipContent, TooltipArrow } from 'reka-ui';

function _getAsyncLocalStorage() {
	return globalThis.AsyncLocalStorage || globalThis.process?.getBuiltinModule?.("node:async_hooks")?.AsyncLocalStorage;
}
const _WeakRef = globalThis.WeakRef || class StrongRef {
	#value;
	constructor(value) {
		this.#value = value;
	}
	deref() {
		return this.#value;
	}
};
function createContext(opts = {}) {
	let currentInstance;
	let isSingleton = false;
	const checkConflict = (instance) => {
		if (currentInstance && currentInstance !== instance) throw new Error("Context conflict");
	};
	let als;
	if (opts.asyncContext) {
		const _AsyncLocalStorage = opts.AsyncLocalStorage || _getAsyncLocalStorage();
		if (_AsyncLocalStorage) als = new _AsyncLocalStorage();
		else console.warn("[unctx] `AsyncLocalStorage` is not provided.");
	}
	const _wrapInstance = (instance) => als && instance !== null && typeof instance === "object" ? { __unctx_weak: new _WeakRef(instance) } : instance;
	const _unwrapInstance = (store) => store && store.__unctx_weak ? store.__unctx_weak.deref() : store;
	const _getCurrentInstance = () => {
		if (als) {
			const store = als.getStore();
			if (store !== void 0) return _unwrapInstance(store);
		}
		return currentInstance;
	};
	return {
		use: () => {
			const _instance = _getCurrentInstance();
			if (_instance === void 0) throw new Error("Context is not available");
			return _instance;
		},
		tryUse: () => {
			return _getCurrentInstance() ?? null;
		},
		set: (instance, replace) => {
			if (!replace) checkConflict(instance);
			currentInstance = instance;
			isSingleton = true;
		},
		unset: () => {
			currentInstance = void 0;
			isSingleton = false;
		},
		call: (instance, callback) => {
			checkConflict(instance);
			currentInstance = instance;
			try {
				return als ? als.run(_wrapInstance(instance), callback) : callback();
			} finally {
				if (!isSingleton) currentInstance = void 0;
			}
		},
		async callAsync(instance, callback) {
			currentInstance = instance;
			const onRestore = () => {
				currentInstance = instance;
			};
			const onLeave = () => currentInstance === instance ? onRestore : void 0;
			asyncHandlers.add(onLeave);
			try {
				const r = als ? als.run(_wrapInstance(instance), callback) : callback();
				if (!isSingleton) currentInstance = void 0;
				return await r;
			} finally {
				asyncHandlers.delete(onLeave);
			}
		}
	};
}
function createNamespace(defaultOpts = {}) {
	const contexts = {};
	return { get(key, opts = {}) {
		if (!contexts[key]) contexts[key] = createContext({
			...defaultOpts,
			...opts
		});
		return contexts[key];
	} };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
const defaultNamespace = _globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());

function flatHooks(configHooks, hooks = {}, parentName) {
	for (const key in configHooks) {
		const subHook = configHooks[key];
		const name = parentName ? `${parentName}:${key}` : key;
		if (typeof subHook === "object" && subHook !== null) flatHooks(subHook, hooks, name);
		else if (typeof subHook === "function") hooks[name] = subHook;
	}
	return hooks;
}
const createTask = /* @__PURE__ */ (() => {
	if (console.createTask) return console.createTask;
	const defaultTask = { run: (fn) => fn() };
	return () => defaultTask;
})();
function callHooks(hooks, args, startIndex, task) {
	for (let i = startIndex; i < hooks.length; i += 1) try {
		const result = task ? task.run(() => hooks[i](...args)) : hooks[i](...args);
		if (result && typeof result.then === "function") return Promise.resolve(result).then(() => callHooks(hooks, args, i + 1, task));
	} catch (error) {
		return Promise.reject(error);
	}
}
function serialTaskCaller(hooks, args, name) {
	if (hooks.length > 0) return callHooks(hooks, args, 0, createTask(name));
}
function parallelTaskCaller(hooks, args, name) {
	if (hooks.length > 0) {
		const task = createTask(name);
		return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
	}
}
function callEachWith(callbacks, arg0) {
	for (const callback of [...callbacks]) callback(arg0);
}
var Hookable = class {
	_hooks;
	_before;
	_after;
	_deprecatedHooks;
	_deprecatedMessages;
	constructor() {
		this._hooks = {};
		this._before = void 0;
		this._after = void 0;
		this._deprecatedMessages = void 0;
		this._deprecatedHooks = {};
		this.hook = this.hook.bind(this);
		this.callHook = this.callHook.bind(this);
		this.callHookWith = this.callHookWith.bind(this);
	}
	hook(name, function_, options = {}) {
		if (!name || typeof function_ !== "function") return () => {};
		const originalName = name;
		let dep;
		while (this._deprecatedHooks[name]) {
			dep = this._deprecatedHooks[name];
			name = dep.to;
		}
		if (dep && !options.allowDeprecated) {
			let message = dep.message;
			if (!message) message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
			if (!this._deprecatedMessages) this._deprecatedMessages = /* @__PURE__ */ new Set();
			if (!this._deprecatedMessages.has(message)) {
				console.warn(message);
				this._deprecatedMessages.add(message);
			}
		}
		if (!function_.name) try {
			Object.defineProperty(function_, "name", {
				get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
				configurable: true
			});
		} catch {}
		this._hooks[name] = this._hooks[name] || [];
		this._hooks[name].push(function_);
		return () => {
			if (function_) {
				this.removeHook(name, function_);
				function_ = void 0;
			}
		};
	}
	hookOnce(name, function_) {
		let _unreg;
		let _function = (...arguments_) => {
			if (typeof _unreg === "function") _unreg();
			_unreg = void 0;
			_function = void 0;
			return function_(...arguments_);
		};
		_unreg = this.hook(name, _function);
		return _unreg;
	}
	removeHook(name, function_) {
		const hooks = this._hooks[name];
		if (hooks) {
			const index = hooks.indexOf(function_);
			if (index !== -1) hooks.splice(index, 1);
			if (hooks.length === 0) this._hooks[name] = void 0;
		}
	}
	clearHook(name) {
		this._hooks[name] = void 0;
	}
	deprecateHook(name, deprecated) {
		this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
		const _hooks = this._hooks[name] || [];
		this._hooks[name] = void 0;
		for (const hook of _hooks) this.hook(name, hook);
	}
	deprecateHooks(deprecatedHooks) {
		for (const name in deprecatedHooks) this.deprecateHook(name, deprecatedHooks[name]);
	}
	addHooks(configHooks) {
		const hooks = flatHooks(configHooks);
		const removeFns = Object.keys(hooks).map((key) => this.hook(key, hooks[key]));
		return () => {
			for (const unreg of removeFns) unreg();
			removeFns.length = 0;
		};
	}
	removeHooks(configHooks) {
		const hooks = flatHooks(configHooks);
		for (const key in hooks) this.removeHook(key, hooks[key]);
	}
	removeAllHooks() {
		this._hooks = {};
	}
	callHook(name, ...args) {
		return this.callHookWith(serialTaskCaller, name, args);
	}
	callHookParallel(name, ...args) {
		return this.callHookWith(parallelTaskCaller, name, args);
	}
	callHookWith(caller, name, args) {
		const event = this._before || this._after ? {
			name,
			args,
			context: {}
		} : void 0;
		if (this._before) callEachWith(this._before, event);
		const result = caller(this._hooks[name] ? [...this._hooks[name]] : [], args, name);
		if (result instanceof Promise) return result.finally(() => {
			if (this._after && event) callEachWith(this._after, event);
		});
		if (this._after && event) callEachWith(this._after, event);
		return result;
	}
	beforeEach(function_) {
		this._before = this._before || [];
		this._before.push(function_);
		return () => {
			if (this._before !== void 0) {
				const index = this._before.indexOf(function_);
				if (index !== -1) this._before.splice(index, 1);
			}
		};
	}
	afterEach(function_) {
		this._after = this._after || [];
		this._after.push(function_);
		return () => {
			if (this._after !== void 0) {
				const index = this._after.indexOf(function_);
				if (index !== -1) this._after.splice(index, 1);
			}
		};
	}
};
function createHooks() {
	return new Hookable();
}

// node_modules/nuxt/dist/app/diagnostics/_shared.js
/**
* Shared configuration for the runtime (E<N>xxx) diagnostics catalogs.
*
* Catalogs are split by domain and imported directly where used (no barrel),
* so the browser bundle only pulls in the codes a module references. Pair the
* pure-call annotations on each `defineDiagnostics()` with dev-guarded,
* statement-level report calls so report-only diagnostics strip from production.
*
* Codes are stable, fully-qualified `NUXT_E<NNNN>` identifiers. Codes with a
* dedicated docs page resolve a `see:` URL via {@link docsBase}; the rest opt
* out with `docs: false`.
*/
function docsBase(code) {
	return `https://nuxt.com/docs/4.x/errors/${code.replace("NUXT_", "").toLowerCase()}`;
}
var ansi = (open, close) => (s) => `\x1B[${open}m${s}\x1B[${close}m`;
var colors = {
	red: ansi(31, 39),
	yellow: ansi(33, 39),
	cyan: ansi(36, 39),
	gray: ansi(90, 39),
	bold: ansi(1, 22),
	dim: ansi(2, 22)
};
ansiFormatter(colors);
var prodReporter = (diagnostic) => {
	console.error(`[${diagnostic.name}]`);
};
var prodReporters = [prodReporter];
// node_modules/nuxt/dist/app/diagnostics/core.js
/**
* E1xxx
* Core / Nuxt-instance / lifecycle runtime diagnostics.
*/
var appDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
// node_modules/nuxt/dist/app/internal/context.js
globalThis.__nuxt_app_ctx__ ||= {};
function getContext$2(key, opts) {
	return getContext(key, opts);
}
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fnuxt.config.mjs
var nuxtLinkDefaults = {
	"componentName": "NuxtLink"};
// node_modules/nuxt/dist/app/nuxt.js
function getNuxtAppCtx(id = "nuxt-app") {
	return getContext$2(id, { asyncContext: false });
}
var NuxtPluginIndicator = "__nuxt_plugin";
/** @since 3.0.0 */
function createNuxtApp(options) {
	let hydratingCount = 0;
	const nuxtApp = {
		_id: options.id || "nuxt-app",
		_scope: effectScope(),
		provide: void 0,
		versions: {
			get nuxt() {
				return "4.6.3";
			},
			get vue() {
				return nuxtApp.vueApp.version;
			}
		},
		payload: shallowReactive({
			...options.ssrContext?.payload || {},
			data: shallowReactive({}),
			state: reactive({}),
			once: /* @__PURE__ */ new Set(),
			_errors: shallowReactive({})
		}),
		static: { data: {} },
		runWithContext(fn) {
			if (nuxtApp._scope.active && !getCurrentScope()) return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
			return callWithNuxt(nuxtApp, fn);
		},
		isHydrating: false,
		deferHydration() {
			if (!nuxtApp.isHydrating) return () => {};
			hydratingCount++;
			let called = false;
			return () => {
				if (called) return;
				called = true;
				hydratingCount--;
				if (hydratingCount === 0) {
					nuxtApp.isHydrating = false;
					return nuxtApp.callHook("app:suspense:resolve");
				}
			};
		},
		_asyncDataPromises: {},
		_asyncData: shallowReactive({}),
		_state: shallowReactive({}),
		_payloadRevivers: {},
		...options
	};
	nuxtApp.payload.serverRendered = true;
	if (nuxtApp.ssrContext) {
		nuxtApp.payload.path = nuxtApp.ssrContext.url;
		nuxtApp.ssrContext.nuxt = nuxtApp;
		nuxtApp.ssrContext.payload = nuxtApp.payload;
		nuxtApp.ssrContext.config = {
			public: nuxtApp.ssrContext.runtimeConfig.public,
			app: nuxtApp.ssrContext.runtimeConfig.app
		};
	}
	nuxtApp.hooks = createHooks();
	nuxtApp.hook = nuxtApp.hooks.hook;
	{
		const runHooks = async (hooks, args) => {
			for (const hook of hooks) await nuxtApp.runWithContext(() => hook(...args));
		};
		const contextCaller = runHooks;
		nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, args);
	}
	nuxtApp.callHook = nuxtApp.hooks.callHook;
	nuxtApp.provide = (name, value) => {
		const $name = "$" + name;
		defineGetter(nuxtApp, $name, value);
		defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
	};
	defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
	defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
	const runtimeConfig = options.ssrContext.runtimeConfig;
	nuxtApp.provide("config", runtimeConfig);
	return nuxtApp;
}
/** @since 3.0.0 */
async function applyPlugin(nuxtApp, plugin) {
	if (typeof plugin === "function") {
		const run = () => nuxtApp.runWithContext(() => plugin(nuxtApp));
		const { provide } = await run() || {};
		if (provide && typeof provide === "object") for (const key in provide) nuxtApp.provide(key, provide[key]);
	}
}
/** @since 3.0.0 */
async function applyPlugins(nuxtApp, plugins) {
	let error;
	for (const plugin of plugins) try {
		await applyPlugin(nuxtApp, plugin);
	} catch (e) {
		if (!nuxtApp.payload.error) throw e;
		error ||= e;
	}
	if (error) throw nuxtApp.payload.error || error;
}
/** @since 3.0.0 */
/* @__NO_SIDE_EFFECTS__ */
function defineNuxtPlugin(plugin) {
	if (typeof plugin === "function") return plugin;
	const _name = plugin._name || plugin.name;
	delete plugin.name;
	return Object.assign(plugin.setup || (() => {}), plugin, {
		[NuxtPluginIndicator]: true,
		_name
	});
}
/**
* Ensures that the setup function passed in has access to the Nuxt instance via `useNuxtApp`.
* @param nuxt A Nuxt instance
* @param setup The function to call
* @since 3.0.0
*/
function callWithNuxt(nuxt, setup, args) {
	const fn = () => setup();
	const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
	return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
}
function tryUseNuxtApp(id) {
	let nuxtAppInstance;
	if (hasInjectionContext()) nuxtAppInstance = getCurrentInstance()?.appContext.app.$nuxt;
	nuxtAppInstance ||= getNuxtAppCtx(id).tryUse();
	return nuxtAppInstance || null;
}
function useNuxtApp(id) {
	const nuxtAppInstance = tryUseNuxtApp(id);
	if (!nuxtAppInstance) throw appDiagnostics.NUXT_E1001();
	return nuxtAppInstance;
}
/** @since 3.0.0 */
/* @__NO_SIDE_EFFECTS__ */
function useRuntimeConfig(_event) {
	return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
	Object.defineProperty(obj, key, { get: () => val });
}
// node_modules/nuxt/dist/app/error.js
var NUXT_ERROR_SIGNATURE = "__nuxt_error";
/** @since 3.0.0 */
var isNuxtError = (error) => !!error && typeof error === "object" && "__nuxt_error" in error;
/** @since 3.0.0 */
var createError$2 = (error) => {
	if (isNuxtError(error)) return error;
	if (typeof error !== "string" && error?.statusText) error.message ??= error.statusText;
	const nuxtError = createError(error ?? {});
	Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
		value: true,
		configurable: false,
		writable: false
	});
	Object.defineProperty(nuxtError, "status", {
		get: () => nuxtError.statusCode,
		configurable: true
	});
	Object.defineProperty(nuxtError, "statusText", {
		get: () => nuxtError.statusMessage,
		configurable: true
	});
	return nuxtError;
};
// node_modules/nuxt/dist/app/utils.js
var PROBE_BASE_A = "https://a.invalid/probe/";
var PROBE_BASE_B = "https://b.invalid/probe/";
function parseAnchorURL(value, base = PROBE_BASE_A) {
	try {
		return new URL(value, base);
	} catch {
		return null;
	}
}
function resolvesWithoutBase(value) {
	const resolved = parseAnchorURL(value);
	return !!resolved && resolved.href === parseAnchorURL(value, PROBE_BASE_B)?.href;
}
/** Whether a URL string is a path rooted at the current origin, so carries no protocol. */
function isRootedPath(value) {
	if (value[0] !== "/" || value[1] === "/" || value[1] === "\\") return false;
	return value[1] !== "	" && value[1] !== "\n" && value[1] !== "\r" || !resolvesWithoutBase(value);
}
/** Whether a URL string carries its own protocol or authority. */
function isAbsoluteHref(value) {
	return !!value && !isRootedPath(value) && resolvesWithoutBase(value);
}
/** The script-capable protocol a URL string would navigate to, or `null` when it is safe. */
function getScriptProtocol(value) {
	if (!value || isRootedPath(value)) return null;
	let resolved = parseAnchorURL(value.replace(/[\u0000-\u001F\u007F\s]+/g, ""));
	while (resolved?.protocol === "view-source:") resolved = parseAnchorURL(resolved.pathname);
	if (!resolved) return "";
	return isScriptProtocol(resolved.protocol) ? resolved.protocol : null;
}
/** Returns the value unchanged when safe to use as an anchor `href`, or `null`. */
function sanitizeAnchorHref(value) {
	return getScriptProtocol(value) === null ? value : null;
}
// node_modules/nuxt/dist/app/components/injections.js
var PageRouteSymbol = Symbol("route");
// node_modules/nuxt/dist/app/diagnostics/navigation.js
/**
* E2xxx
* Navigation / routing / middleware runtime diagnostics.
*/
var navigationDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
// node_modules/nuxt/dist/app/composables/router.js
/** @since 3.0.0 */
var useRouter = (() => {
	return useNuxtApp()?.$router;
});
/**
* Whether the current effect scope is (a descendant of) the component instance's scope.
* A detached scope (e.g. `createSharedComposable`) outlives the component, so the
* per-page route injected there would freeze after navigation (#18903).
*/
function getParentScope(scope) {
	const internal = scope;
	return internal.parent ?? internal.subs?.sub;
}
function isScopeWithinInstance(instance) {
	const instanceScope = instance.scope;
	let scope = getCurrentScope();
	while (scope) {
		if (scope === instanceScope) return true;
		scope = getParentScope(scope);
	}
	return false;
}
/** @since 3.0.0 */
var useRoute = (() => {
	if (hasInjectionContext()) {
		const instance = getCurrentInstance();
		if (!instance || isScopeWithinInstance(instance)) return inject(PageRouteSymbol, useNuxtApp()._route);
	}
	return useNuxtApp()._route;
});
/** @since 3.0.0 */
/* @__NO_SIDE_EFFECTS__ */
function defineNuxtRouteMiddleware(middleware) {
	return middleware;
}
/** @since 3.0.0 */
var isProcessingMiddleware = () => {
	try {
		if (useNuxtApp()._processingMiddleware) return true;
	} catch {
		return false;
	}
	return false;
};
var HTML_ATTR_UNSAFE_RE = /[&"'<>]/g;
var HTML_ATTR_ENCODE_MAP = {
	"&": "&amp;",
	"\"": "&quot;",
	"'": "&#x27;",
	"<": "&lt;",
	">": "&gt;"
};
function encodeForHtmlAttr(value) {
	return value.replace(HTML_ATTR_UNSAFE_RE, (c) => HTML_ATTR_ENCODE_MAP[c]);
}
function navigateTo(to, options) {
	to ||= "/";
	const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
	const isExternalHost = isAbsoluteHref(toPath);
	const isExternal = options?.external || isExternalHost;
	if (isExternal) {
		if (!options?.external) throw navigationDiagnostics.NUXT_E2001({ toPath });
		const protocol = getScriptProtocol(toPath);
		if (protocol !== null) throw navigationDiagnostics.NUXT_E2002({
			toPath,
			protocol
		});
	}
	const inMiddleware = isProcessingMiddleware();
	const router = useRouter();
	const nuxtApp = useNuxtApp();
	if (nuxtApp.ssrContext) {
		const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
		const location = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
		const redirect = async function(response) {
			await nuxtApp.callHook("app:redirected");
			const encodedHeader = encodeURL(location, isExternalHost);
			const encodedLoc = encodeForHtmlAttr(encodedHeader);
			nuxtApp.ssrContext["~renderResponse"] = {
				statusCode: sanitizeStatusCode(options?.redirectCode || 302, 302),
				body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
				headers: { location: encodedHeader }
			};
			return response;
		};
		if (!isExternal && inMiddleware) {
			let expectedPath = fullPath;
			if (typeof to === "string" && toPath.includes("?")) {
				const target = router.resolve(to);
				expectedPath = router.resolve({
					path: target.path,
					query: target.query,
					hash: target.hash
				}).fullPath || "/";
			}
			router.afterEach((final) => final.fullPath === expectedPath ? redirect(false) : void 0);
			return to;
		}
		return redirect(!inMiddleware ? void 0 : false);
	}
	if (isExternal) {
		nuxtApp._cookieWriters?.forEach((write) => write());
		(void 0).addEventListener("pagehide", (event) => {
			if (!event.persisted) nuxtApp._scope.stop();
		}, { once: true });
		if (options?.replace) (void 0).replace(toPath);
		else (void 0).href = toPath;
		if (inMiddleware) {
			if (!nuxtApp.isHydrating) return false;
			return new Promise(() => {});
		}
		return Promise.resolve();
	}
	const encodedTo = typeof to === "string" ? encodeRoutePath(to) : to;
	return options?.replace ? router.replace(encodedTo) : router.push(encodedTo);
}
/**
* @internal
*/
function resolveRouteObject(to) {
	return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
/**
* @internal
*/
function encodeURL(location, isExternalHost = false) {
	const url = new URL(location, "http://localhost");
	if (!isExternalHost) return url.pathname.replace(/^\/{2,}/, "/") + url.search + url.hash;
	if (location.startsWith("//")) return url.toString().replace(url.protocol, "");
	return url.toString();
}
/**
* Encode the pathname of a route location string. Ensures decoded paths like
* `/café` are percent-encoded to match vue-router's encoded route records.
* Already-encoded paths are not double-encoded.
* @internal
*/
function encodeRoutePath(url) {
	const parsed = parseURL(url);
	return encodeVueRouterPath(decodePath(parsed.pathname)) + parsed.search + parsed.hash;
}
var ENC_PIPE_RE = /%7C/g;
var ENC_BRACKET_OPEN_RE = /%5B/g;
var ENC_BRACKET_CLOSE_RE = /%5D/g;
var ENC_ENC_SLASH_RE = /%252F/gi;
var HASH_RE = /#/g;
var QUESTION_MARK_RE = /\?/g;
/**
* Apply vue-router's own path encoding, which leaves sub-delimiters like `&`
* and `+` literal. This must stay in sync with `encodeVueRouterPath` in
* `unrouting`, which encodes the route records we need to match against.
*/
function encodeVueRouterPath(value) {
	return encodeURI(value).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]").replace(HASH_RE, "%23").replace(QUESTION_MARK_RE, "%3F").replace(ENC_ENC_SLASH_RE, "%2F");
}
// node_modules/nuxt/dist/app/composables/error.js
/** @since 3.0.0 */
var useError = /* @__NO_SIDE_EFFECTS__ */ () => toRef(useNuxtApp().payload, "error");
/** @since 3.0.0 */
var showError = (error) => {
	const nuxtError = createError$2(error);
	try {
		const error = /* @__PURE__ */ useError();
		error.value ||= nuxtError;
	} catch {
		throw nuxtError;
	}
	return nuxtError;
};
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Ffetch.mjs
if (!globalThis.$fetch) globalThis.$fetch = $fetch.create({ baseURL: baseURL() });
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fglobal-polyfills.mjs
if (!("global" in globalThis)) globalThis.global = globalThis;
// node_modules/nuxt/dist/head/runtime/island-head.js
/**
* No-op `head.push` until the returned `unfreeze` runs. Plugin/transformer
* augmentations on the same head are unaffected.
*/
function freezeHead(head) {
	const realPush = head.push;
	head.push = () => ({
		dispose: () => {},
		patch: () => {},
		_i: 0
	});
	return () => {
		head.push = realPush;
	};
}
// node_modules/nuxt/dist/head/runtime/plugins/unhead.server.js
var plugin$2 = /* @__PURE__ */ defineNuxtPlugin({
	name: "nuxt:head",
	enforce: "pre",
	setup(nuxtApp) {
		const head = nuxtApp.ssrContext.head;
		if (nuxtApp.ssrContext.islandContext) {
			const unfreeze = freezeHead(head);
			nuxtApp.hooks.hookOnce("app:created", unfreeze);
		}
		nuxtApp.vueApp.use(head);
	}
});
// node_modules/nuxt/dist/app/diagnostics/manifest.js
/**
* E5xxx
* App manifest / route-rules runtime diagnostics.
*/
var manifestDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Froute-rules.mjs
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froute_rules_default = () => ({});
// node_modules/nuxt/dist/app/composables/manifest.js
function routeRulesMatcher(path) {
	return virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froute_rules_default();
}
function getRouteRules(arg) {
	const path = typeof arg === "string" ? arg : arg.path;
	try {
		return routeRulesMatcher(path);
	} catch (e) {
		manifestDiagnostics.NUXT_E5003({
			path,
			cause: e
		});
		return {};
	}
}
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fmiddleware.mjs
var globalMiddleware = [/* @__PURE__ */ defineNuxtRouteMiddleware((to) => {
	if (!useNuxtApp().ssrContext?.islandContext) return;
	const rules = getRouteRules({ path: to.path });
	if (rules.redirect) {
		const path = rules.redirect.includes("#") ? rules.redirect : rules.redirect + to.hash;
		return navigateTo(path, { external: isAbsoluteHref(path) });
	}
})];
// node_modules/nuxt/dist/app/plugins/router.js
var LITERAL_PATH_RE = /^\/[\w\-./~!$&'()*+,;=:@]*$/;
/** Split a rooted path as the `URL` parser would, or `undefined` if it needs the parser. */
function splitLiteralPath(fullPath) {
	const hashIndex = fullPath.indexOf("#");
	const withoutHash = hashIndex === -1 ? fullPath : fullPath.slice(0, hashIndex);
	const searchIndex = withoutHash.indexOf("?");
	const path = searchIndex === -1 ? withoutHash : withoutHash.slice(0, searchIndex);
	if (path.includes("/.") || !LITERAL_PATH_RE.test(path)) return;
	return {
		path,
		search: searchIndex === -1 ? "" : withoutHash.slice(searchIndex),
		hash: hashIndex === -1 || hashIndex === fullPath.length - 1 ? "" : fullPath.slice(hashIndex)
	};
}
function getRouteFromPath(fullPath, baseURL = "/") {
	const route = fullPath && typeof fullPath === "object" ? fullPath : {};
	if (typeof fullPath === "object") fullPath = stringifyParsedURL({
		pathname: fullPath.path || "",
		search: stringifyQuery(fullPath.query || {}),
		hash: fullPath.hash || ""
	});
	const isRooted = isRootedPath(fullPath);
	let parts = isRooted ? splitLiteralPath(fullPath) : void 0;
	if (!parts) {
		const url = new URL(fullPath, "http://localhost");
		parts = {
			path: url.pathname,
			search: url.search,
			hash: url.hash
		};
	}
	return {
		path: parts.path,
		fullPath,
		query: parts.search ? parseQuery(parts.search) : {},
		hash: parts.hash,
		params: route.params || {},
		name: void 0,
		matched: route.matched || [],
		redirectedFrom: void 0,
		meta: route.meta || {},
		href: isRooted ? baseURL === "/" ? fullPath : joinURL(baseURL, fullPath) : sanitizeAnchorHref(fullPath)
	};
}
var plugin$1 = /* @__PURE__ */ defineNuxtPlugin({
	name: "nuxt:router",
	enforce: "pre",
	setup(nuxtApp) {
		const initialURL = nuxtApp.ssrContext.url;
		const routes = [];
		const hooks = {
			"navigate:before": [],
			"resolve:before": [],
			"navigate:after": [],
			"error": []
		};
		const registerHook = (hook, guard) => {
			hooks[hook].push(guard);
			return () => {
				const index = hooks[hook].indexOf(guard);
				if (index !== -1) hooks[hook].splice(index, 1);
			};
		};
		const baseURL = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
		const route = reactive(getRouteFromPath(initialURL, baseURL));
		let navigationCounter = 0;
		async function handleNavigation(url, replace) {
			const navigationId = ++navigationCounter;
			try {
				const to = getRouteFromPath(url, baseURL);
				for (const middleware of hooks["navigate:before"]) {
					const result = await middleware(to, route);
					if (navigationId !== navigationCounter) return;
					if (result === false || result instanceof Error) return;
					if (typeof result === "string" && result.length) return await handleNavigation(result, true);
				}
				for (const handler of hooks["resolve:before"]) {
					await handler(to, route);
					if (navigationId !== navigationCounter) return;
				}
				Object.assign(route, to);
				for (const middleware of hooks["navigate:after"]) await middleware(to, route);
			} catch (err) {
				for (const handler of hooks.error) await handler(err);
			} finally {
				if (navigationId === navigationCounter) {
					delete nuxtApp._middlewareTo;
					delete nuxtApp._processingMiddleware;
				}
			}
		}
		const router = {
			currentRoute: computed(() => route),
			isReady: () => Promise.resolve(),
			options: {},
			install: () => Promise.resolve(),
			push: (url) => handleNavigation(url),
			replace: (url) => handleNavigation(url),
			back: () => (void 0).history.go(-1),
			go: (delta) => (void 0).history.go(delta),
			forward: () => (void 0).history.go(1),
			beforeResolve: (guard) => registerHook("resolve:before", guard),
			beforeEach: (guard) => registerHook("navigate:before", guard),
			afterEach: (guard) => registerHook("navigate:after", guard),
			onError: (handler) => registerHook("error", handler),
			resolve: (url) => getRouteFromPath(url, baseURL),
			addRoute: (parentName, route) => {
				routes.push(route);
			},
			getRoutes: () => routes,
			hasRoute: (name) => routes.some((route) => route.name === name),
			removeRoute: (name) => {
				const index = routes.findIndex((route) => route.name === name);
				if (index !== -1) routes.splice(index, 1);
			}
		};
		nuxtApp.vueApp.component("RouterLink", defineComponent({
			functional: true,
			props: {
				to: {
					type: String,
					required: true
				},
				custom: Boolean,
				replace: Boolean,
				activeClass: String,
				exactActiveClass: String,
				ariaCurrentValue: String
			},
			setup: (props, { slots }) => {
				const navigate = () => handleNavigation(props.to, props.replace);
				const resolved = computed(() => router.resolve(props.to));
				const isExternal = computed(() => isAbsoluteHref(props.to));
				return () => {
					const href = resolved.value.href;
					if (props.custom) return slots.default?.({
						href,
						navigate,
						route: resolved.value
					});
					if (isExternal.value) return h("a", { href }, slots);
					return h("a", {
						href,
						onClick: (e) => {
							e.preventDefault();
							return navigate();
						}
					}, slots);
				};
			}
		}));
		nuxtApp._route = route;
		nuxtApp._middleware ||= {
			global: [],
			named: {}
		};
		const initialLayout = nuxtApp.payload.state._layout;
		const initialLayoutProps = nuxtApp.payload.state._layoutProps;
		nuxtApp.hooks.hookOnce("app:created", async () => {
			async function runMiddleware(to, from) {
				to.meta = reactive(to.meta || {});
				if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
					to.meta.layout = initialLayout;
					to.meta.layoutProps = initialLayoutProps;
				}
				nuxtApp._processingMiddleware = true;
				nuxtApp._middlewareTo = to;
				if (!nuxtApp.ssrContext?.islandContext) {
					const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
					const routeRules = getRouteRules({ path: to.path });
					if (routeRules.appMiddleware) for (const key in routeRules.appMiddleware) {
						const guard = nuxtApp._middleware.named[key];
						if (!guard) continue;
						if (routeRules.appMiddleware[key]) middlewareEntries.add(guard);
						else middlewareEntries.delete(guard);
					}
					for (const middleware of middlewareEntries) {
						const run = () => nuxtApp.runWithContext(() => middleware(to, from));
						const result = await run();
						if (result === false || result instanceof Error) {
							const error = result || createError({
								status: 404,
								statusText: `Page Not Found: ${initialURL}`,
								data: { path: initialURL }
							});
							delete nuxtApp._processingMiddleware;
							delete nuxtApp._middlewareTo;
							return nuxtApp.runWithContext(() => showError(error));
						}
						if (result === true) continue;
						if (result || result === false) return result;
					}
				}
			}
			router.beforeEach(async (to, from) => {
				return runMiddleware(to, from);
			});
			router.afterEach(() => {
				delete nuxtApp._processingMiddleware;
				delete nuxtApp._middlewareTo;
			});
			await router.replace(initialURL);
			if (!isEqual(route.fullPath, initialURL)) await nuxtApp.runWithContext(() => navigateTo(route.fullPath));
		});
		return { provide: {
			route,
			router
		} };
	}
});
// node_modules/nuxt/dist/app/diagnostics/head.js
/**
* E6xxx
* Head / unhead runtime diagnostics.
*/
var unheadDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
// node_modules/nuxt/node_modules/unhead/dist/shared/unhead.CGPOfp5O.mjs
// @__NO_SIDE_EFFECTS__
function isUnsafeKey(key) {
	return key === "__proto__" || key === "constructor" || key === "prototype";
}
// node_modules/nuxt/node_modules/unhead/dist/shared/unhead.DJuZwX9c.mjs
function walkResolver(val, resolve, key) {
	if (key === "_resolver") return val;
	if (typeof val === "function" && (!key || key !== "titleTemplate" && !key.startsWith("on"))) val = val();
	const v = resolve ? resolve(key, val) : val;
	if (Array.isArray(v)) {
		let out;
		for (let i = 0; i < v.length; i++) {
			const r = walkResolver(v[i], resolve);
			if (out) out[i] = r;
			else if (r !== v[i]) {
				out = v.slice(0, i);
				out[i] = r;
			}
		}
		return out || v;
	}
	if (v?.constructor === Object) {
		let next;
		for (const k in v) {
			const unsafe = /* @__PURE__ */ isUnsafeKey(k);
			const r = unsafe ? void 0 : walkResolver(v[k], resolve, k);
			if (!next && (unsafe || r !== v[k])) {
				next = {};
				for (const pk in v) {
					if (pk === k) break;
					next[pk] = v[pk];
				}
			}
			if (next && !unsafe) next[k] = r;
		}
		return next || v;
	}
	return v;
}
// node_modules/nuxt/node_modules/@unhead/vue/dist/shared/vue.DKb5ZKVl.mjs
var headSymbol = "usehead";
// @__NO_SIDE_EFFECTS__
function injectHead$1() {
	if (hasInjectionContext()) {
		const instance = inject(headSymbol);
		if (instance) return instance;
	}
	throw new Error("useHead() was called without provide context, ensure you call it through the setup() function.");
}
// node_modules/nuxt/node_modules/@unhead/vue/dist/shared/vue.D2XR8FqS.mjs
var VueResolver = /* @__PURE__ */ Object.assign((_, value) => isRef(value) ? toValue(value) : value, { _static: true });
// node_modules/nuxt/node_modules/@unhead/vue/dist/shared/vue.CXwiCT15.mjs
function useHead$1(input, options = {}) {
	const head = options.head || /* @__PURE__ */ injectHead$1();
	return head.ssr ? head.push(input || {}, options) : clientUseHead(head, input, options);
}
function clientUseHead(head, input, options = {}) {
	const scope = getCurrentScope();
	if (scope && !scope.active) return {
		patch() {},
		dispose() {},
		_i: -1
	};
	const deactivated = ref(false);
	if (options.onRendered && scope) {
		const _onRendered = options.onRendered;
		options = {
			...options,
			onRendered: (ctx) => scope.run(() => _onRendered(ctx))
		};
	}
	let entry;
	watchEffect(() => {
		const i = deactivated.value ? {} : walkResolver(input, VueResolver);
		if (entry) entry.patch(i);
		else entry = head.push(i, options);
	});
	if (getCurrentInstance()) ; else if (scope) onScopeDispose(() => entry.dispose());
	return entry;
}
// node_modules/nuxt/dist/head/runtime/composables.js
/**
* Injects the head client from the Nuxt context or Vue inject.
*/
function injectHead(nuxtApp) {
	const nuxt = nuxtApp || useNuxtApp();
	return nuxt.ssrContext?.head || nuxt.runWithContext(() => {
		if (hasInjectionContext()) {
			const head = inject("usehead");
			if (!head) throw unheadDiagnostics.NUXT_E6001();
			return head;
		}
	});
}
function useHead(input, options = {}) {
	return useHead$1(input, {
		head: options.head || injectHead(options.nuxt),
		...options
	});
}
// node_modules/nuxt/dist/app/composables/payload.js
/**
* This is an experimental function for configuring passing rich data from server -> client.
* @since 3.4.0
*/
function definePayloadReducer(name, reduce) {
	useNuxtApp().ssrContext["~payloadReducers"][name] = reduce;
}
// node_modules/nuxt/dist/app/plugins/revive-payload.server.js
var reducers = [
	["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
	["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
	["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
	["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
	["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
	["Ref", (data) => isRef(data) && data.value],
	["Reactive", (data) => isReactive(data) && toRaw(data)]
];
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fplugins.server.mjs
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fplugins_server_default = [
	plugin$2,
	plugin$1,
	/* @__PURE__ */ defineNuxtPlugin({
		name: "nuxt:revive-payload:server",
		setup() {
			for (const [reducer, fn] of reducers) definePayloadReducer(reducer, fn);
		}
	}),
	/* @__PURE__ */ defineNuxtPlugin({ name: "nuxt:global-components" })
];
// node_modules/nuxt/dist/app/components/vfor.js
/**
* Upper bound on `v-for` iterations expanded server-side in a server component or island.
* Island props are attacker-controllable, so a large numeric `v-for` source is a
* memory-amplification vector; this caps it.
*
* @internal
*/
var MAX_VFOR_LENGTH = 1e4;
/**
* Clamp a numeric `v-for` source before iteration. Only numbers are bounded (the
* amplification vector); other sources are returned unchanged.
*
* @internal
*/
function vforBound(source) {
	if (typeof source !== "number" || source <= 1e4) return source;
	return MAX_VFOR_LENGTH;
}
// node_modules/nuxt/dist/app/components/render-list.js
function bound(source) {
	if (typeof source === "number" && source > 1e4 && tryUseNuxtApp()?.ssrContext?.islandContext) return vforBound(source);
	return source;
}
/**
* `ssrRenderList` from `vue/server-renderer`, with numeric sources clamped to
* `MAX_VFOR_LENGTH` while rendering a server component or island.
*
* @internal
*/
function ssrRenderList$2(source, renderItem) {
	ssrRenderList(bound(source), renderItem);
}
// node_modules/@aezakmiproject/hesoyam/src/lib/utils.ts
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
// node_modules/@aezakmiproject/hesoyam/src/components/tooltip/TooltipContent.vue?vue&type=script&setup=true&lang.ts
var TooltipContent_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	inheritAttrs: false,
	__name: "TooltipContent",
	__ssrInlineRender: true,
	props: {
		forceMount: { type: Boolean },
		ariaLabel: {},
		asChild: { type: Boolean },
		as: {},
		side: {},
		sideOffset: { default: 6 },
		align: {},
		alignOffset: {},
		avoidCollisions: { type: Boolean },
		collisionBoundary: {},
		collisionPadding: {},
		arrowPadding: {},
		sticky: {},
		hideWhenDetached: { type: Boolean },
		positionStrategy: {},
		updatePositionStrategy: {},
		class: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] },
		type: { default: "default" },
		tip: {
			type: Boolean,
			default: true
		},
		center: {
			type: Boolean,
			default: true
		}
	},
	emits: ["escapeKeyDown", "pointerDownOutside"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const delegatedProps = reactiveOmit(props, "class", "type", "tip", "center");
		const forwarded = useForwardPropsEmits(delegatedProps, emits);
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(TooltipPortal), _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(unref(TooltipContent), mergeProps({
						"data-slot": "tooltip-content",
						"data-type": __props.type
					}, {
						...unref(forwarded),
						..._ctx.$attrs
					}, { class: unref(cn)(unref(tooltipContentVariants)({
						type: __props.type,
						center: __props.center
					}), props.class) }), {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
								if (__props.tip) _push(ssrRenderComponent(unref(TooltipArrow), {
									width: 10,
									height: 4,
									class: unref(cn)("z-50", unref(tooltipArrowVariants)({ type: __props.type }))
								}, null, _parent, _scopeId));
								else _push(`<!---->`);
							} else return [renderSlot(_ctx.$slots, "default"), __props.tip ? (openBlock(), createBlock(unref(TooltipArrow), {
								key: 0,
								width: 10,
								height: 4,
								class: unref(cn)("z-50", unref(tooltipArrowVariants)({ type: __props.type }))
							}, null, 8, ["class"])) : createCommentVNode("", true)];
						}),
						_: 3
					}, _parent, _scopeId));
					else return [createVNode(unref(TooltipContent), mergeProps({
						"data-slot": "tooltip-content",
						"data-type": __props.type
					}, {
						...unref(forwarded),
						..._ctx.$attrs
					}, { class: unref(cn)(unref(tooltipContentVariants)({
						type: __props.type,
						center: __props.center
					}), props.class) }), {
						default: withCtx(() => [renderSlot(_ctx.$slots, "default"), __props.tip ? (openBlock(), createBlock(unref(TooltipArrow), {
							key: 0,
							width: 10,
							height: 4,
							class: unref(cn)("z-50", unref(tooltipArrowVariants)({ type: __props.type }))
						}, null, 8, ["class"])) : createCommentVNode("", true)]),
						_: 3
					}, 16, ["data-type", "class"])];
				}),
				_: 3
			}, _parent));
		};
	}
});
// node_modules/@aezakmiproject/hesoyam/src/components/tooltip/TooltipContent.vue
var _sfc_setup$15 = TooltipContent_vue_vue_type_script_setup_true_lang_default.setup;
TooltipContent_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@aezakmiproject/hesoyam/src/components/tooltip/TooltipContent.vue");
	return _sfc_setup$15 ? _sfc_setup$15(props, ctx) : void 0;
};
var TooltipContent_default = Object.assign(TooltipContent_vue_vue_type_script_setup_true_lang_default, { __name: "TooltipContent" });
// node_modules/@aezakmiproject/hesoyam/src/components/tooltip/TooltipProvider.vue?vue&type=script&setup=true&lang.ts
var TooltipProvider_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "TooltipProvider",
	__ssrInlineRender: true,
	props: {
		delayDuration: { default: 150 },
		skipDelayDuration: {},
		disableHoverableContent: { type: Boolean },
		disableClosingTrigger: { type: Boolean },
		disabled: { type: Boolean },
		ignoreNonKeyboardFocus: { type: Boolean },
		content: {}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(TooltipProvider), mergeProps(props, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
// node_modules/@aezakmiproject/hesoyam/src/components/tooltip/TooltipProvider.vue
var _sfc_setup$14 = TooltipProvider_vue_vue_type_script_setup_true_lang_default.setup;
TooltipProvider_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@aezakmiproject/hesoyam/src/components/tooltip/TooltipProvider.vue");
	return _sfc_setup$14 ? _sfc_setup$14(props, ctx) : void 0;
};
var TooltipProvider_default = Object.assign(TooltipProvider_vue_vue_type_script_setup_true_lang_default, { __name: "TooltipProvider" });
// node_modules/@aezakmiproject/hesoyam/src/components/tooltip/TooltipTrigger.vue?vue&type=script&setup=true&lang.ts
var TooltipTrigger_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "TooltipTrigger",
	__ssrInlineRender: true,
	props: {
		reference: {},
		asChild: { type: Boolean },
		as: {}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(TooltipTrigger), mergeProps({ "data-slot": "tooltip-trigger" }, props, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
// node_modules/@aezakmiproject/hesoyam/src/components/tooltip/TooltipTrigger.vue
var _sfc_setup$13 = TooltipTrigger_vue_vue_type_script_setup_true_lang_default.setup;
TooltipTrigger_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@aezakmiproject/hesoyam/src/components/tooltip/TooltipTrigger.vue");
	return _sfc_setup$13 ? _sfc_setup$13(props, ctx) : void 0;
};
var TooltipTrigger_default = Object.assign(TooltipTrigger_vue_vue_type_script_setup_true_lang_default, { __name: "TooltipTrigger" });
// node_modules/@aezakmiproject/hesoyam/src/components/tooltip/Tooltip.vue?vue&type=script&setup=true&lang.ts
var Tooltip_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Tooltip",
	__ssrInlineRender: true,
	props: {
		defaultOpen: { type: Boolean },
		open: { type: Boolean },
		delayDuration: {},
		disableHoverableContent: { type: Boolean },
		disableClosingTrigger: { type: Boolean },
		disabled: { type: Boolean },
		ignoreNonKeyboardFocus: { type: Boolean },
		text: {},
		position: { default: "top" },
		delay: {
			type: Boolean,
			default: true
		},
		boxAlign: { default: "center" },
		type: { default: "default" },
		tip: {
			type: Boolean,
			default: true
		},
		center: {
			type: Boolean,
			default: true
		},
		class: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] }
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const slots = useSlots();
		const isCompact = computed(() => props.text !== void 0 || !!slots.text);
		const align = computed(() => {
			if (props.boxAlign === "left") return "start";
			if (props.boxAlign === "right") return "end";
			return "center";
		});
		const delayDuration = computed(() => props.delay === false ? 0 : 150);
		const delegatedProps = reactiveOmit(props, "text", "position", "delay", "boxAlign", "type", "tip", "center", "class");
		const forwarded = useForwardPropsEmits(delegatedProps, emits);
		return (_ctx, _push, _parent, _attrs) => {
			if (__props.disabled) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			else if (isCompact.value) _push(ssrRenderComponent(TooltipProvider_default, mergeProps({ "delay-duration": delayDuration.value }, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(unref(TooltipRoot), mergeProps({ "data-slot": "tooltip" }, unref(forwarded), { "delay-duration": delayDuration.value }), {
						default: withCtx((slotProps, _push, _parent, _scopeId) => {
							if (_push) {
								_push(ssrRenderComponent(TooltipTrigger_default, { "as-child": "" }, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											_push(`<span class="${ssrRenderClass(unref(cn)("inline-flex max-w-full", props.class))}"${_scopeId}>`);
											ssrRenderSlot(_ctx.$slots, "default", slotProps, null, _push, _parent, _scopeId);
											_push(`</span>`);
										} else return [createVNode("span", { class: unref(cn)("inline-flex max-w-full", props.class) }, [renderSlot(_ctx.$slots, "default", slotProps)], 2)];
									}),
									_: 2
								}, _parent, _scopeId));
								_push(ssrRenderComponent(TooltipContent_default, {
									side: __props.position,
									align: align.value,
									type: __props.type,
									tip: __props.tip,
									center: __props.center
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) ssrRenderSlot(_ctx.$slots, "text", {}, () => {
											_push(`${ssrInterpolate(__props.text)}`);
										}, _push, _parent, _scopeId);
										else return [renderSlot(_ctx.$slots, "text", {}, () => [createTextVNode(toDisplayString(__props.text), 1)])];
									}),
									_: 2
								}, _parent, _scopeId));
							} else return [createVNode(TooltipTrigger_default, { "as-child": "" }, {
								default: withCtx(() => [createVNode("span", { class: unref(cn)("inline-flex max-w-full", props.class) }, [renderSlot(_ctx.$slots, "default", slotProps)], 2)]),
								_: 2
							}, 1024), createVNode(TooltipContent_default, {
								side: __props.position,
								align: align.value,
								type: __props.type,
								tip: __props.tip,
								center: __props.center
							}, {
								default: withCtx(() => [renderSlot(_ctx.$slots, "text", {}, () => [createTextVNode(toDisplayString(__props.text), 1)])]),
								_: 3
							}, 8, [
								"side",
								"align",
								"type",
								"tip",
								"center"
							])];
						}),
						_: 3
					}, _parent, _scopeId));
					else return [createVNode(unref(TooltipRoot), mergeProps({ "data-slot": "tooltip" }, unref(forwarded), { "delay-duration": delayDuration.value }), {
						default: withCtx((slotProps) => [createVNode(TooltipTrigger_default, { "as-child": "" }, {
							default: withCtx(() => [createVNode("span", { class: unref(cn)("inline-flex max-w-full", props.class) }, [renderSlot(_ctx.$slots, "default", slotProps)], 2)]),
							_: 2
						}, 1024), createVNode(TooltipContent_default, {
							side: __props.position,
							align: align.value,
							type: __props.type,
							tip: __props.tip,
							center: __props.center
						}, {
							default: withCtx(() => [renderSlot(_ctx.$slots, "text", {}, () => [createTextVNode(toDisplayString(__props.text), 1)])]),
							_: 3
						}, 8, [
							"side",
							"align",
							"type",
							"tip",
							"center"
						])]),
						_: 3
					}, 16, ["delay-duration"])];
				}),
				_: 3
			}, _parent));
			else _push(ssrRenderComponent(TooltipProvider_default, mergeProps({ "delay-duration": delayDuration.value }, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(unref(TooltipRoot), mergeProps({ "data-slot": "tooltip" }, unref(forwarded)), {
						default: withCtx((slotProps, _push, _parent, _scopeId) => {
							if (_push) ssrRenderSlot(_ctx.$slots, "default", slotProps, null, _push, _parent, _scopeId);
							else return [renderSlot(_ctx.$slots, "default", slotProps)];
						}),
						_: 3
					}, _parent, _scopeId));
					else return [createVNode(unref(TooltipRoot), mergeProps({ "data-slot": "tooltip" }, unref(forwarded)), {
						default: withCtx((slotProps) => [renderSlot(_ctx.$slots, "default", slotProps)]),
						_: 3
					}, 16)];
				}),
				_: 3
			}, _parent));
		};
	}
});
// node_modules/@aezakmiproject/hesoyam/src/components/tooltip/Tooltip.vue
var _sfc_setup$12 = Tooltip_vue_vue_type_script_setup_true_lang_default.setup;
Tooltip_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@aezakmiproject/hesoyam/src/components/tooltip/Tooltip.vue");
	return _sfc_setup$12 ? _sfc_setup$12(props, ctx) : void 0;
};
var Tooltip_default = Object.assign(Tooltip_vue_vue_type_script_setup_true_lang_default, { __name: "Tooltip" });
// node_modules/@aezakmiproject/hesoyam/src/components/tooltip/index.ts
var tooltipContentVariants = cva("z-50 inline-flex w-fit max-w-xs origin-(--reka-tooltip-content-transform-origin) items-center gap-1.5 rounded-[6px] px-2.5 py-1 text-[12px] font-medium leading-snug has-data-[slot=kbd]:pr-1.5 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1", {
	variants: {
		type: {
			default: "bg-[var(--ds-gray-1000)] text-[var(--ds-background-100)]",
			success: "bg-[var(--ds-green-700)] text-white",
			error: "bg-[var(--ds-red-700)] text-white",
			warning: "bg-[var(--ds-amber-700)] text-black",
			violet: "bg-[#8a63d2] text-white"
		},
		center: {
			true: "text-center",
			false: "text-left"
		}
	},
	defaultVariants: {
		type: "default",
		center: true
	}
});
var tooltipArrowVariants = cva("", {
	variants: { type: {
		default: "fill-[var(--ds-gray-1000)]",
		success: "fill-[var(--ds-green-700)]",
		error: "fill-[var(--ds-red-700)]",
		warning: "fill-[var(--ds-amber-700)]",
		violet: "fill-[#8a63d2]"
	} },
	defaultVariants: { type: "default" }
});
// node_modules/@aezakmiproject/hesoyam/src/components/tabs/Tabs.vue?vue&type=script&setup=true&lang.ts
var Tabs_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Tabs",
	__ssrInlineRender: true,
	props: {
		selected: {},
		setSelected: {},
		modelValue: {},
		tabs: {},
		disabled: { type: Boolean },
		variant: { default: "default" },
		class: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] },
		ariaLabel: { default: "Sections" }
	},
	emits: ["update:selected", "update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const rootRef = ref(null);
		const tabRefs = ref([]);
		const indicatorReady = ref(false);
		const indicator = ref({
			x: 0,
			y: 0,
			width: 0,
			height: 0
		});
		const selectedValue = computed(() => {
			return props.selected ?? props.modelValue ?? props.tabs[0]?.value ?? "";
		});
		const indicatorStyle = computed(() => ({
			width: `${indicator.value.width}px`,
			height: `${indicator.value.height}px`,
			transform: `translate3d(${indicator.value.x}px, ${indicator.value.y}px, 0)`
		}));
		function updateIndicator() {
			const root = rootRef.value;
			const index = props.tabs.findIndex((tab) => tab.value === selectedValue.value);
			const tab = index === -1 ? void 0 : tabRefs.value[index];
			if (!root || !tab) {
				indicator.value = {
					x: 0,
					y: 0,
					width: 0,
					height: 0
				};
				return;
			}
			const rootRect = root.getBoundingClientRect();
			const tabRect = tab.getBoundingClientRect();
			const x = tabRect.left - rootRect.left + root.scrollLeft;
			const y = tabRect.top - rootRect.top + root.scrollTop;
			if (props.variant === "secondary") {
				indicator.value = {
					x,
					y,
					width: tabRect.width,
					height: tabRect.height
				};
				return;
			}
			indicator.value = {
				x,
				y: tabRect.bottom - rootRect.top - 2,
				width: tabRect.width,
				height: 2
			};
		}
		const enabledTabs = computed(() => props.tabs.filter((tab) => !tab.disabled && !props.disabled));
		function select(value) {
			const tab = props.tabs.find((item) => item.value === value);
			if (!tab || tab.disabled || props.disabled) return;
			props.setSelected?.(value);
			emit("update:selected", value);
			emit("update:modelValue", value);
		}
		function iconIs(icon) {
			return Boolean(icon);
		}
		function renderIcon(icon) {
			if (isVNode(icon)) return { render: () => icon };
			return icon;
		}
		function onKeydown(event, index) {
			const enabled = enabledTabs.value;
			if (!enabled.length) return;
			const currentValue = props.tabs[index]?.value;
			const currentEnabledIndex = enabled.findIndex((tab) => tab.value === currentValue);
			const start = currentEnabledIndex === -1 ? 0 : currentEnabledIndex;
			let next = start;
			if (event.key === "ArrowRight" || event.key === "ArrowDown") {
				event.preventDefault();
				next = (start + 1) % enabled.length;
			} else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
				event.preventDefault();
				next = (start - 1 + enabled.length) % enabled.length;
			} else if (event.key === "Home") {
				event.preventDefault();
				next = 0;
			} else if (event.key === "End") {
				event.preventDefault();
				next = enabled.length - 1;
			} else if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				select(props.tabs[index].value);
				return;
			} else return;
			const target = enabled[next];
			if (!target) return;
			const targetIndex = props.tabs.findIndex((tab) => tab.value === target.value);
			tabRefs.value[targetIndex]?.focus();
		}
		function setTabRef(el, index) {
			const node = el;
			if (node) tabRefs.value[index] = node;
		}
		watch([
			selectedValue,
			() => props.variant,
			() => props.tabs
		], async () => {
			await nextTick();
			updateIndicator();
		}, {
			deep: true,
			flush: "post"
		});
		useResizeObserver(rootRef, updateIndicator);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				ref_key: "rootRef",
				ref: rootRef,
				role: "tablist",
				"aria-label": __props.ariaLabel,
				"aria-disabled": __props.disabled || void 0,
				"data-slot": "tabs",
				"data-variant": __props.variant,
				class: unref(cn)("relative flex items-center", __props.variant === "default" && "gap-0 border-b border-[var(--ds-gray-alpha-400)]", __props.variant === "secondary" && "w-fit gap-0.5 rounded-[6px] bg-[var(--ds-gray-100)] p-[3px]", __props.disabled && "cursor-not-allowed opacity-50", props.class)
			}, _attrs))}><div aria-hidden="true" data-slot="tabs-indicator" class="${ssrRenderClass(unref(cn)("pointer-events-none absolute top-0 left-0 z-0", indicator.value.width === 0 && "invisible", indicatorReady.value && "transition-all duration-200 ease-out motion-reduce:transition-none", __props.variant === "default" && "bg-[var(--ds-gray-1000)]", __props.variant === "secondary" && "rounded-[5px] bg-[var(--ds-background-100)] shadow-[0_0_0_1px_var(--ds-gray-alpha-400)]"))}" style="${ssrRenderStyle(indicatorStyle.value)}"></div><!--[-->`);
			ssrRenderList$2(__props.tabs, (tab, index) => {
				ssrRenderVNode(_push, createVNode(resolveDynamicComponent(tab.tooltip ? unref(Tooltip_default) : "span"), mergeProps({ ref_for: true }, tab.tooltip ? { text: tab.tooltip } : {}, { class: "relative z-10 inline-flex" }), {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<button type="button" role="tab"${ssrRenderAttr("aria-selected", selectedValue.value === tab.value)}${ssrRenderAttr("aria-disabled", tab.disabled || __props.disabled || void 0)}${ssrRenderAttr("tabindex", selectedValue.value === tab.value ? 0 : -1)}${ssrIncludeBooleanAttr(tab.disabled || __props.disabled) ? " disabled" : ""} data-slot="tab"${ssrRenderAttr("data-selected", selectedValue.value === tab.value ? "" : void 0)} class="${ssrRenderClass(unref(cn)("relative z-10 inline-flex h-8 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap text-[13px] leading-none outline-none transition-colors select-none", "focus-visible:ring-2 focus-visible:ring-[var(--ds-focus)]", "disabled:cursor-not-allowed disabled:opacity-50", __props.variant === "default" && unref(cn)("-mb-px border-b-2 border-transparent px-3 text-[var(--ds-gray-900)]", "hover:text-[var(--ds-gray-1000)]", selectedValue.value === tab.value && "font-medium text-[var(--ds-gray-1000)]"), __props.variant === "secondary" && unref(cn)("rounded-[5px] px-2.5 text-[var(--ds-gray-900)]", "hover:text-[var(--ds-gray-1000)]", selectedValue.value === tab.value && "font-medium text-[var(--ds-gray-1000)]")))}"${_scopeId}>`);
							if (iconIs(tab.icon)) ssrRenderVNode(_push, createVNode(resolveDynamicComponent(renderIcon(tab.icon)), { class: "size-4 shrink-0 [&_svg]:size-4" }, null), _parent, _scopeId);
							else _push(`<!---->`);
							_push(`<span${_scopeId}>${ssrInterpolate(tab.title)}</span>`);
							if (tab.badge != null && tab.badge !== 0 && tab.badge !== "0") _push(`<span class="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--ds-gray-100)] px-1 text-[10px] font-medium text-[var(--ds-gray-1000)]"${_scopeId}>${ssrInterpolate(tab.badge)}</span>`);
							else _push(`<!---->`);
							_push(`</button>`);
						} else return [createVNode("button", {
							ref_for: true,
							ref: (el) => setTabRef(el, index),
							type: "button",
							role: "tab",
							"aria-selected": selectedValue.value === tab.value,
							"aria-disabled": tab.disabled || __props.disabled || void 0,
							tabindex: selectedValue.value === tab.value ? 0 : -1,
							disabled: tab.disabled || __props.disabled,
							"data-slot": "tab",
							"data-selected": selectedValue.value === tab.value ? "" : void 0,
							class: unref(cn)("relative z-10 inline-flex h-8 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap text-[13px] leading-none outline-none transition-colors select-none", "focus-visible:ring-2 focus-visible:ring-[var(--ds-focus)]", "disabled:cursor-not-allowed disabled:opacity-50", __props.variant === "default" && unref(cn)("-mb-px border-b-2 border-transparent px-3 text-[var(--ds-gray-900)]", "hover:text-[var(--ds-gray-1000)]", selectedValue.value === tab.value && "font-medium text-[var(--ds-gray-1000)]"), __props.variant === "secondary" && unref(cn)("rounded-[5px] px-2.5 text-[var(--ds-gray-900)]", "hover:text-[var(--ds-gray-1000)]", selectedValue.value === tab.value && "font-medium text-[var(--ds-gray-1000)]")),
							onClick: ($event) => select(tab.value),
							onKeydown: ($event) => onKeydown($event, index)
						}, [
							iconIs(tab.icon) ? (openBlock(), createBlock(resolveDynamicComponent(renderIcon(tab.icon)), {
								key: 0,
								class: "size-4 shrink-0 [&_svg]:size-4"
							})) : createCommentVNode("", true),
							createVNode("span", null, toDisplayString(tab.title), 1),
							tab.badge != null && tab.badge !== 0 && tab.badge !== "0" ? (openBlock(), createBlock("span", {
								key: 1,
								class: "inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--ds-gray-100)] px-1 text-[10px] font-medium text-[var(--ds-gray-1000)]"
							}, toDisplayString(tab.badge), 1)) : createCommentVNode("", true)
						], 42, [
							"aria-selected",
							"aria-disabled",
							"tabindex",
							"disabled",
							"data-selected",
							"onClick",
							"onKeydown"
						])];
					}),
					_: 2
				}), _parent);
			});
			_push(`<!--]--></div>`);
		};
	}
});
// node_modules/@aezakmiproject/hesoyam/src/components/tabs/Tabs.vue
var _sfc_setup$11 = Tabs_vue_vue_type_script_setup_true_lang_default.setup;
Tabs_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@aezakmiproject/hesoyam/src/components/tabs/Tabs.vue");
	return _sfc_setup$11 ? _sfc_setup$11(props, ctx) : void 0;
};
var Tabs_default = Object.assign(Tabs_vue_vue_type_script_setup_true_lang_default, { __name: "Tabs" });
var theme = ref("system");
var resolvedTheme = ref("dark");
function setTheme(next) {
	theme.value = next;
}
function useTheme() {
	return {
		theme: readonly(theme),
		resolvedTheme: readonly(resolvedTheme),
		setTheme
	};
}
// node_modules/@aezakmiproject/hesoyam/src/components/theme-switcher/ThemeSwitcher.vue?vue&type=script&setup=true&lang.ts
var ThemeSwitcher_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ThemeSwitcher",
	__ssrInlineRender: true,
	props: {
		small: { type: Boolean },
		disabled: { type: Boolean },
		forcedTheme: {},
		class: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] }
	},
	setup(__props) {
		const props = __props;
		const { theme, setTheme } = useTheme();
		const tabs = [
			{
				value: "light",
				title: "Light",
				icon: Sun
			},
			{
				value: "system",
				title: "System",
				icon: Monitor
			},
			{
				value: "dark",
				title: "Dark",
				icon: Moon
			}
		];
		const selected = computed(() => props.forcedTheme ?? theme.value);
		const isDisabled = computed(() => Boolean(props.disabled || props.forcedTheme));
		function onSelect(value) {
			if (!isDisabled.value) setTheme(value);
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Tabs_default), mergeProps({
				"data-slot": "theme-switcher",
				variant: "secondary",
				"aria-label": "Theme",
				tabs,
				selected: selected.value,
				disabled: isDisabled.value,
				class: props.class,
				"onUpdate:selected": onSelect
			}, _attrs), null, _parent));
		};
	}
});
// node_modules/@aezakmiproject/hesoyam/src/components/theme-switcher/ThemeSwitcher.vue
var _sfc_setup$10 = ThemeSwitcher_vue_vue_type_script_setup_true_lang_default.setup;
ThemeSwitcher_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@aezakmiproject/hesoyam/src/components/theme-switcher/ThemeSwitcher.vue");
	return _sfc_setup$10 ? _sfc_setup$10(props, ctx) : void 0;
};
var ThemeSwitcher_default = Object.assign(ThemeSwitcher_vue_vue_type_script_setup_true_lang_default, { __name: "ThemeSwitcher" });
// node_modules/@aezakmiproject/hesoyam/src/components/badge/index.ts
var badgeVariants = cva("group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap font-medium leading-none select-none [&_svg]:pointer-events-none [&_[data-slot=icon]]:inline-flex [&_[data-slot=icon]]:shrink-0", {
	variants: {
		variant: {
			gray: "",
			blue: "",
			purple: "",
			amber: "",
			red: "",
			pink: "",
			green: "",
			teal: "",
			inverted: "bg-[var(--ds-gray-1000)] text-[var(--ds-background-100)]",
			trial: "bg-[linear-gradient(90deg,var(--ds-purple-700),var(--ds-pink-700))] text-white",
			turbo: "bg-[linear-gradient(90deg,#e5484d,#ff7a18)] text-white",
			pill: "rounded-full border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-gray-100)] text-[var(--ds-gray-1000)] hover:bg-[var(--ds-gray-200)]",
			default: "bg-[var(--ds-gray-1000)] text-[var(--ds-background-100)]",
			secondary: "bg-[var(--ds-gray-200)] text-[var(--ds-gray-1000)]",
			destructive: "",
			outline: "border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-gray-100)] text-[var(--ds-gray-1000)]",
			ghost: "bg-transparent text-[var(--ds-gray-900)]",
			link: "bg-transparent text-[var(--ds-blue-900)] underline-offset-4 hover:underline"
		},
		contrast: {
			high: "",
			low: ""
		},
		size: {
			sm: "h-4 rounded-[4px] px-1.5 text-[10px] [&_[data-slot=icon]]:size-2.5 [&_svg]:size-2.5",
			md: "h-5 rounded-[6px] px-1.5 text-[12px] [&_[data-slot=icon]]:size-3 [&_svg]:size-3",
			lg: "h-6 rounded-[6px] px-2 text-[13px] [&_[data-slot=icon]]:size-3.5 [&_svg]:size-3.5",
			small: "h-4 rounded-[4px] px-1.5 text-[10px] [&_[data-slot=icon]]:size-2.5 [&_svg]:size-2.5",
			large: "h-6 rounded-[6px] px-2 text-[13px] [&_[data-slot=icon]]:size-3.5 [&_svg]:size-3.5"
		}
	},
	compoundVariants: [
		{
			variant: "gray",
			contrast: "high",
			class: "bg-[var(--ds-gray-700)] text-white"
		},
		{
			variant: "gray",
			contrast: "low",
			class: "bg-[var(--ds-gray-200)] text-[var(--ds-gray-1000)]"
		},
		{
			variant: "blue",
			contrast: "high",
			class: "bg-[var(--ds-blue-700)] text-white"
		},
		{
			variant: "blue",
			contrast: "low",
			class: "bg-[var(--ds-blue-200)] text-[var(--ds-blue-900)]"
		},
		{
			variant: "purple",
			contrast: "high",
			class: "bg-[var(--ds-purple-700)] text-white"
		},
		{
			variant: "purple",
			contrast: "low",
			class: "bg-[var(--ds-purple-200)] text-[var(--ds-purple-900)]"
		},
		{
			variant: "amber",
			contrast: "high",
			class: "bg-[var(--ds-amber-700)] text-black"
		},
		{
			variant: "amber",
			contrast: "low",
			class: "bg-[var(--ds-amber-200)] text-[var(--ds-amber-900)]"
		},
		{
			variant: "red",
			contrast: "high",
			class: "bg-[var(--ds-red-700)] text-white"
		},
		{
			variant: "red",
			contrast: "low",
			class: "bg-[var(--ds-red-200)] text-[var(--ds-red-900)]"
		},
		{
			variant: "pink",
			contrast: "high",
			class: "bg-[var(--ds-pink-700)] text-white"
		},
		{
			variant: "pink",
			contrast: "low",
			class: "bg-[var(--ds-pink-200)] text-[var(--ds-pink-900)]"
		},
		{
			variant: "green",
			contrast: "high",
			class: "bg-[var(--ds-green-700)] text-white"
		},
		{
			variant: "green",
			contrast: "low",
			class: "bg-[var(--ds-green-200)] text-[var(--ds-green-900)]"
		},
		{
			variant: "teal",
			contrast: "high",
			class: "bg-[var(--ds-teal-700)] text-white"
		},
		{
			variant: "teal",
			contrast: "low",
			class: "bg-[var(--ds-teal-200)] text-[var(--ds-teal-900)]"
		},
		{
			variant: "destructive",
			contrast: "high",
			class: "bg-[var(--ds-red-700)] text-white"
		},
		{
			variant: "destructive",
			contrast: "low",
			class: "bg-[var(--ds-red-200)] text-[var(--ds-red-900)]"
		},
		{
			variant: "pill",
			size: "sm",
			class: "h-6 px-2"
		},
		{
			variant: "pill",
			size: "md",
			class: "h-8 px-2.5 text-[13px]"
		},
		{
			variant: "pill",
			size: "lg",
			class: "h-10 px-3 text-[13px]"
		},
		{
			variant: "pill",
			size: "small",
			class: "h-6 px-2"
		},
		{
			variant: "pill",
			size: "large",
			class: "h-10 px-3 text-[13px]"
		}
	],
	defaultVariants: {
		variant: "default",
		contrast: "high",
		size: "md"
	}
});
// node_modules/@aezakmiproject/hesoyam/src/components/badge/Badge.vue?vue&type=script&setup=true&lang.ts
var Badge_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Badge",
	__ssrInlineRender: true,
	props: {
		variant: { default: "default" },
		contrast: { default: "high" },
		size: { default: "md" },
		icon: {},
		title: {},
		class: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] },
		asChild: { type: Boolean },
		as: {}
	},
	setup(__props) {
		const props = __props;
		const iconNode = computed(() => {
			if (!props.icon) return null;
			return typeof props.icon === "function" ? props.icon() : props.icon;
		});
		const iconWrapper = computed(() => {
			const node = iconNode.value;
			if (!node) return null;
			return { render: () => isVNode(node) ? node : null };
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Primitive), mergeProps({
				"data-slot": "badge",
				"data-variant": __props.variant,
				"data-contrast": __props.contrast,
				"data-size": __props.size,
				as: __props.as,
				"as-child": __props.asChild,
				title: __props.title,
				class: unref(cn)(unref(badgeVariants)({
					variant: __props.variant,
					contrast: __props.contrast,
					size: __props.size
				}), props.class)
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						if (iconWrapper.value || _ctx.$slots.icon) {
							_push(`<span data-slot="icon"${_scopeId}>`);
							ssrRenderSlot(_ctx.$slots, "icon", {}, () => {
								ssrRenderVNode(_push, createVNode(resolveDynamicComponent(iconWrapper.value), null, null), _parent, _scopeId);
							}, _push, _parent, _scopeId);
							_push(`</span>`);
						} else _push(`<!---->`);
						ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
					} else return [iconWrapper.value || _ctx.$slots.icon ? (openBlock(), createBlock("span", {
						key: 0,
						"data-slot": "icon"
					}, [renderSlot(_ctx.$slots, "icon", {}, () => [(openBlock(), createBlock(resolveDynamicComponent(iconWrapper.value)))])])) : createCommentVNode("", true), renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
// node_modules/@aezakmiproject/hesoyam/src/components/badge/Badge.vue
var _sfc_setup$9 = Badge_vue_vue_type_script_setup_true_lang_default.setup;
Badge_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@aezakmiproject/hesoyam/src/components/badge/Badge.vue");
	return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
var Badge_default = Object.assign(Badge_vue_vue_type_script_setup_true_lang_default, { __name: "Badge" });
// node_modules/@aezakmiproject/hesoyam/src/components/spinner/Spinner.vue?vue&type=script&setup=true&lang.ts
var Spinner_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Spinner",
	__ssrInlineRender: true,
	props: {
		size: { default: "md" },
		circle: {
			type: Boolean,
			default: false
		},
		class: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] }
	},
	setup(__props) {
		const SIZE_MAP = {
			sm: 16,
			md: 20,
			lg: 24,
			xl: 32,
			"2xl": 36,
			"3xl": 48,
			"4xl": 64
		};
		const BLADE_PRESETS = [
			{
				px: 12,
				count: 8,
				barW: 3,
				barH: 1.5,
				duration: 1e3
			},
			{
				px: 16,
				count: 10,
				barW: 4,
				barH: 1.5,
				duration: 1e3
			},
			{
				px: 20,
				count: 12,
				barW: 5,
				barH: 2,
				duration: 1200
			},
			{
				px: 24,
				count: 12,
				barW: 6,
				barH: 2.5,
				duration: 1200
			},
			{
				px: 32,
				count: 15,
				barW: 8,
				barH: 2.5,
				duration: 1200
			},
			{
				px: 40,
				count: 15,
				barW: 10,
				barH: 3,
				duration: 1200
			},
			{
				px: 56,
				count: 18,
				barW: 14,
				barH: 3.5,
				duration: 1300
			}
		];
		function nearestPreset(px) {
			return BLADE_PRESETS.reduce((best, preset) => Math.abs(preset.px - px) < Math.abs(best.px - px) ? preset : best);
		}
		const props = __props;
		const px = computed(() => typeof props.size === "number" ? props.size : SIZE_MAP[props.size]);
		const blades = computed(() => {
			const preset = nearestPreset(px.value);
			const scale = px.value / preset.px;
			return Array.from({ length: preset.count }, (_, i) => ({
				rotate: 360 / preset.count * i,
				delay: -Math.round(preset.duration * (preset.count - 1 - i) / preset.count),
				duration: preset.duration,
				width: preset.barW * scale,
				height: preset.barH * scale
			}));
		});
		const rootClass = computed(() => cn("ds-spinner-animated inline-block shrink-0", props.circle ? "text-[var(--ds-gray-1000)]" : "relative aspect-square transform-gpu text-[var(--ds-gray-700)]", props.class));
		return (_ctx, _push, _parent, _attrs) => {
			if (__props.circle) _push(`<svg${ssrRenderAttrs(mergeProps({
				"data-slot": "spinner",
				"data-circle": "",
				viewBox: "0 0 16 16",
				fill: "none",
				width: px.value,
				height: px.value,
				class: rootClass.value,
				style: { "animation": "ds-spinner-rotate 0.7s linear infinite" },
				role: "status",
				"aria-label": "Loading"
			}, _attrs))}><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.5" stroke-opacity="0.2"></circle><path d="M14.5 8a6.5 6.5 0 0 0-6.5-6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>`);
			else {
				_push(`<div${ssrRenderAttrs(mergeProps({
					"data-slot": "spinner",
					role: "status",
					"aria-label": "Loading",
					class: rootClass.value,
					style: {
						width: `${px.value}px`,
						height: `${px.value}px`
					}
				}, _attrs))}><!--[-->`);
				ssrRenderList$2(blades.value, (bar, i) => {
					_push(`<div aria-hidden="true" class="absolute top-1/2 left-1/2 origin-center rounded-full bg-current will-change-transform" style="${ssrRenderStyle({
						width: `${bar.width}px`,
						height: `${bar.height}px`,
						"--animation-delay": `${bar.delay}ms`,
						"--animation-duration": `${bar.duration}ms`,
						animation: "ds-spinner-opacity var(--animation-duration, 1.2s) linear infinite",
						animationDelay: "var(--animation-delay, 0)",
						transform: `rotate(${bar.rotate}deg) translate(146%)`
					})}"></div>`);
				});
				_push(`<!--]--></div>`);
			}
		};
	}
});
// node_modules/@aezakmiproject/hesoyam/src/components/spinner/Spinner.vue
var _sfc_setup$8 = Spinner_vue_vue_type_script_setup_true_lang_default.setup;
Spinner_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@aezakmiproject/hesoyam/src/components/spinner/Spinner.vue");
	return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
var Spinner_default = Object.assign(Spinner_vue_vue_type_script_setup_true_lang_default, { __name: "Spinner" });
// node_modules/@aezakmiproject/hesoyam/src/components/button/ButtonLink.vue?vue&type=script&setup=true&lang.ts
var ButtonLink_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ButtonLink",
	__ssrInlineRender: true,
	props: {
		href: {},
		variant: {},
		size: {},
		shape: {},
		class: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] },
		disabled: { type: Boolean },
		loading: { type: Boolean },
		svgOnly: { type: Boolean },
		shadow: { type: Boolean },
		prefix: {},
		suffix: {}
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(Button_default, mergeProps({
				href: __props.href,
				as: "a",
				variant: __props.variant,
				size: __props.size,
				shape: __props.shape,
				class: __props.class,
				disabled: __props.disabled,
				loading: __props.loading,
				"svg-only": __props.svgOnly,
				shadow: __props.shadow,
				prefix: __props.prefix,
				suffix: __props.suffix
			}, _attrs), createSlots({
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 2
			}, [_ctx.$slots.prefix ? {
				name: "prefix",
				fn: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "prefix", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "prefix")];
				}),
				key: "0"
			} : void 0, _ctx.$slots.suffix ? {
				name: "suffix",
				fn: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "suffix", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "suffix")];
				}),
				key: "1"
			} : void 0]), _parent));
		};
	}
});
// node_modules/@aezakmiproject/hesoyam/src/components/button/ButtonLink.vue
var _sfc_setup$7 = ButtonLink_vue_vue_type_script_setup_true_lang_default.setup;
ButtonLink_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@aezakmiproject/hesoyam/src/components/button/ButtonLink.vue");
	return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
var ButtonLink_default = Object.assign(ButtonLink_vue_vue_type_script_setup_true_lang_default, { __name: "ButtonLink" });
// node_modules/@aezakmiproject/hesoyam/src/components/button/index.ts
var buttonVariants = cva([
	"relative inline-flex shrink-0 items-center justify-center whitespace-nowrap",
	"rounded-[6px] border border-transparent font-medium select-none",
	"transition-[color,background-color,border-color,box-shadow,transform] duration-150",
	"outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-focus)]",
	"active:not-aria-[haspopup]:translate-y-px",
	"disabled:cursor-not-allowed aria-disabled:cursor-not-allowed",
	"[&_svg]:pointer-events-none [&_svg]:shrink-0"
].join(" "), {
	variants: {
		variant: {
			default: "bg-[var(--ds-gray-1000)] text-[var(--ds-background-100)] hover:bg-[var(--ds-gray-1000)]/90 disabled:bg-[var(--ds-gray-100)] disabled:text-[var(--ds-gray-700)]",
			secondary: "border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] text-[var(--ds-gray-1000)] hover:bg-[var(--ds-gray-200)] disabled:bg-[var(--ds-gray-100)] disabled:text-[var(--ds-gray-700)] disabled:border-[var(--ds-gray-alpha-400)]",
			tertiary: "bg-transparent text-[var(--ds-gray-1000)] hover:bg-[var(--ds-gray-200)] disabled:text-[var(--ds-gray-700)] disabled:hover:bg-transparent",
			error: "bg-[var(--ds-red-700)] text-white hover:brightness-110 disabled:bg-[var(--ds-gray-100)] disabled:text-[var(--ds-gray-700)] disabled:brightness-100",
			warning: "bg-[var(--ds-amber-700)] text-black hover:brightness-110 disabled:bg-[var(--ds-gray-100)] disabled:text-[var(--ds-gray-700)] disabled:brightness-100",
			ghost: "bg-transparent text-[var(--ds-gray-1000)] hover:bg-[var(--ds-gray-200)] disabled:text-[var(--ds-gray-700)] disabled:hover:bg-transparent",
			outline: "border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] text-[var(--ds-gray-1000)] hover:bg-[var(--ds-gray-200)] disabled:bg-[var(--ds-gray-100)] disabled:text-[var(--ds-gray-700)] disabled:border-[var(--ds-gray-alpha-400)]",
			destructive: "bg-[var(--ds-red-700)] text-white hover:brightness-110 disabled:bg-[var(--ds-gray-100)] disabled:text-[var(--ds-gray-700)] disabled:brightness-100",
			link: "bg-transparent text-[var(--ds-gray-1000)] underline-offset-4 hover:underline disabled:no-underline disabled:text-[var(--ds-gray-700)]"
		},
		size: {
			tiny: "h-6 gap-1 px-2 text-xs [&_svg:not([class*=size-])]:size-3",
			small: "h-8 gap-1.5 px-2.5 text-[13px] [&_svg:not([class*=size-])]:size-3.5",
			medium: "h-10 gap-2 px-3.5 text-sm [&_svg:not([class*=size-])]:size-4",
			large: "h-12 gap-2 px-4 text-base [&_svg:not([class*=size-])]:size-5",
			default: "h-8 gap-1.5 px-2.5 text-[13px] [&_svg:not([class*=size-])]:size-3.5",
			xs: "h-6 gap-1 px-2 text-xs [&_svg:not([class*=size-])]:size-3",
			sm: "h-8 gap-1.5 px-2.5 text-[13px] [&_svg:not([class*=size-])]:size-3.5",
			lg: "h-12 gap-2 px-4 text-base [&_svg:not([class*=size-])]:size-5",
			icon: "size-8 px-0 [&_svg:not([class*=size-])]:size-3.5",
			"icon-xs": "size-6 px-0 [&_svg:not([class*=size-])]:size-3",
			"icon-sm": "size-7 px-0 [&_svg:not([class*=size-])]:size-3.5",
			"icon-lg": "size-10 px-0 [&_svg:not([class*=size-])]:size-4"
		},
		shape: {
			unset: "",
			square: "px-0",
			circle: "rounded-full px-0",
			rounded: "rounded-full"
		}
	},
	compoundVariants: [
		{
			shape: "square",
			size: "tiny",
			class: "size-6"
		},
		{
			shape: "square",
			size: "small",
			class: "size-8"
		},
		{
			shape: "square",
			size: "sm",
			class: "size-8"
		},
		{
			shape: "square",
			size: "medium",
			class: "size-10"
		},
		{
			shape: "square",
			size: "default",
			class: "size-8"
		},
		{
			shape: "square",
			size: "large",
			class: "size-12"
		},
		{
			shape: "square",
			size: "lg",
			class: "size-12"
		},
		{
			shape: "square",
			size: "xs",
			class: "size-6"
		},
		{
			shape: "circle",
			size: "tiny",
			class: "size-6"
		},
		{
			shape: "circle",
			size: "small",
			class: "size-8"
		},
		{
			shape: "circle",
			size: "sm",
			class: "size-8"
		},
		{
			shape: "circle",
			size: "medium",
			class: "size-10"
		},
		{
			shape: "circle",
			size: "default",
			class: "size-8"
		},
		{
			shape: "circle",
			size: "large",
			class: "size-12"
		},
		{
			shape: "circle",
			size: "lg",
			class: "size-12"
		},
		{
			shape: "circle",
			size: "xs",
			class: "size-6"
		}
	],
	defaultVariants: {
		variant: "default",
		size: "default",
		shape: "unset"
	}
});
// node_modules/@aezakmiproject/hesoyam/src/components/button/Button.vue?vue&type=script&setup=true&lang.ts
var Button_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Button",
	__ssrInlineRender: true,
	props: {
		variant: {},
		size: { default: "default" },
		shape: {},
		type: {},
		typeName: {},
		class: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] },
		disabled: { type: Boolean },
		loading: { type: Boolean },
		svgOnly: { type: Boolean },
		shadow: { type: Boolean },
		href: {},
		prefix: {},
		suffix: {},
		asChild: { type: Boolean },
		as: { default: "button" }
	},
	setup(__props) {
		const VISUAL_TYPES = /* @__PURE__ */ new Set([
			"default",
			"secondary",
			"tertiary",
			"error",
			"warning",
			"ghost",
			"outline",
			"destructive",
			"link"
		]);
		const props = __props;
		const slots = useSlots();
		const resolvedVariant = computed(() => {
			if (props.variant) return props.variant;
			if (props.type && VISUAL_TYPES.has(props.type)) return props.type;
			return "default";
		});
		const htmlType = computed(() => {
			if (props.typeName) return props.typeName;
			if (props.type === "button" || props.type === "submit" || props.type === "reset") return props.type;
			return "button";
		});
		const resolvedShape = computed(() => {
			if (props.shape) return props.shape;
			if (props.svgOnly || props.size === "icon" || props.size === "icon-xs" || props.size === "icon-sm" || props.size === "icon-lg") return "square";
			return "unset";
		});
		const resolvedAs = computed(() => {
			if (props.href) return "a";
			return props.as;
		});
		const hasPrefix = computed(() => Boolean(props.prefix || slots.prefix));
		const hasSuffix = computed(() => Boolean(props.suffix || slots.suffix));
		const showPrefix = computed(() => hasPrefix.value && !props.loading);
		const showSuffix = computed(() => hasSuffix.value && !props.loading);
		const showLabel = computed(() => !(props.loading && props.svgOnly));
		const spinnerSize = computed(() => {
			if (props.size === "tiny" || props.size === "xs" || props.size === "icon-xs") return 12;
			if (props.size === "large" || props.size === "lg") return 20;
			if (props.size === "medium" || props.size === "icon-lg") return 16;
			return 14;
		});
		function onActivate(event) {
			if (props.disabled || props.loading) {
				event.preventDefault();
				event.stopPropagation();
			}
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Primitive), mergeProps({
				"data-slot": "button",
				"data-variant": resolvedVariant.value,
				"data-size": __props.size,
				"data-shape": resolvedShape.value,
				"data-svg-only": __props.svgOnly || void 0,
				"data-loading": __props.loading || void 0,
				as: resolvedAs.value,
				"as-child": __props.asChild,
				href: __props.href,
				type: resolvedAs.value === "button" ? htmlType.value : void 0,
				disabled: resolvedAs.value === "a" ? void 0 : __props.disabled || void 0,
				"aria-busy": __props.loading || void 0,
				"aria-disabled": __props.disabled && resolvedAs.value === "a" || __props.loading && !__props.disabled ? true : void 0,
				tabindex: __props.disabled && resolvedAs.value === "a" ? -1 : void 0,
				onClick: onActivate,
				class: unref(cn)(unref(buttonVariants)({
					variant: resolvedVariant.value,
					size: __props.size,
					shape: resolvedShape.value
				}), __props.shadow && "shadow-[0_2px_8px_rgba(0,0,0,0.24)]", __props.loading && "pointer-events-none", props.class)
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<span class="inline-flex items-center justify-center gap-[inherit]"${_scopeId}>`);
						if (__props.loading) _push(ssrRenderComponent(unref(Spinner_default), {
							size: spinnerSize.value,
							class: "text-[var(--ds-gray-700)] [filter:drop-shadow(0_0.5px_0_#171717)_drop-shadow(0.5px_0_0_#171717)_drop-shadow(0_-0.5px_0_#171717)_drop-shadow(-0.5px_0_0_#171717)]",
							role: "presentation",
							"aria-hidden": "true"
						}, null, _parent, _scopeId));
						else _push(`<!---->`);
						if (showPrefix.value) {
							_push(`<span data-slot="button-prefix" class="inline-flex shrink-0 items-center"${_scopeId}>`);
							ssrRenderSlot(_ctx.$slots, "prefix", {}, () => {
								if (typeof __props.prefix === "string") _push(`<!--[-->${ssrInterpolate(__props.prefix)}<!--]-->`);
								else if (__props.prefix) ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.prefix), null, null), _parent, _scopeId);
								else _push(`<!---->`);
							}, _push, _parent, _scopeId);
							_push(`</span>`);
						} else _push(`<!---->`);
						if (showLabel.value) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
						else _push(`<!---->`);
						if (showSuffix.value) {
							_push(`<span data-slot="button-suffix" class="inline-flex shrink-0 items-center"${_scopeId}>`);
							ssrRenderSlot(_ctx.$slots, "suffix", {}, () => {
								if (typeof __props.suffix === "string") _push(`<!--[-->${ssrInterpolate(__props.suffix)}<!--]-->`);
								else if (__props.suffix) ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.suffix), null, null), _parent, _scopeId);
								else _push(`<!---->`);
							}, _push, _parent, _scopeId);
							_push(`</span>`);
						} else _push(`<!---->`);
						_push(`</span>`);
					} else return [createVNode("span", { class: "inline-flex items-center justify-center gap-[inherit]" }, [
						__props.loading ? (openBlock(), createBlock(unref(Spinner_default), {
							key: 0,
							size: spinnerSize.value,
							class: "text-[var(--ds-gray-700)] [filter:drop-shadow(0_0.5px_0_#171717)_drop-shadow(0.5px_0_0_#171717)_drop-shadow(0_-0.5px_0_#171717)_drop-shadow(-0.5px_0_0_#171717)]",
							role: "presentation",
							"aria-hidden": "true"
						}, null, 8, ["size"])) : createCommentVNode("", true),
						showPrefix.value ? (openBlock(), createBlock("span", {
							key: 1,
							"data-slot": "button-prefix",
							class: "inline-flex shrink-0 items-center"
						}, [renderSlot(_ctx.$slots, "prefix", {}, () => [typeof __props.prefix === "string" ? (openBlock(), createBlock(Fragment, { key: 0 }, [createTextVNode(toDisplayString(__props.prefix), 1)], 64)) : __props.prefix ? (openBlock(), createBlock(resolveDynamicComponent(__props.prefix), { key: 1 })) : createCommentVNode("", true)])])) : createCommentVNode("", true),
						showLabel.value ? renderSlot(_ctx.$slots, "default", {}, void 0, void 0, 2) : createCommentVNode("", true),
						showSuffix.value ? (openBlock(), createBlock("span", {
							key: 3,
							"data-slot": "button-suffix",
							class: "inline-flex shrink-0 items-center"
						}, [renderSlot(_ctx.$slots, "suffix", {}, () => [typeof __props.suffix === "string" ? (openBlock(), createBlock(Fragment, { key: 0 }, [createTextVNode(toDisplayString(__props.suffix), 1)], 64)) : __props.suffix ? (openBlock(), createBlock(resolveDynamicComponent(__props.suffix), { key: 1 })) : createCommentVNode("", true)])])) : createCommentVNode("", true)
					])];
				}),
				_: 3
			}, _parent));
		};
	}
});
// node_modules/@aezakmiproject/hesoyam/src/components/button/Button.vue
var _sfc_setup$6 = Button_vue_vue_type_script_setup_true_lang_default.setup;
Button_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@aezakmiproject/hesoyam/src/components/button/Button.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
var Button_default = Object.assign(Button_vue_vue_type_script_setup_true_lang_default, { __name: "Button" });
// node_modules/@aezakmiproject/hesoyam/src/components/card/Card.vue?vue&type=script&setup=true&lang.ts
var Card_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Card",
	__ssrInlineRender: true,
	props: {
		class: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] },
		size: { default: "default" }
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				"data-slot": "card",
				"data-size": __props.size,
				class: unref(cn)("bg-[var(--ds-background-100)] text-[var(--ds-gray-1000)] rounded-lg border border-[var(--ds-gray-alpha-400)] text-[13px] group/card flex flex-col", props.class)
			}, _attrs))}>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div>`);
		};
	}
});
// node_modules/@aezakmiproject/hesoyam/src/components/card/Card.vue
var _sfc_setup$5 = Card_vue_vue_type_script_setup_true_lang_default.setup;
Card_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@aezakmiproject/hesoyam/src/components/card/Card.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var Card_default = Object.assign(Card_vue_vue_type_script_setup_true_lang_default, { __name: "Card" });
// node_modules/@aezakmiproject/hesoyam/src/components/card/CardTitle.vue?vue&type=script&setup=true&lang.ts
var CardTitle_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "CardTitle",
	__ssrInlineRender: true,
	props: { class: { type: [
		Boolean,
		null,
		String,
		Object,
		Array
	] } },
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				"data-slot": "card-title",
				class: unref(cn)("text-[13px] font-medium", props.class)
			}, _attrs))}>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div>`);
		};
	}
});
// node_modules/@aezakmiproject/hesoyam/src/components/card/CardTitle.vue
var _sfc_setup$4 = CardTitle_vue_vue_type_script_setup_true_lang_default.setup;
CardTitle_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@aezakmiproject/hesoyam/src/components/card/CardTitle.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var CardTitle_default = Object.assign(CardTitle_vue_vue_type_script_setup_true_lang_default, { __name: "CardTitle" });
// node_modules/@aezakmiproject/hesoyam/src/components/card/CardDescription.vue?vue&type=script&setup=true&lang.ts
var CardDescription_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "CardDescription",
	__ssrInlineRender: true,
	props: { class: { type: [
		Boolean,
		null,
		String,
		Object,
		Array
	] } },
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				"data-slot": "card-description",
				class: unref(cn)("text-muted-foreground text-xs/relaxed", props.class)
			}, _attrs))}>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div>`);
		};
	}
});
// node_modules/@aezakmiproject/hesoyam/src/components/card/CardDescription.vue
var _sfc_setup$3 = CardDescription_vue_vue_type_script_setup_true_lang_default.setup;
CardDescription_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@aezakmiproject/hesoyam/src/components/card/CardDescription.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var CardDescription_default = Object.assign(CardDescription_vue_vue_type_script_setup_true_lang_default, { __name: "CardDescription" });
// app/data.ts
var ME = {
	name: "Flottiee",
	foundedYear: 2026,
	role: "Future Full-stack Developer",
	tagline: "Изучаю Vue и Nuxt, работаю с ИИ-агентами в разработке и собираю свои первые pet-проекты.",
	location: "Санкт-Петербург, Россия",
	email: "you@example.com",
	telegram: "https://t.me/yourusername",
	github: "https://github.com/yourusername"
};
var SKILLS = [
	{
		name: "Python",
		level: "Уверенно"
	},
	{
		name: "Vue / Nuxt",
		level: "Изучаю"
	},
	{
		name: "TypeScript",
		level: "Изучаю"
	},
	{
		name: "Git",
		level: "Базово"
	},
	{
		name: "ИИ-агенты в разработке",
		level: "Практикую"
	}
];
var PROJECTS = [
	{
		title: "Визитка flottiee.bond",
		description: "Этот сайт: Nuxt, Tailwind и дизайн-система hesoyam. Деплой на Vercel.",
		link: "https://flottiee.bond"
	},
	{
		title: "Свой API",
		description: "REST API на Nitro server routes — soon.",
		link: "#"
	},
	{
		title: "Pet-проект на Python",
		description: "Место для вашего будущего проекта.",
		link: "#"
	}
];
var LINKS = [
	{
		label: "GitHub",
		href: ME.github
	},
	{
		label: "Telegram",
		href: ME.telegram
	},
	{
		label: `Email: ${ME.email}`,
		href: `mailto:${ME.email}`
	}
];
// app/app.vue?vue&type=script&setup=true&lang.ts
var app_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "app",
	__ssrInlineRender: true,
	setup(__props) {
		useHead({ bodyAttrs: { class: "antialiased" } });
		return (_ctx, _push, _parent, _attrs) => {
			const _component_ThemeSwitcher = ThemeSwitcher_default;
			const _component_Badge = Badge_default;
			const _component_Button = Button_default;
			const _component_Card = Card_default;
			const _component_CardTitle = CardTitle_default;
			const _component_ButtonLink = ButtonLink_default;
			const _component_CardDescription = CardDescription_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-dvh bg-background text-foreground transition-colors" }, _attrs))}><header class="fixed top-4 right-4 z-10 sm:top-6 sm:right-6">`);
			_push(ssrRenderComponent(_component_ThemeSwitcher, { small: "" }, null, _parent));
			_push(`</header><main class="flex flex-col items-center"><section class="mx-auto flex w-full max-w-3xl flex-col items-start px-4 pt-28 pb-16 sm:px-6 sm:pt-36 sm:pb-24">`);
			_push(ssrRenderComponent(_component_Badge, {
				class: "mb-4",
				contrast: "medium"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<span class="relative flex h-2 w-2"${_scopeId}><span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60"${_scopeId}></span><span class="relative inline-flex h-2 w-2 rounded-full bg-green-500"${_scopeId}></span></span> Открыт к обучению и новым проектам `);
					else return [createVNode("span", { class: "relative flex h-2 w-2" }, [createVNode("span", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" }), createVNode("span", { class: "relative inline-flex h-2 w-2 rounded-full bg-green-500" })]), createTextVNode(" Открыт к обучению и новым проектам ")];
				}),
				_: 1
			}, _parent));
			_push(`<h1 class="text-4xl font-bold tracking-tight sm:text-6xl"> Привет, я <span class="text-accent">${ssrInterpolate(unref(ME).name)}</span> 👋 </h1><p class="text-muted mt-3 text-lg sm:text-xl">${ssrInterpolate(unref(ME).role)}</p><p class="mt-6 max-w-xl text-base leading-relaxed sm:text-lg">${ssrInterpolate(unref(ME).tagline)}</p><p class="text-muted mt-2 text-sm sm:text-base">📍 ${ssrInterpolate(unref(ME).location)}</p><div class="mt-8 flex flex-wrap gap-3">`);
			_push(ssrRenderComponent(_component_Button, { href: "#contacts" }, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Связаться`);
					else return [createTextVNode("Связаться")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_Button, {
				href: "#projects",
				variant: "outline"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Pet-проекты`);
					else return [createTextVNode("Pet-проекты")];
				}),
				_: 1
			}, _parent));
			_push(`</div></section><section id="skills" class="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6"><h2 class="mb-8 text-2xl font-semibold tracking-tight sm:text-3xl"><span class="text-accent mr-2">#</span> Навыки </h2><ul class="grid grid-cols-1 gap-3 sm:grid-cols-2"><!--[-->`);
			ssrRenderList$2(unref(SKILLS), (s) => {
				_push(`<li>`);
				_push(ssrRenderComponent(_component_Card, {
					size: "sm",
					class: "flex items-center justify-between"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(ssrRenderComponent(_component_CardTitle, null, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`${ssrInterpolate(s.name)}`);
									else return [createTextVNode(toDisplayString(s.name), 1)];
								}),
								_: 2
							}, _parent, _scopeId));
							_push(ssrRenderComponent(_component_Badge, { contrast: "medium" }, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`${ssrInterpolate(s.level)}`);
									else return [createTextVNode(toDisplayString(s.level), 1)];
								}),
								_: 2
							}, _parent, _scopeId));
						} else return [createVNode(_component_CardTitle, null, {
							default: withCtx(() => [createTextVNode(toDisplayString(s.name), 1)]),
							_: 2
						}, 1024), createVNode(_component_Badge, { contrast: "medium" }, {
							default: withCtx(() => [createTextVNode(toDisplayString(s.level), 1)]),
							_: 2
						}, 1024)];
					}),
					_: 2
				}, _parent));
				_push(`</li>`);
			});
			_push(`<!--]--></ul></section><section id="projects" class="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6"><h2 class="mb-8 text-2xl font-semibold tracking-tight sm:text-3xl"><span class="text-accent mr-2">#</span> Pet-проекты </h2><div class="grid grid-cols-1 gap-4 sm:grid-cols-2"><!--[-->`);
			ssrRenderList$2(unref(PROJECTS), (p) => {
				_push(ssrRenderComponent(_component_ButtonLink, {
					key: p.title,
					href: p.link,
					variant: "outline",
					class: "items-start !justify-start text-start"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<span${_scopeId}>`);
							_push(ssrRenderComponent(_component_CardTitle, { class: "text-foreground" }, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`${ssrInterpolate(p.title)}`);
									else return [createTextVNode(toDisplayString(p.title), 1)];
								}),
								_: 2
							}, _parent, _scopeId));
							_push(ssrRenderComponent(_component_CardDescription, { class: "mt-2 block" }, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`${ssrInterpolate(p.description)}`);
									else return [createTextVNode(toDisplayString(p.description), 1)];
								}),
								_: 2
							}, _parent, _scopeId));
							_push(`</span>`);
						} else return [createVNode("span", null, [createVNode(_component_CardTitle, { class: "text-foreground" }, {
							default: withCtx(() => [createTextVNode(toDisplayString(p.title), 1)]),
							_: 2
						}, 1024), createVNode(_component_CardDescription, { class: "mt-2 block" }, {
							default: withCtx(() => [createTextVNode(toDisplayString(p.description), 1)]),
							_: 2
						}, 1024)])];
					}),
					_: 2
				}, _parent));
			});
			_push(`<!--]--></div></section><section id="contacts" class="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6"><h2 class="mb-8 text-2xl font-semibold tracking-tight sm:text-3xl"><span class="text-accent mr-2">#</span> Контакты </h2><div class="flex flex-col gap-3 sm:flex-row sm:gap-4"><!--[-->`);
			ssrRenderList$2(unref(LINKS), (l) => {
				_push(ssrRenderComponent(_component_Button, {
					key: l.label,
					href: l.href,
					variant: "outline",
					class: "sm:flex-1"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(l.label)}`);
						else return [createTextVNode(toDisplayString(l.label), 1)];
					}),
					_: 2
				}, _parent));
			});
			_push(`<!--]--></div></section><footer class="text-muted w-full py-8 text-center text-sm"> © ${ssrInterpolate(unref(ME).foundedYear)} ${ssrInterpolate(unref(ME).name)} · flottiee.bond </footer></main></div>`);
		};
	}
});
// app/app.vue
var _sfc_setup$2 = app_vue_vue_type_script_setup_true_lang_default.setup;
app_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var app_default = app_vue_vue_type_script_setup_true_lang_default;
// node_modules/nuxt/dist/app/components/nuxt-error-page.vue
var _sfc_main$1 = {
	__name: "nuxt-error-page",
	__ssrInlineRender: true,
	props: { error: Object },
	setup(__props) {
		const _error = __props.error;
		const status = Number(_error.statusCode || 500);
		const is404 = status === 404;
		const statusText = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
		const description = _error.message || _error.toString();
		const stack = void 0;
		const _Error404 = defineAsyncComponent(() => import('../build/error-404-Dm6ocMUe.mjs'));
		const _Error = defineAsyncComponent(() => import('../build/error-500-Byddyd6y.mjs'));
		const ErrorTemplate = is404 ? _Error404 : _Error;
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({
				status: unref(status),
				statusText: unref(statusText),
				statusCode: unref(status),
				statusMessage: unref(statusText),
				description: unref(description),
				stack: unref(stack)
			}, _attrs), null, _parent));
		};
	}
};
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fisland-renderer.mjs
var IslandRenderer = () => null;
// node_modules/nuxt/dist/app/components/nuxt-root.vue
var _sfc_main = {
	__name: "nuxt-root",
	__ssrInlineRender: true,
	setup(__props) {
		const nuxtApp = useNuxtApp();
		nuxtApp.deferHydration();
		nuxtApp.ssrContext.url;
		const SingleRenderer = false;
		provide(PageRouteSymbol, useRoute());
		nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup", []);
		const error = /* @__PURE__ */ useError();
		const abortRender = error.value && !nuxtApp.ssrContext.error;
		function invokeAppErrorHandler(err, target, info) {
			const errorHandler = nuxtApp.vueApp.config.errorHandler;
			if (errorHandler && !errorHandler.__nuxt_default) try {
				errorHandler(err, target, info);
			} catch (handlerError) {
				console.error("[nuxt] Error in `app.config.errorHandler`", handlerError);
			}
		}
		onErrorCaptured((err, target, info) => {
			nuxtApp.hooks.callHook("vue:error", err, target, info)?.catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
			{
				const p = nuxtApp.runWithContext(() => showError(err));
				onServerPrefetch(() => p);
				invokeAppErrorHandler(err, target, info);
				return false;
			}
		});
		const islandContext = nuxtApp.ssrContext.islandContext;
		return (_ctx, _push, _parent, _attrs) => {
			ssrRenderSuspense(_push, {
				default: () => {
					if (unref(abortRender)) _push(`<div></div>`);
					else if (unref(error)) _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
					else if (unref(islandContext)) _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
					else if (unref(SingleRenderer)) ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
					else _push(ssrRenderComponent(unref(app_default), null, null, _parent));
				},
				_: 1
			});
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/nuxt/dist/app/components/nuxt-root.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
// node_modules/nuxt/dist/app/entry.js
var entry$1 = async function createNuxtAppServer(ssrContext) {
	const vueApp = createApp(_sfc_main);
	const nuxt = createNuxtApp({
		vueApp,
		ssrContext
	});
	try {
		await applyPlugins(nuxt, virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fplugins_server_default);
		await nuxt.hooks.callHook("app:created", vueApp);
	} catch (error) {
		await nuxt.hooks.callHook("app:error", error);
		nuxt.payload.error ||= createError$2(error);
	}
	if (ssrContext && (ssrContext["~renderResponse"] || ssrContext._renderResponse)) throw new Error("skipping render");
	return vueApp;
};
var entry_default = ((ssrContext) => entry$1(ssrContext));

const entry = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: entry_default
}, Symbol.toStringTag, { value: 'Module' }));

export { useRouter as a, isRootedPath as b, useRuntimeConfig as c, useNuxtApp as d, encodeRoutePath as e, nuxtLinkDefaults as f, entry as g, isAbsoluteHref as i, navigateTo as n, resolveRouteObject as r, sanitizeAnchorHref as s, useHead as u };
//# sourceMappingURL=entry.mjs.map
