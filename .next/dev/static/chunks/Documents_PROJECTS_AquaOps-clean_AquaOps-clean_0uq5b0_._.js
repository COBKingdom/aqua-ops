(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/auth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getUser",
    ()=>getUser,
    "signIn",
    ()=>signIn,
    "signOutUser",
    ()=>signOutUser,
    "signUp",
    ()=>signUp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/supabase.js [app-client] (ecmascript)");
;
async function signUp(email, password) {
    return await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.signUp({
        email,
        password
    });
}
async function signIn(email, password) {
    return await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.signInWithPassword({
        email,
        password
    });
}
async function signOutUser() {
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.signOut();
        // Clear persisted local state
        localStorage.removeItem("aquaops-factory");
        // Future cleanup stores can go here
        // localStorage.removeItem("expense-store")
        // localStorage.removeItem("sales-store")
        // Redirect safely
        window.location.href = "/";
    } catch (error) {
        console.error("Sign out error:", error);
    }
}
async function getUser() {
    const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getUser();
    return data.user;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/auth-modal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthModal",
    ()=>AuthModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/auth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/supabase.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function AuthModal({ onClose }) {
    _s();
    const [isLogin, setIsLogin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const handleSubmit = async (e)=>{
        e?.preventDefault();
        if (!email || !password) return;
        try {
            setLoading(true);
            // LOGIN
            if (isLogin) {
                const { error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signIn"])(email, password);
                if (error) {
                    alert(error.message);
                    setLoading(false);
                    return;
                }
                // GET AUTH USER
                const { data: { user } } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getUser();
                if (!user) {
                    alert("User not found");
                    setLoading(false);
                    return;
                }
                // CHECK IF USER HAS FACTORY
                const { data: factory, error: factoryError } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("factories").select("id, name").eq("user_id", user.id).single();
                // EXISTING FACTORY
                if (factory && !factoryError) {
                    localStorage.setItem("factoryId", factory.id);
                    localStorage.setItem("factoryName", factory.name);
                    router.push("/aquaops");
                } else {
                    // NO FACTORY YET
                    router.push("/onboarding");
                }
            } else {
                // SIGN UP
                const { error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signUp"])(email, password);
                if (error) {
                    alert(error.message);
                    setLoading(false);
                    return;
                }
                alert("Account created successfully. Please check your email and verify your AquaOps account before logging in.");
                setIsLogin(true);
            }
            onClose();
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white p-6 rounded-xl w-full max-w-sm space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-xl font-bold text-center",
                    children: isLogin ? "Login" : "Sign Up"
                }, void 0, false, {
                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/auth-modal.tsx",
                    lineNumber: 118,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "email",
                            placeholder: "Email",
                            className: "w-full p-3 border rounded",
                            value: email,
                            onChange: (e)=>setEmail(e.target.value)
                        }, void 0, false, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/auth-modal.tsx",
                            lineNumber: 128,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "password",
                            placeholder: "Password",
                            className: "w-full p-3 border rounded",
                            value: password,
                            onChange: (e)=>setPassword(e.target.value)
                        }, void 0, false, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/auth-modal.tsx",
                            lineNumber: 138,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: loading,
                            className: "w-full bg-black text-white py-3 rounded disabled:opacity-50",
                            children: loading ? "Please wait..." : isLogin ? "Login" : "Create Account"
                        }, void 0, false, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/auth-modal.tsx",
                            lineNumber: 148,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/auth-modal.tsx",
                    lineNumber: 123,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-center text-blue-600 cursor-pointer",
                    onClick: ()=>setIsLogin(!isLogin),
                    children: isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"
                }, void 0, false, {
                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/auth-modal.tsx",
                    lineNumber: 162,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onClose,
                    className: "w-full text-sm text-gray-500",
                    children: "Close"
                }, void 0, false, {
                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/auth-modal.tsx",
                    lineNumber: 173,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/auth-modal.tsx",
            lineNumber: 116,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/auth-modal.tsx",
        lineNumber: 114,
        columnNumber: 5
    }, this);
}
_s(AuthModal, "cuWvxRh9XkRr8hXNPcmcDB8vuRk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AuthModal;
var _c;
__turbopack_context__.k.register(_c, "AuthModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/app/auth/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AuthPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$auth$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/auth-modal.tsx [app-client] (ecmascript)");
"use client";
;
;
function AuthPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex items-center justify-center bg-[#eef0f5]",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$auth$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthModal"], {
            onClose: ()=>{}
        }, void 0, false, {
            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/app/auth/page.tsx",
            lineNumber: 8,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/app/auth/page.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = AuthPage;
var _c;
__turbopack_context__.k.register(_c, "AuthPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=Documents_PROJECTS_AquaOps-clean_AquaOps-clean_0uq5b0_._.js.map