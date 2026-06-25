(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/supabase.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/@supabase/supabase-js/dist/index.mjs [app-client] (ecmascript) <locals>");
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])('https://iyywnrcsacwhnpktekvd.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5eXducmNzYWN3aG5wa3Rla3ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NjQ3NzQsImV4cCI6MjA5MTI0MDc3NH0.TADVV6MvcJ2QQo4-gFrl-ATGRFXP00I7IgD1CqkevVs');
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/app/onboarding/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OnboardingPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/supabase.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function OnboardingPage() {
    _s();
    const [tempName, setTempName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const isValid = tempName.trim().length > 0;
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const name = tempName.trim();
        if (!name) return;
        setLoading(true);
        // 🔥 SAVE FACTORY TO SUPABASE
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("factories").insert([
            {
                name
            }
        ]).select().single();
        if (error) {
            console.error(error);
            alert("Error creating factory. Please try again.");
            setLoading(false);
            return;
        }
        // ✅ STORE LOCALLY
        localStorage.setItem("factoryId", data.id);
        localStorage.setItem("factoryName", data.name);
        setLoading(false);
        // 🚀 GO TO APP
        router.push("/aquaops");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-[#eef0f5] flex items-center justify-center px-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-sm space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center flex flex-col items-center space-y-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: "/icon-192.png",
                            alt: "AquaOps Logo",
                            className: "w-12 h-12 rounded-xl"
                        }, void 0, false, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/app/onboarding/page.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-xl font-bold text-[#0d1b3e]",
                            children: "Welcome to AquaOps"
                        }, void 0, false, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/app/onboarding/page.tsx",
                            lineNumber: 57,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-gray-500",
                            children: "Enter your factory name to begin"
                        }, void 0, false, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/app/onboarding/page.tsx",
                            lineNumber: 61,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/app/onboarding/page.tsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "bg-white rounded-2xl shadow-sm px-4 py-4 space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            placeholder: "e.g. COB Water Factory",
                            value: tempName,
                            onChange: (e)=>setTempName(e.target.value),
                            className: "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#0d1b3e]",
                            autoFocus: true
                        }, void 0, false, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/app/onboarding/page.tsx",
                            lineNumber: 70,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: !isValid || loading,
                            className: `w-full py-3 rounded-xl font-semibold text-sm transition ${isValid ? "bg-[#0d1b3e] text-white" : "bg-gray-300 text-gray-500"}`,
                            children: loading ? "Creating..." : "Continue →"
                        }, void 0, false, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/app/onboarding/page.tsx",
                            lineNumber: 79,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/app/onboarding/page.tsx",
                    lineNumber: 66,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-center text-[11px] text-gray-400",
                    children: "You can change this later"
                }, void 0, false, {
                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/app/onboarding/page.tsx",
                    lineNumber: 92,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/app/onboarding/page.tsx",
            lineNumber: 48,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/app/onboarding/page.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
_s(OnboardingPage, "WnzOh6yoKMb010QIyLb2g831U94=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = OnboardingPage;
var _c;
__turbopack_context__.k.register(_c, "OnboardingPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Documents_PROJECTS_AquaOps-clean_AquaOps-clean_0i9x2em._.js.map