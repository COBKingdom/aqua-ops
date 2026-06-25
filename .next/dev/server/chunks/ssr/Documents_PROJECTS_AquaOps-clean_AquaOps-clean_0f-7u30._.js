module.exports = [
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/format.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatCurrency",
    ()=>formatCurrency
]);
function formatCurrency(value) {
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 0
    }).format(value || 0);
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Dashboard",
    ()=>Dashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/format.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/lucide-react/dist/esm/icons/wallet.js [app-ssr] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-ssr] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Factory$3e$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/lucide-react/dist/esm/icons/factory.js [app-ssr] (ecmascript) <export default as Factory>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-ssr] (ecmascript) <export default as BarChart3>");
"use client";
;
;
;
;
function Dashboard({ setActiveTab }) {
    const [sales, setSales] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [expenses, setExpenses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [production, setProduction] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loans, setLoans] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [bank, setBank] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [debts, setDebts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [factoryName, setFactoryName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setSales(JSON.parse(localStorage.getItem("sales") || "[]"));
        setExpenses(JSON.parse(localStorage.getItem("expenses") || "[]"));
        setProduction(JSON.parse(localStorage.getItem("production") || "[]"));
        setLoans(JSON.parse(localStorage.getItem("loans") || "[]"));
        setBank(JSON.parse(localStorage.getItem("bank") || "[]"));
        setDebts(JSON.parse(localStorage.getItem("debts") || "[]"));
        const name = localStorage.getItem("factoryName");
        if (name) setFactoryName(name);
    }, []);
    // 💰 CALCULATIONS
    const totalSales = sales.reduce((s, i)=>s + (i.amount || 0), 0);
    const totalExpenses = expenses.reduce((s, i)=>s + (i.amount || 0), 0);
    const totalProduction = production.reduce((s, i)=>s + (i.quantity || 0), 0);
    const totalLoans = loans.reduce((s, l)=>s + (l.amount || 0), 0);
    const totalLoanPaid = loans.reduce((s, l)=>s + (l.amountPaid || 0), 0);
    const outstandingLoans = totalLoans - totalLoanPaid;
    const totalDebts = debts.reduce((s, d)=>s + (d.amount || 0), 0);
    const deposits = bank.filter((t)=>t.type === "deposit").reduce((s, t)=>s + (t.amount || 0), 0);
    const withdrawals = bank.filter((t)=>t.type === "withdraw").reduce((s, t)=>s + (t.amount || 0), 0);
    const bankBalance = deposits - withdrawals;
    const cashOnHand = totalSales - totalExpenses - totalLoanPaid - deposits;
    const netPosition = cashOnHand + bankBalance + totalDebts - outstandingLoans;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-[#0d1b3e] text-white rounded-2xl p-5 shadow-md",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs opacity-80",
                        children: [
                            factoryName || "Factory",
                            " Financial Overview"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-2xl font-bold mt-2",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(cashOnHand)
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                        lineNumber: 77,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs opacity-70",
                        children: "Cash on Hand"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-4 mt-5 text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "opacity-70",
                                        children: "Bank"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                        lineNumber: 86,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-semibold",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(bankBalance)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                        lineNumber: 87,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                lineNumber: 85,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "opacity-70",
                                        children: "Loans"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                        lineNumber: 93,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-semibold",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(outstandingLoans)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                        lineNumber: 94,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                lineNumber: 92,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "opacity-70",
                                        children: "Debts"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                        lineNumber: 100,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-semibold",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(totalDebts)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                        lineNumber: 101,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                lineNumber: 99,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "opacity-70",
                                        children: "Net Position"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                        lineNumber: 107,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-semibold",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(netPosition)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                        lineNumber: 108,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                lineNumber: 106,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-semibold text-gray-700 mb-2",
                        children: "Quick Actions"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                        lineNumber: 118,
                        columnNumber: 3
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTab("expenses"),
                                className: "flex items-center gap-3 bg-[#2563eb] text-white py-3 px-3 rounded-xl font-medium shadow-sm transition active:scale-[0.97]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white/20 p-1.5 rounded-lg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                            lineNumber: 130,
                                            columnNumber: 5
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                        lineNumber: 129,
                                        columnNumber: 3
                                    }, this),
                                    "Add Expense"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                lineNumber: 125,
                                columnNumber: 1
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTab("sales"),
                                className: "flex items-center gap-3 bg-blue-50 text-[#1f3a8a] py-3 px-3 rounded-xl font-medium transition active:scale-[0.97]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-blue-100 p-1.5 rounded-lg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                            lineNumber: 141,
                                            columnNumber: 9
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                        lineNumber: 140,
                                        columnNumber: 7
                                    }, this),
                                    "Add Sale"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                lineNumber: 136,
                                columnNumber: 5
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTab("production"),
                                className: "flex items-center gap-3 bg-blue-50 text-[#1f3a8a] py-3 px-3 rounded-xl font-medium transition active:scale-[0.97]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-blue-100 p-1.5 rounded-lg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Factory$3e$__["Factory"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                            lineNumber: 152,
                                            columnNumber: 9
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                        lineNumber: 151,
                                        columnNumber: 7
                                    }, this),
                                    "Production"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                lineNumber: 147,
                                columnNumber: 5
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTab("reports"),
                                className: "flex items-center gap-3 bg-orange-50 text-[#1f3a8a] py-3 px-3 rounded-xl font-medium transition active:scale-[0.97]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-orange-100 p-1.5 rounded-lg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                            lineNumber: 163,
                                            columnNumber: 9
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                        lineNumber: 162,
                                        columnNumber: 7
                                    }, this),
                                    "Reports"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                lineNumber: 158,
                                columnNumber: 5
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                        lineNumber: 122,
                        columnNumber: 3
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                lineNumber: 117,
                columnNumber: 1
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white p-4 rounded-xl shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-semibold text-gray-700 mb-2",
                        children: "Summary"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                        lineNumber: 173,
                        columnNumber: 3
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2 text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Sales"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                        lineNumber: 179,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(totalSales)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                        lineNumber: 180,
                                        columnNumber: 7
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                lineNumber: 178,
                                columnNumber: 5
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Expenses"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                        lineNumber: 184,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(totalExpenses)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                        lineNumber: 185,
                                        columnNumber: 7
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                lineNumber: 183,
                                columnNumber: 5
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Production"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                        lineNumber: 189,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            totalProduction,
                                            " bags"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                        lineNumber: 190,
                                        columnNumber: 7
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                lineNumber: 188,
                                columnNumber: 5
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                        lineNumber: 177,
                        columnNumber: 3
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                lineNumber: 172,
                columnNumber: 1
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white p-4 rounded-xl shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-semibold text-gray-700 mb-3",
                        children: "Recent Activity"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                        lineNumber: 197,
                        columnNumber: 3
                    }, this),
                    [
                        ...sales.map((s)=>({
                                type: "sale",
                                label: "Sale",
                                amount: s.amount,
                                date: s.date || new Date().toISOString()
                            })),
                        ...expenses.map((e)=>({
                                type: "expense",
                                label: e.note || "Expense",
                                amount: e.amount,
                                date: e.date || ""
                            })),
                        ...production.map((p)=>({
                                type: "production",
                                label: `${p.quantity || 0} bags produced`,
                                amount: p.quantity || 0,
                                date: p.date || ""
                            }))
                    ].sort((a, b)=>(b.date || "").localeCompare(a.date || "")).slice(0, 6).map((item, index)=>{
                        const isSale = item.type === "sale";
                        const isExpense = item.type === "expense";
                        const isProduction = item.type === "production";
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between py-2 border-b last:border-none",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `p-1.5 rounded-lg ${isSale ? "bg-green-100 text-green-600" : isExpense ? "bg-red-100 text-red-500" : "bg-blue-100 text-[#0d1b3e]"}`,
                                            children: [
                                                isSale && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "📈"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                                    lineNumber: 244,
                                                    columnNumber: 26
                                                }, this),
                                                isExpense && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "📉"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                                    lineNumber: 245,
                                                    columnNumber: 29
                                                }, this),
                                                isProduction && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "📦"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                                    lineNumber: 246,
                                                    columnNumber: 32
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                            lineNumber: 235,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-medium text-gray-800",
                                                    children: item.label
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                                    lineNumber: 250,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-gray-400",
                                                    children: item.date || "No date"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                                    lineNumber: 253,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                            lineNumber: 249,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                    lineNumber: 234,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: `text-sm font-semibold ${isSale ? "text-green-600" : isExpense ? "text-red-500" : "text-[#0d1b3e]"}`,
                                    children: isProduction ? `${item.amount} bags` : `${isExpense ? "-" : "+"}${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(item.amount)}`
                                }, void 0, false, {
                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                    lineNumber: 260,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, index, true, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                            lineNumber: 229,
                            columnNumber: 9
                        }, this);
                    })
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                lineNumber: 196,
                columnNumber: 1
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/ui/card.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardAction",
    ()=>CardAction,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/utils.ts [app-ssr] (ecmascript)");
;
;
function Card({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/ui/card.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
function CardHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/ui/card.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
function CardTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('leading-none font-semibold', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/ui/card.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
function CardDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground text-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/ui/card.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
function CardAction({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-action",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/ui/card.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
function CardContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('px-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/ui/card.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
function CardFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex items-center px-6 [.border-t]:pt-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/ui/card.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/ui/input.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/utils.ts [app-ssr] (ecmascript)");
;
;
function Input({ className, type, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        "data-slot": "input",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm', 'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]', 'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/ui/input.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/ui/label.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Label",
    ()=>Label
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/@radix-ui/react-label/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function Label({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "label",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/ui/label.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/store.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAppStore",
    ()=>useAppStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
"use client";
;
const generateId = ()=>Math.random().toString(36).substring(2, 9);
const getToday = ()=>new Date().toISOString().split("T")[0];
const useAppStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        productions: [
            {
                id: "1",
                date: getToday(),
                productType: "sachet",
                bagsProduced: 45,
                piecesPerBag: 20,
                shift: "morning"
            },
            {
                id: "2",
                date: getToday(),
                productType: "sachet",
                bagsProduced: 38,
                piecesPerBag: 20,
                shift: "evening"
            }
        ],
        sales: [
            {
                id: "1",
                date: getToday(),
                customerId: "1",
                customerName: "Mama Ngozi",
                bagsSold: 10,
                pricePerBag: 350,
                total: 3500,
                paymentType: "cash",
                amountPaid: 3500,
                balance: 0
            },
            {
                id: "2",
                date: getToday(),
                customerId: "2",
                customerName: "Alhaji Musa",
                bagsSold: 20,
                pricePerBag: 350,
                total: 7000,
                paymentType: "credit",
                amountPaid: 5000,
                balance: 2000
            }
        ],
        customers: [
            {
                id: "1",
                name: "Mama Ngozi",
                phone: "08012345678",
                totalDebt: 0
            },
            {
                id: "2",
                name: "Alhaji Musa",
                phone: "08087654321",
                totalDebt: 2000
            },
            {
                id: "3",
                name: "Mr. Chukwu",
                phone: "09011223344",
                totalDebt: 5500
            }
        ],
        expenses: [
            {
                id: "1",
                date: getToday(),
                category: "nylon",
                amount: 15000,
                notes: "2 rolls of nylon"
            },
            {
                id: "2",
                date: getToday(),
                category: "fuel",
                amount: 8000,
                notes: "Generator fuel"
            }
        ],
        inventory: {
            nylonRolls: 3,
            bagsInStore: 120,
            bottledWater: 50
        },
        addProduction: (production)=>set((state)=>({
                    productions: [
                        ...state.productions,
                        {
                            ...production,
                            id: generateId()
                        }
                    ]
                })),
        addSale: (sale)=>set((state)=>{
                const newSales = [
                    ...state.sales,
                    {
                        ...sale,
                        id: generateId()
                    }
                ];
                const customers = state.customers.map((c)=>c.id === sale.customerId ? {
                        ...c,
                        totalDebt: c.totalDebt + sale.balance
                    } : c);
                return {
                    sales: newSales,
                    customers
                };
            }),
        addCustomer: (customer)=>set((state)=>({
                    customers: [
                        ...state.customers,
                        {
                            ...customer,
                            id: generateId()
                        }
                    ]
                })),
        addExpense: (expense)=>set((state)=>({
                    expenses: [
                        ...state.expenses,
                        {
                            ...expense,
                            id: generateId()
                        }
                    ]
                })),
        updateInventory: (inventory)=>set((state)=>({
                    inventory: {
                        ...state.inventory,
                        ...inventory
                    }
                })),
        getTodayStats: ()=>{
            const state = get();
            const today = getToday();
            const bagsProduced = state.productions.filter((p)=>p.date === today).reduce((sum, p)=>sum + p.bagsProduced, 0);
            const salesToday = state.sales.filter((s)=>s.date === today).reduce((sum, s)=>sum + s.amountPaid, 0);
            const expensesToday = state.expenses.filter((e)=>e.date === today).reduce((sum, e)=>sum + e.amount, 0);
            const profitToday = salesToday - expensesToday;
            return {
                bagsProduced,
                salesToday,
                expensesToday,
                profitToday
            };
        }
    }));
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/supabase.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/@supabase/supabase-js/dist/index.mjs [app-ssr] (ecmascript) <locals>");
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])('https://iyywnrcsacwhnpktekvd.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5eXducmNzYWN3aG5wa3Rla3ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NjQ3NzQsImV4cCI6MjA5MTI0MDc3NH0.TADVV6MvcJ2QQo4-gFrl-ATGRFXP00I7IgD1CqkevVs');
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/factory.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getFactoryId",
    ()=>getFactoryId,
    "getFactoryName",
    ()=>getFactoryName,
    "setFactoryName",
    ()=>setFactoryName
]);
function getFactoryId() {
    let factoryId = localStorage.getItem("factory_id");
    if (!factoryId) {
        factoryId = crypto.randomUUID();
        localStorage.setItem("factory_id", factoryId);
    }
    return factoryId;
}
function getFactoryName() {
    return localStorage.getItem("factory_name");
}
function setFactoryName(name) {
    localStorage.setItem("factory_name", name);
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/production.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Production",
    ()=>Production
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/ui/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/ui/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/ui/label.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/supabase.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/factory.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
function Production() {
    const { addProduction } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppStore"])();
    const [saved, setSaved] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        date: new Date().toISOString().split("T")[0],
        productType: "sachet",
        bagsProduced: "",
        piecesPerBag: "20",
        shift: "morning"
    });
    const handleSubmit = async ()=>{
        const factoryId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFactoryId"])();
        if (!form.bagsProduced || !form.piecesPerBag) return;
        // ✅ SAVE TO SUPABASE
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("production").insert([
            {
                factory_id: factoryId,
                date: form.date,
                product_type: form.productType,
                bags_produced: parseInt(form.bagsProduced),
                pieces_per_bag: parseInt(form.piecesPerBag),
                shift: form.shift
            }
        ]);
        if (error) {
            console.error(error);
            alert("Error saving to database");
            return;
        }
        window.gtag('event', 'production_saved', {
            value: parseInt(form.bagsProduced)
        });
        // ✅ KEEP EXISTING LOCAL STATE
        addProduction({
            date: form.date,
            productType: form.productType,
            bagsProduced: parseInt(form.bagsProduced),
            piecesPerBag: parseInt(form.piecesPerBag),
            shift: form.shift
        });
        setSaved(true);
        setTimeout(()=>{
            setSaved(false);
            setForm({
                ...form,
                bagsProduced: ""
            });
        }, 2000);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3 p-3 pb-16",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "pt-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-lg font-bold text-[#0d1b3e]",
                        children: "Production"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/production.tsx",
                        lineNumber: 78,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-500",
                        children: "Record daily production"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/production.tsx",
                        lineNumber: 79,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/production.tsx",
                lineNumber: 77,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                className: "border border-gray-100 shadow-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                    className: "space-y-3 p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                    htmlFor: "date",
                                    className: "text-sm font-medium text-[#0d1b3e]",
                                    children: "Date"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/production.tsx",
                                    lineNumber: 87,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                    id: "date",
                                    type: "date",
                                    value: form.date,
                                    onChange: (e)=>setForm({
                                            ...form,
                                            date: e.target.value
                                        }),
                                    className: "h-11 text-sm"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/production.tsx",
                                    lineNumber: 90,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/production.tsx",
                            lineNumber: 86,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                    className: "text-sm font-medium text-[#0d1b3e]",
                                    children: "Product Type"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/production.tsx",
                                    lineNumber: 101,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setForm({
                                                    ...form,
                                                    productType: "sachet"
                                                }),
                                            className: `h-11 rounded-lg text-sm font-medium transition ${form.productType === "sachet" ? "bg-[#2563eb] text-white" : "bg-blue-50 text-[#2563eb]"}`,
                                            children: "Sachet"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/production.tsx",
                                            lineNumber: 106,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setForm({
                                                    ...form,
                                                    productType: "bottle"
                                                }),
                                            className: `h-11 rounded-lg text-sm font-medium transition ${form.productType === "bottle" ? "bg-[#2563eb] text-white" : "bg-blue-50 text-[#2563eb]"}`,
                                            children: "Bottle"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/production.tsx",
                                            lineNumber: 118,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/production.tsx",
                                    lineNumber: 104,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/production.tsx",
                            lineNumber: 100,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                    htmlFor: "bags",
                                    className: "text-sm font-medium text-[#0d1b3e]",
                                    children: "Bags Produced"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/production.tsx",
                                    lineNumber: 135,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                    id: "bags",
                                    type: "number",
                                    inputMode: "numeric",
                                    placeholder: "e.g. 120",
                                    value: form.bagsProduced,
                                    onChange: (e)=>setForm({
                                            ...form,
                                            bagsProduced: e.target.value
                                        }),
                                    className: "h-11 text-sm"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/production.tsx",
                                    lineNumber: 138,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/production.tsx",
                            lineNumber: 134,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                    htmlFor: "pieces",
                                    className: "text-sm font-medium text-[#0d1b3e]",
                                    children: "Pieces per Bag"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/production.tsx",
                                    lineNumber: 151,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                    id: "pieces",
                                    type: "number",
                                    inputMode: "numeric",
                                    placeholder: "20",
                                    value: form.piecesPerBag,
                                    onChange: (e)=>setForm({
                                            ...form,
                                            piecesPerBag: e.target.value
                                        }),
                                    className: "h-11 text-sm"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/production.tsx",
                                    lineNumber: 154,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/production.tsx",
                            lineNumber: 150,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleSubmit,
                            disabled: !form.bagsProduced || !form.piecesPerBag || saved,
                            className: `w-full h-11 rounded-lg text-sm font-semibold transition active:scale-[0.97] ${saved ? "bg-green-600 text-white" : "bg-[#2563eb] text-white"}`,
                            children: saved ? "Saved" : "Save Production"
                        }, void 0, false, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/production.tsx",
                            lineNumber: 166,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/production.tsx",
                    lineNumber: 83,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/production.tsx",
                lineNumber: 82,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/production.tsx",
        lineNumber: 74,
        columnNumber: 3
    }, this);
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Sales",
    ()=>Sales
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/supabase.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/factory.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function Sales() {
    const [saved, setSaved] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        date: new Date().toISOString().split("T")[0],
        customerName: "",
        bagsSold: "",
        pricePerBag: "",
        amountPaid: ""
    });
    const handleSubmit = async ()=>{
        const factoryId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFactoryId"])();
        if (!form.bagsSold || !form.pricePerBag || !form.customerName) return;
        const total = parseInt(form.bagsSold) * parseInt(form.pricePerBag);
        const paid = parseInt(form.amountPaid || "0");
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("sales").insert([
            {
                factory_id: factoryId,
                date: form.date,
                customer_name: form.customerName,
                bags_sold: parseInt(form.bagsSold),
                price_per_bag: parseInt(form.pricePerBag),
                total_amount: total,
                amount_paid: paid,
                balance: total - paid
            }
        ]);
        if (error) {
            console.error(error);
            alert("Error saving sale");
            return;
        }
        window.gtag('event', 'sale_recorded', {
            value: total
        });
        setSaved(true);
        setTimeout(()=>{
            setSaved(false);
            setForm({
                ...form,
                customerName: "",
                bagsSold: "",
                pricePerBag: "",
                amountPaid: ""
            });
        }, 2000);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4 p-3 pb-20",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "pt-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-lg font-bold text-[#0d1b3e]",
                        children: "Sales"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                        lineNumber: 76,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-500",
                        children: "Record daily sales"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                        lineNumber: 77,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                lineNumber: 75,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white p-4 rounded-xl shadow-sm space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm font-medium text-[#0d1b3e]",
                                children: "Date"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                                lineNumber: 84,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "date",
                                value: form.date,
                                onChange: (e)=>setForm({
                                        ...form,
                                        date: e.target.value
                                    }),
                                className: "w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                                lineNumber: 87,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                        lineNumber: 83,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm font-medium text-[#0d1b3e]",
                                children: "Product Type"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                                lineNumber: 97,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setForm({
                                                ...form,
                                                productType: "sachet"
                                            }),
                                        className: `h-11 rounded-lg text-sm font-medium ${form.productType === "sachet" ? "bg-[#2563eb] text-white" : "bg-blue-50 text-[#2563eb]"}`,
                                        children: "Sachet"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                                        lineNumber: 103,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setForm({
                                                ...form,
                                                productType: "bottle"
                                            }),
                                        className: `h-11 rounded-lg text-sm font-medium ${form.productType === "bottle" ? "bg-[#2563eb] text-white" : "bg-blue-50 text-[#2563eb]"}`,
                                        children: "Bottle"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                                        lineNumber: 114,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                                lineNumber: 101,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                        lineNumber: 96,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm font-medium text-[#0d1b3e]",
                                children: "Quantity Sold"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                                lineNumber: 130,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                placeholder: "e.g. 50 bags",
                                value: form.quantity,
                                onChange: (e)=>setForm({
                                        ...form,
                                        quantity: e.target.value
                                    }),
                                className: "w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                                lineNumber: 133,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                        lineNumber: 129,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm font-medium text-[#0d1b3e]",
                                children: "Amount (₦)"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                                lineNumber: 144,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                placeholder: "e.g. 25000",
                                value: form.amount,
                                onChange: (e)=>setForm({
                                        ...form,
                                        amount: e.target.value
                                    }),
                                className: "w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                                lineNumber: 147,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                        lineNumber: 143,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSubmit,
                        disabled: !form.amount || !form.quantity,
                        className: "w-full h-11 bg-[#2563eb] text-white rounded-lg text-sm font-semibold active:scale-[0.97]",
                        children: "Save Sale"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                        lineNumber: 157,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                lineNumber: 80,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
        lineNumber: 72,
        columnNumber: 3
    }, this);
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/ui/button.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/@radix-ui/react-slot/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: 'bg-primary text-primary-foreground hover:bg-primary/90',
            destructive: 'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
            outline: 'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
            secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
            ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
            link: 'text-primary underline-offset-4 hover:underline'
        },
        size: {
            default: 'h-9 px-4 py-2 has-[>svg]:px-3',
            sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
            lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
            icon: 'size-9',
            'icon-sm': 'size-8',
            'icon-lg': 'size-10'
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'default'
    }
});
function Button({ className, variant, size, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Slot"] : 'button';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/ui/button.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Expenses",
    ()=>Expenses
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/supabase.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/ui/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/ui/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/ui/label.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/lucide-react/dist/esm/icons/wallet.js [app-ssr] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/factory.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
function Expenses() {
    const [saved, setSaved] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        date: new Date().toISOString().split("T")[0],
        category: "",
        amount: "",
        notes: ""
    });
    const handleSubmit = async ()=>{
        const factoryId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFactoryId"])();
        if (!form.amount || !form.category) return;
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("expenses").insert([
            {
                factory_id: factoryId,
                date: form.date,
                category: form.category,
                amount: parseInt(form.amount),
                notes: form.notes
            }
        ]);
        if (error) {
            console.error(error);
            alert("Error saving expense");
            return;
        }
        window.gtag('event', 'expense_added', {
            value: parseInt(form.amount)
        });
        setSaved(true);
        setTimeout(()=>{
            setSaved(false);
            setForm({
                ...form,
                amount: "",
                category: "",
                notes: ""
            });
        }, 2000);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6 p-4 pb-24",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "pt-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold",
                        children: "Expenses"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted-foreground",
                        children: "Record daily expenses"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                className: "border-0 shadow-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                    className: "space-y-5 p-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                    children: "Date"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                                    lineNumber: 73,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                    type: "date",
                                    value: form.date,
                                    onChange: (e)=>setForm({
                                            ...form,
                                            date: e.target.value
                                        })
                                }, void 0, false, {
                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                                    lineNumber: 74,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                    children: "Category"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                                    lineNumber: 84,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                    placeholder: "e.g. Fuel, Nylon, Labour",
                                    value: form.category,
                                    onChange: (e)=>setForm({
                                            ...form,
                                            category: e.target.value
                                        })
                                }, void 0, false, {
                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                                    lineNumber: 85,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                    children: "Amount (₦)"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                                    lineNumber: 95,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                    type: "number",
                                    value: form.amount,
                                    onChange: (e)=>setForm({
                                            ...form,
                                            amount: e.target.value
                                        })
                                }, void 0, false, {
                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                                    lineNumber: 96,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                            lineNumber: 94,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                    children: "Notes"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                                    lineNumber: 106,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                    placeholder: "Optional",
                                    value: form.notes,
                                    onChange: (e)=>setForm({
                                            ...form,
                                            notes: e.target.value
                                        })
                                }, void 0, false, {
                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                                    lineNumber: 107,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                            lineNumber: 105,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: handleSubmit,
                            className: "h-14 w-full",
                            children: saved ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                        className: "mr-2 h-5 w-5"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                                        lineNumber: 119,
                                        columnNumber: 17
                                    }, this),
                                    "Saved!"
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"], {
                                        className: "mr-2 h-5 w-5"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                                        lineNumber: 124,
                                        columnNumber: 17
                                    }, this),
                                    "Save Expense"
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                            lineNumber: 116,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                    lineNumber: 71,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Debts",
    ()=>Debts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/supabase.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/factory.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function Debts() {
    const [debts, setDebts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [filter, setFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("today");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchDebts();
    }, [
        filter
    ]);
    function getDateRange() {
        const today = new Date();
        const format = (date)=>date.toISOString().split("T")[0];
        if (filter === "today") {
            const d = format(today);
            return {
                start: d,
                end: d
            };
        }
        if (filter === "week") {
            const firstDay = new Date(today.setDate(today.getDate() - today.getDay()));
            return {
                start: format(firstDay),
                end: format(new Date())
            };
        }
        if (filter === "month") {
            const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
            return {
                start: format(firstDay),
                end: format(new Date())
            };
        }
    }
    async function fetchDebts() {
        const factoryId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFactoryId"])();
        const range = getDateRange();
        if (!range) return;
        const { start, end } = range;
        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("sales").select("*").eq("factory_id", factoryId).gte("date", start).lte("date", end);
        const grouped = {};
        data?.forEach((item)=>{
            if (!grouped[item.customer_name]) {
                grouped[item.customer_name] = {
                    customer_name: item.customer_name,
                    total_amount: 0,
                    amount_paid: 0,
                    balance: 0
                };
            }
            grouped[item.customer_name].total_amount += item.total_amount;
            grouped[item.customer_name].amount_paid += item.amount_paid;
            grouped[item.customer_name].balance += item.balance;
        });
        setDebts(Object.values(grouped));
    }
    async function recordPayment(customerName) {
        const amount = prompt("Enter amount paid");
        if (!amount) return;
        let payment = parseInt(amount);
        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("sales").select("*").eq("customer_name", customerName);
        for (const sale of data || []){
            if (sale.balance > 0 && payment > 0) {
                const deduction = Math.min(payment, sale.balance);
                await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("sales").update({
                    amount_paid: sale.amount_paid + deduction,
                    balance: sale.balance - deduction
                }).eq("id", sale.id);
                payment -= deduction;
                // ✅ TRACK EVENT HERE (VERY IMPORTANT)
                if (window.gtag) {
                    window.gtag('event', 'debt_payment', {
                        value: deduction
                    });
                }
            }
        }
        fetchDebts();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-4xl mx-auto space-y-6 p-4 pb-24",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-2xl font-bold",
                    children: "Customer Debts"
                }, void 0, false, {
                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx",
                    lineNumber: 128,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx",
                lineNumber: 127,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2",
                children: [
                    "today",
                    "week",
                    "month"
                ].map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setFilter(f),
                        className: `px-4 py-2 rounded-full shadow-sm ${filter === f ? "bg-black text-white shadow-md" : "bg-gray-200"}`,
                        children: f.toUpperCase()
                    }, f, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx",
                        lineNumber: 134,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx",
                lineNumber: 132,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: debts.map((d, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white p-4 rounded-xl shadow-md border flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-semibold text-lg",
                                        children: d.customer_name
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx",
                                        lineNumber: 156,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-500",
                                        children: [
                                            "Total: ₦",
                                            d.total_amount.toLocaleString()
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx",
                                        lineNumber: 157,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-500",
                                        children: [
                                            "Paid: ₦",
                                            d.amount_paid.toLocaleString()
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx",
                                        lineNumber: 160,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx",
                                lineNumber: 155,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-right",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-red-600 font-bold",
                                        children: [
                                            "₦",
                                            d.balance.toLocaleString()
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx",
                                        lineNumber: 166,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>recordPayment(d.customer_name),
                                        className: "mt-2 bg-green-600 text-white px-3 py-1 rounded shadow-sm",
                                        children: "Record Payment"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx",
                                        lineNumber: 170,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx",
                                lineNumber: 165,
                                columnNumber: 13
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx",
                        lineNumber: 151,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx",
                lineNumber: 149,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx",
        lineNumber: 125,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/bottom-nav.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BottomNav",
    ()=>BottomNav
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/lucide-react/dist/esm/icons/house.js [app-ssr] (ecmascript) <export default as Home>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/lucide-react/dist/esm/icons/package.js [app-ssr] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-ssr] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/lucide-react/dist/esm/icons/wallet.js [app-ssr] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-ssr] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$landmark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Landmark$3e$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/lucide-react/dist/esm/icons/landmark.js [app-ssr] (ecmascript) <export default as Landmark>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$banknote$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Banknote$3e$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/lucide-react/dist/esm/icons/banknote.js [app-ssr] (ecmascript) <export default as Banknote>");
"use client";
;
;
function BottomNav({ activeTab, setActiveTab }) {
    const tabs = [
        {
            id: "dashboard",
            label: "Dashboard",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"]
        },
        {
            id: "production",
            label: "Production",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"]
        },
        {
            id: "sales",
            label: "Sales",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"]
        },
        {
            id: "expenses",
            label: "Expenses",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"]
        },
        {
            id: "debts",
            label: "Debts",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"]
        },
        {
            id: "loans",
            label: "Loans",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$banknote$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Banknote$3e$__["Banknote"]
        },
        {
            id: "bank",
            label: "Bank",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$landmark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Landmark$3e$__["Landmark"]
        },
        {
            id: "reports",
            label: "Reports",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"]
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white border-t border-gray-100",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-4 gap-1.5 p-1.5",
            children: tabs.map((tab)=>{
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>setActiveTab(tab.id),
                    className: `relative flex flex-col items-center justify-center py-1.5 rounded-lg transition
                ${isActive ? "bg-[#0d1b3e] text-white" : "bg-white text-[#1f3a8a] border border-[#e0e7ff]"}
              `,
                    children: [
                        isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "absolute top-1 right-2 w-1.5 h-1.5 bg-orange-400 rounded-full"
                        }, void 0, false, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/bottom-nav.tsx",
                            lineNumber: 53,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                            size: 18,
                            strokeWidth: 2
                        }, void 0, false, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/bottom-nav.tsx",
                            lineNumber: 56,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[9px] mt-0.5 font-medium leading-none",
                            children: tab.label
                        }, void 0, false, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/bottom-nav.tsx",
                            lineNumber: 58,
                            columnNumber: 15
                        }, this)
                    ]
                }, tab.id, true, {
                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/bottom-nav.tsx",
                    lineNumber: 40,
                    columnNumber: 13
                }, this);
            })
        }, void 0, false, {
            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/bottom-nav.tsx",
            lineNumber: 33,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/bottom-nav.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Reports",
    ()=>Reports
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/supabase.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/factory.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function Reports() {
    const [filter, setFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("today");
    const [view, setView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("summary");
    const [summary, setSummary] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        production: 0,
        sales: 0,
        expenses: 0,
        profit: 0,
        debt: 0
    });
    const [productionList, setProductionList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [salesList, setSalesList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [expensesList, setExpensesList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchData();
    }, [
        filter
    ]);
    function getDateRange() {
        const today = new Date();
        const format = (date)=>date.toISOString().split("T")[0];
        if (filter === "today") {
            const d = format(today);
            return {
                start: d,
                end: d
            };
        }
        if (filter === "week") {
            const firstDay = new Date(today.setDate(today.getDate() - today.getDay()));
            return {
                start: format(firstDay),
                end: format(new Date())
            };
        }
        if (filter === "month") {
            const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
            return {
                start: format(firstDay),
                end: format(new Date())
            };
        }
    }
    async function fetchData() {
        const factoryId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFactoryId"])();
        const range = getDateRange();
        if (!range) return;
        const { start, end } = range;
        const { data: production } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("production").select("*").eq("factory_id", factoryId).gte("date", start).lte("date", end);
        const { data: sales } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("sales").select("*").eq("factory_id", factoryId).gte("date", start).lte("date", end);
        const { data: expenses } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("expenses").select("*").eq("factory_id", factoryId).gte("date", start).lte("date", end);
        setProductionList(production || []);
        setSalesList(sales || []);
        setExpensesList(expenses || []);
        const totalProduction = production?.reduce((sum, p)=>sum + p.bags_produced, 0) || 0;
        const totalSales = sales?.reduce((sum, s)=>sum + s.total_amount, 0) || 0;
        const totalDebt = sales?.reduce((sum, s)=>sum + s.balance, 0) || 0;
        const totalExpenses = expenses?.reduce((sum, e)=>sum + e.amount, 0) || 0;
        const profit = totalSales - totalExpenses;
        setSummary({
            production: totalProduction,
            sales: totalSales,
            expenses: totalExpenses,
            profit,
            debt: totalDebt
        });
    }
    const shareWhatsApp = ()=>{
        const factoryName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFactoryName"])() || "My Factory";
        const report = `
📊 AquaOps Report

Factory: ${factoryName}
Period: ${filter.toUpperCase()}

Production: ${summary.production}
Sales: ₦${summary.sales.toLocaleString()}
Expenses: ₦${summary.expenses.toLocaleString()}
Profit: ₦${summary.profit.toLocaleString()}
Debt: ₦${summary.debt.toLocaleString()}
`;
        const encoded = encodeURIComponent(report);
        window.open(`https://wa.me/?text=${encoded}`, "_blank");
    };
    const sendEmail = ()=>{
        const factoryName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFactoryName"])() || "My Factory";
        const subject = `AquaOps Report - ${factoryName}`;
        const body = `
AquaOps Report

Factory: ${factoryName}
Period: ${filter.toUpperCase()}

Production: ${summary.production}
Sales: ₦${summary.sales.toLocaleString()}
Expenses: ₦${summary.expenses.toLocaleString()}
Profit: ₦${summary.profit.toLocaleString()}
Debt: ₦${summary.debt.toLocaleString()}
`;
        const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-4xl mx-auto space-y-6 p-4 pb-24",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-2xl font-bold",
                children: "Reports"
            }, void 0, false, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                lineNumber: 161,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2",
                children: [
                    "today",
                    "week",
                    "month"
                ].map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setFilter(f),
                        className: `px-4 py-2 rounded-full ${filter === f ? "bg-black text-white" : "bg-gray-200"}`,
                        children: f.toUpperCase()
                    }, f, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                        lineNumber: 166,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                lineNumber: 164,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setView("summary"),
                        className: `px-4 py-2 rounded ${view === "summary" ? "bg-black text-white" : "bg-gray-200"}`,
                        children: "Summary"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                        lineNumber: 180,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setView("history"),
                        className: `px-4 py-2 rounded ${view === "history" ? "bg-black text-white" : "bg-gray-200"}`,
                        children: "History"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                        lineNumber: 188,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                lineNumber: 179,
                columnNumber: 7
            }, this),
            view === "summary" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white p-4 rounded shadow",
                                children: [
                                    "Production: ",
                                    summary.production
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                                lineNumber: 202,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white p-4 rounded shadow",
                                children: [
                                    "Sales: ₦",
                                    summary.sales.toLocaleString()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                                lineNumber: 205,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white p-4 rounded shadow",
                                children: [
                                    "Expenses: ₦",
                                    summary.expenses.toLocaleString()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                                lineNumber: 208,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white p-4 rounded shadow",
                                children: [
                                    "Profit: ₦",
                                    summary.profit.toLocaleString()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                                lineNumber: 211,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white p-4 rounded shadow col-span-2",
                                children: [
                                    "Debt: ₦",
                                    summary.debt.toLocaleString()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                                lineNumber: 214,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                        lineNumber: 201,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: shareWhatsApp,
                                className: "w-full bg-green-600 text-white py-3 rounded",
                                children: "Send via WhatsApp"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                                lineNumber: 220,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: sendEmail,
                                className: "w-full bg-blue-600 text-white py-3 rounded",
                                children: "Send via Email"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                                lineNumber: 227,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                        lineNumber: 219,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true),
            view === "history" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-bold",
                        children: "Production"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                        lineNumber: 240,
                        columnNumber: 11
                    }, this),
                    productionList.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-3 rounded shadow",
                            children: [
                                p.date,
                                " - ",
                                p.bags_produced,
                                " bags"
                            ]
                        }, i, true, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                            lineNumber: 242,
                            columnNumber: 13
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-bold",
                        children: "Sales"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                        lineNumber: 247,
                        columnNumber: 11
                    }, this),
                    salesList.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-3 rounded shadow",
                            children: [
                                s.customer_name,
                                " - ₦",
                                s.total_amount.toLocaleString()
                            ]
                        }, i, true, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                            lineNumber: 249,
                            columnNumber: 13
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-bold",
                        children: "Expenses"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                        lineNumber: 254,
                        columnNumber: 11
                    }, this),
                    expensesList.map((e, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-3 rounded shadow",
                            children: [
                                e.description,
                                " - ₦",
                                e.amount.toLocaleString()
                            ]
                        }, i, true, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                            lineNumber: 256,
                            columnNumber: 13
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                lineNumber: 239,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
        lineNumber: 160,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/auth.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getUser",
    ()=>getUser,
    "signIn",
    ()=>signIn,
    "signOut",
    ()=>signOut,
    "signUp",
    ()=>signUp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/supabase.js [app-ssr] (ecmascript)");
;
async function signUp(email, password) {
    return await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.signUp({
        email,
        password
    });
}
async function signIn(email, password) {
    return await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.signInWithPassword({
        email,
        password
    });
}
async function signOut() {
    return await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.signOut();
}
async function getUser() {
    const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.getUser();
    return data.user;
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/auth-modal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthModal",
    ()=>AuthModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/auth.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function AuthModal({ onClose }) {
    const [isLogin, setIsLogin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const handleSubmit = async ()=>{
        if (!email || !password) return;
        if (isLogin) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signIn"])(email, password);
            alert("Logged in successfully");
        } else {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signUp"])(email, password);
            alert("Check your email to confirm signup");
        }
        onClose();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white p-6 rounded-xl w-full max-w-sm space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-xl font-bold text-center",
                    children: isLogin ? "Login" : "Sign Up"
                }, void 0, false, {
                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/auth-modal.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "email",
                    placeholder: "Email",
                    className: "w-full p-3 border rounded",
                    value: email,
                    onChange: (e)=>setEmail(e.target.value)
                }, void 0, false, {
                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/auth-modal.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "password",
                    placeholder: "Password",
                    className: "w-full p-3 border rounded",
                    value: password,
                    onChange: (e)=>setPassword(e.target.value)
                }, void 0, false, {
                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/auth-modal.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: handleSubmit,
                    className: "w-full bg-black text-white py-3 rounded",
                    children: isLogin ? "Login" : "Create Account"
                }, void 0, false, {
                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/auth-modal.tsx",
                    lineNumber: 48,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-center text-blue-600 cursor-pointer",
                    onClick: ()=>setIsLogin(!isLogin),
                    children: isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"
                }, void 0, false, {
                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/auth-modal.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onClose,
                    className: "w-full text-sm text-gray-500",
                    children: "Close"
                }, void 0, false, {
                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/auth-modal.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/auth-modal.tsx",
            lineNumber: 27,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/auth-modal.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Loans",
    ()=>Loans
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function Loans() {
    const [loans, setLoans] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [source, setSource] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [amount, setAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    // Load from localStorage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const saved = localStorage.getItem("loans");
        if (saved) setLoans(JSON.parse(saved));
    }, []);
    // Save to localStorage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        localStorage.setItem("loans", JSON.stringify(loans));
    }, [
        loans
    ]);
    const addLoan = ()=>{
        if (!source || !amount) return;
        const newLoan = {
            id: Date.now().toString(),
            source,
            amount: Number(amount),
            amountPaid: 0
        };
        setLoans([
            newLoan,
            ...loans
        ]);
        setSource("");
        setAmount("");
    };
    const repayLoan = (id, value)=>{
        setLoans(loans.map((l)=>l.id === id ? {
                ...l,
                amountPaid: l.amountPaid + value
            } : l));
    };
    const totalLoans = loans.reduce((s, l)=>s + l.amount, 0);
    const totalPaid = loans.reduce((s, l)=>s + l.amountPaid, 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white p-4 rounded-xl shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-500",
                        children: "Total Loans"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg font-bold",
                        children: [
                            "€",
                            totalLoans
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-500 mt-2",
                        children: "Repaid"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg font-bold",
                        children: [
                            "€",
                            totalPaid
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white p-4 rounded-xl shadow-sm space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        placeholder: "Source (Bank, MD, etc)",
                        value: source,
                        onChange: (e)=>setSource(e.target.value),
                        className: "w-full border p-2 rounded"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        placeholder: "Amount",
                        type: "number",
                        value: amount,
                        onChange: (e)=>setAmount(e.target.value),
                        className: "w-full border p-2 rounded"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: addLoan,
                        className: "w-full bg-[#0d1b3e] text-white py-2 rounded",
                        children: "Add Loan"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            loans.map((loan)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white p-4 rounded-xl shadow-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-bold",
                            children: loan.source
                        }, void 0, false, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                            lineNumber: 91,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Total: €",
                                loan.amount
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                            lineNumber: 92,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Paid: €",
                                loan.amountPaid
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                            lineNumber: 93,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Remaining: €",
                                loan.amount - loan.amountPaid
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                            lineNumber: 94,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>repayLoan(loan.id, 100),
                            className: "mt-2 text-sm bg-gray-200 px-3 py-1 rounded",
                            children: "+€100 Repayment"
                        }, void 0, false, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                            lineNumber: 96,
                            columnNumber: 11
                        }, this)
                    ]
                }, loan.id, true, {
                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                    lineNumber: 90,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/bank.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Bank",
    ()=>Bank
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function Bank() {
    const [transactions, setTransactions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [amount, setAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    // Load
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const saved = localStorage.getItem("bank");
        if (saved) setTransactions(JSON.parse(saved));
    }, []);
    // Save
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        localStorage.setItem("bank", JSON.stringify(transactions));
    }, [
        transactions
    ]);
    const addTransaction = (type)=>{
        if (!amount) return;
        const newTx = {
            id: Date.now().toString(),
            type,
            amount: Number(amount)
        };
        setTransactions([
            newTx,
            ...transactions
        ]);
        setAmount("");
    };
    const deposits = transactions.filter((t)=>t.type === "deposit").reduce((s, t)=>s + t.amount, 0);
    const withdrawals = transactions.filter((t)=>t.type === "withdraw").reduce((s, t)=>s + t.amount, 0);
    const balance = deposits - withdrawals;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white p-4 rounded-xl shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-500",
                        children: "Bank Balance"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/bank.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg font-bold",
                        children: [
                            "€",
                            balance
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/bank.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-500 mt-2",
                        children: "Deposited"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/bank.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "€",
                            deposits
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/bank.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-500",
                        children: "Withdrawn"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/bank.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "€",
                            withdrawals
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/bank.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/bank.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white p-4 rounded-xl shadow-sm space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        placeholder: "Amount",
                        type: "number",
                        value: amount,
                        onChange: (e)=>setAmount(e.target.value),
                        className: "w-full border p-2 rounded"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/bank.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>addTransaction("deposit"),
                                className: "flex-1 bg-green-600 text-white py-2 rounded",
                                children: "Deposit"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/bank.tsx",
                                lineNumber: 73,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>addTransaction("withdraw"),
                                className: "flex-1 bg-red-600 text-white py-2 rounded",
                                children: "Withdraw"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/bank.tsx",
                                lineNumber: 80,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/bank.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/bank.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/bank.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WaterFactoryApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$screens$2f$dashboard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$screens$2f$production$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/production.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$screens$2f$sales$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$screens$2f$expenses$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$screens$2f$debts$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$bottom$2d$nav$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/bottom-nav.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/factory.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$screens$2f$reports$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$auth$2d$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/auth-modal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$screens$2f$loans$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$screens$2f$bank$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/bank.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function WaterFactoryApp() {
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("dashboard");
    const [factoryName, setFactoryNameState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showAuth, setShowAuth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    // ✅ LOAD FACTORY NAME OR REDIRECT
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const name = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFactoryName"])();
        if (name && name.trim() !== "") {
            setFactoryNameState(name);
        } else {
            router.push("/onboarding");
        }
    }, []);
    // 🚫 Prevent render before check completes
    if (!factoryName || factoryName.trim() === "") {
        return null;
    }
    // ✅ SCREEN RENDERER
    const renderScreen = ()=>{
        if (activeTab === "dashboard") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$screens$2f$dashboard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dashboard"], {
            setActiveTab: setActiveTab
        }, void 0, false, {
            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
            lineNumber: 41,
            columnNumber: 43
        }, this);
        if (activeTab === "production") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$screens$2f$production$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Production"], {}, void 0, false, {
            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
            lineNumber: 42,
            columnNumber: 44
        }, this);
        if (activeTab === "sales") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$screens$2f$sales$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sales"], {}, void 0, false, {
            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
            lineNumber: 43,
            columnNumber: 39
        }, this);
        if (activeTab === "expenses") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$screens$2f$expenses$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Expenses"], {}, void 0, false, {
            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
            lineNumber: 44,
            columnNumber: 42
        }, this);
        if (activeTab === "debts") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$screens$2f$debts$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Debts"], {}, void 0, false, {
            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
            lineNumber: 45,
            columnNumber: 39
        }, this);
        if (activeTab === "reports") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$screens$2f$reports$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Reports"], {}, void 0, false, {
            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
            lineNumber: 46,
            columnNumber: 41
        }, this);
        if (activeTab === "loans") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$screens$2f$loans$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Loans"], {}, void 0, false, {
            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
            lineNumber: 47,
            columnNumber: 39
        }, this);
        if (activeTab === "bank") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$screens$2f$bank$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Bank"], {}, void 0, false, {
            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
            lineNumber: 48,
            columnNumber: 38
        }, this);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$screens$2f$dashboard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dashboard"], {}, void 0, false, {
            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
            lineNumber: 49,
            columnNumber: 12
        }, this);
    };
    // 🔥 MAIN APP
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-screen bg-[#eef0f5] max-w-md mx-auto flex flex-col overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between px-4 py-3 bg-white shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: "/icon-192.png",
                                        alt: "AquaOps Logo",
                                        className: "w-8 h-8 rounded"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
                                        lineNumber: 60,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "text-sm font-bold text-[#0d1b3e]",
                                                children: "AquaOps"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
                                                lineNumber: 66,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-gray-400",
                                                children: factoryName
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
                                                lineNumber: 69,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
                                        lineNumber: 65,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
                                lineNumber: 59,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowAuth(true),
                                        className: "text-xs bg-[#0d1b3e] text-white px-3 py-1.5 rounded-lg",
                                        children: "Login"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
                                        lineNumber: 76,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            const newName = prompt("Enter new factory name");
                                            if (newName && newName.trim() !== "") {
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setFactoryName"])(newName);
                                                setFactoryNameState(newName);
                                            }
                                        },
                                        className: "text-xs bg-gray-200 px-3 py-1.5 rounded-lg",
                                        children: "Change"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
                                        lineNumber: 83,
                                        columnNumber: 13
                                    }, this),
                                    ("TURBOPACK compile-time value", "development") === "development" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            localStorage.clear();
                                            window.location.reload();
                                        },
                                        className: "text-xs bg-red-600 text-white px-3 py-1.5 rounded-lg border border-red-700",
                                        children: "TEMP RESET"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
                                        lineNumber: 97,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto px-2 py-1",
                        children: renderScreen()
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
                        lineNumber: 111,
                        columnNumber: 8
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$bottom$2d$nav$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BottomNav"], {
                        activeTab: activeTab,
                        setActiveTab: setActiveTab
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            showAuth && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$auth$2d$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AuthModal"], {
                onClose: ()=>setShowAuth(false)
            }, void 0, false, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
                lineNumber: 122,
                columnNumber: 20
            }, this)
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=Documents_PROJECTS_AquaOps-clean_AquaOps-clean_0f-7u30._.js.map